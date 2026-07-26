import express from 'express';
import { getDashboardSummary, getDashboardCharts } from '../controllers/dashboard.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/summary', getDashboardSummary);
router.get('/charts', getDashboardCharts);

export default router;
