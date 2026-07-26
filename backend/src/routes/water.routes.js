import express from 'express';
import { addUsage, getUsageHistory, updateUsage, deleteUsage, getAnalytics, getCategoryAnalytics } from '../controllers/water.controller.js';
import { validateWaterUsage } from '../validators/water.validator.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .post(upload.single('billImage'), validateWaterUsage, addUsage);

router.route('/history')
  .get(getUsageHistory);

router.route('/analytics')
  .get(getAnalytics);

router.route('/analytics/category')
  .get(getCategoryAnalytics);

router.route('/:id')
  .put(updateUsage)
  .delete(deleteUsage);

export default router;
