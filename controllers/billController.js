import { StatusCodes } from 'http-status-codes';
import Bill from '../models/Bill.js';
import { BILL_TYPE } from '../utils/constants.js';

export const getAllBills = async (req, res) => {
  const { user } = req;

  const bills = await Bill.find({ user: user.uid })
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
