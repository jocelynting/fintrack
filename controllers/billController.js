import { StatusCodes } from 'http-status-codes';
import Bill from '../models/Bill.js';
import { BILL_TYPE, STATISTICS_SEARCH_TYPE } from '../utils/constants.js';
import { getDatePeriod } from '../utils/dateUtils.js';
import mongoose from 'mongoose';

export const getAllBills = async (req, res) => {
  const { user } = req;
  const { date, calendar, type, category, subcategory, description } =
    req.query;

  const { startDate, endDate } = getDatePeriod(date, calendar);

  const query = { user: user.uid };

  if (startDate && endDate) {
    query.createAt = { $gte: startDate, $lte: endDate };
  }

  if (type && type !== 'all') {
    query.type = type;
    if (category) {
      query.category = category;
    }
    if (subcategory) {
      query.subcategory = subcategory;
    }
  }

  if (description) {
    query.description = { $regex: description, $options: 'i' };
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const bills = await Bill.find(query)
    .populate('category')
    .populate('subcategory')
    .skip(skip)
    .limit(limit)
    .sort({ createAt: -1 }); // sort by createAt in descending order

  const total = await Bill.countDocuments(query);
  const totalPages = Math.ceil(total / limit);

  // res.status(StatusCodes.OK).json({ bills });
  res.status(StatusCodes.OK).json({ total, totalPages, page, bills });
};

export const createBill = async (req, res) => {
  const { amount, type, category, description } = req.body;
  let { subcategory } = req.body;
  const { user } = req;

  if (type === BILL_TYPE.INCOME) {
    subcategory = null;
  }

  const bill = await Bill.create({
    amount,
    type,
    category,
    subcategory,
    description,
    user: user.uid,
  });

  res.status(StatusCodes.CREATED).json({ bill });
};

export const getBill = async (req, res) => {
  const { id } = req.params;
  const bill = await Bill.findById(id);

  res.status(StatusCodes.OK).json({ bill });
};

export const updateBill = async (req, res) => {
  const { id } = req.params;

  const updateBill = await Bill.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(StatusCodes.OK).json({ bill: updateBill });
};

export const deleteBill = async (req, res) => {
  const { id } = req.params;
  const deleteBill = await Bill.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ bill: deleteBill });
};

export const getBillStatistics = async (req, res) => {
  const { user } = req;
  const { date, calendar, type } = req.query;

  const { startDate, endDate } = getDatePeriod(date, calendar);

  let pipelineInfo = {};

  if (type === STATISTICS_SEARCH_TYPE.EXPENSE_CATEGORY) {
    pipelineInfo = {
      type: 'expense',
      _id: 'category',
      collection: 'categories',
      as: 'categoryInfo',
    };
  } else if (type === STATISTICS_SEARCH_TYPE.INCOME_CATEGORY) {
    pipelineInfo = {
      type: 'income',
      _id: 'category',
      collection: 'categories',
      as: 'categoryInfo',
    };
  } else if (type === STATISTICS_SEARCH_TYPE.EXPENSE_SUBCATEGORY) {
    pipelineInfo = {
      type: 'expense',
      _id: 'subcategory',
      collection: 'subcategories',
      as: 'subcategoryInfo',
    };
  }

  const pipeline = [
    {
      $match: {
        user: new mongoose.Types.ObjectId(user.uid),
        type: pipelineInfo.type,
        createAt: { $gte: startDate, $lte: endDate },
      },
    },
    {
      $group: { _id: '$' + pipelineInfo._id, total: { $sum: '$amount' } },
    },
    {
      $lookup: {
        from: pipelineInfo.collection,
        localField: '_id',
        foreignField: '_id',
        as: pipelineInfo.as,
      },
    },
    { $unwind: '$' + pipelineInfo.as },
    { $project: { category: `$${pipelineInfo.as}.name`, total: true } },
  ];

  const results = await Bill.aggregate(pipeline);

  const sum = results.reduce((acc, curr) => acc + curr.total, 0);

  const statistics = results.map((item) => ({
    ...item,
    percentage: ((item.total / sum) * 100).toFixed(2) + '%',
  }));

  res.status(StatusCodes.OK).json({ statistics });
};
