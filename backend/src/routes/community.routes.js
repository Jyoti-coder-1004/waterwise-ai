import express from 'express';
import { getPosts, createPost, likePost, addComment } from '../controllers/community.controller.js';
import { protect } from '../middlewares/auth.middleware.js';
import { upload } from '../middlewares/upload.middleware.js';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getPosts)
  .post(upload.single('image'), createPost);

router.put('/:id/like', likePost);
router.post('/:id/comment', addComment);

export default router;
