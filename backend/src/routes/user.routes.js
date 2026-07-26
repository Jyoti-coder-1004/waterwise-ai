import express from 'express';
import { getUserProfile, updateUserProfile, uploadAvatar, deleteAccount } from '../controllers/user.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect); // Apply protect to all routes

router.route('/profile')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteAccount);

router.post('/avatar', upload.single('image'), uploadAvatar);

export default router;
