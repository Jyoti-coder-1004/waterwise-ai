import express from 'express';
import { 
  getAITips, 
  getAIPrediction, 
  postAIChat, 
  getLeakDetection, 
  getRecommendations, 
  getUsageForecast 
} from '../controllers/ai.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/tips', getAITips);
router.get('/predict', getAIPrediction);
router.post('/chat', postAIChat);
router.get('/leaks', getLeakDetection);
router.get('/recommendations', getRecommendations);
router.get('/forecast', getUsageForecast);

export default router;
