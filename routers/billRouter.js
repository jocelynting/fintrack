import { Router } from 'express';
import {
  createBill,
  deleteBill,
  getBill,
  getAllBills,
  updateBill,
  getBillStatistics,
} from '../controllers/billController.js';
import {
  validateBillInput,
  validateBillID,
} from '../middleware/validationMiddleware.js';

const router = Router();

router.route('/').get(getAllBills).post(validateBillInput, createBill);

router.route('/statistics').get(getBillStatistics);

router
  .route('/:id')
  .get(validateBillID, getBill)
  .patch(validateBillInput, validateBillID, updateBill)
  .delete(validateBillID, deleteBill);

export default router;
