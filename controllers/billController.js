import { StatusCodes } from 'http-status-codes';
import Bill from '../models/Bill.js';
import { BILL_TYPE } from '../utils/constants.js';

export const getAllBills = async (req, res) => {
  const { user } = req;
  const { date, calendarType, billType, category, subcategory, description } =
    req.query;

  let startDate, endDate;
  console.log('date', date);
  if (date) {
    if (calendarType === 'month') {
      // 设置startDate为所选月份的第一天
      startDate = new Date(date);
      startDate.setDate(1); // 设置为这个月的第一天
      // 设置endDate为所选月份的最后一天
      endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
    } else if (calendarType === 'year') {
      // 设置startDate为所选年份的1月1日
      startDate = new Date(date);
      startDate.setMonth(0); // 设置为1月
      startDate.setDate(1); // 设置为第一天
      // 设置endDate为所选年份的12月31日
      endDate = new Date(startDate.getFullYear() + 1, 0, 0);
    } else {
      startDate = new Date(date);
      endDate = new Date(date);
    }
  }

  const query = { user: user.uid };

  if (startDate && endDate) {
    query.createAt = { $gte: startDate, $lte: endDate };
  }

  if (billType && billType !== 'all') {
    query.type = billType;
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

  const bills = await Bill.find(query)
    .populate('category')
    .populate('subcategory');

  res.status(StatusCodes.OK).json({ bills });
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
