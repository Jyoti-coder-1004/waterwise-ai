import CommunityPost from '../models/CommunityPost.js';

// @desc    Get all community posts
// @route   GET /api/community
// @access  Private
export const getPosts = async (req, res, next) => {
  try {
    const posts = await CommunityPost.find()
      .populate('user', 'name avatar')
      .populate('comments.user', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a community post
// @route   POST /api/community
// @access  Private
export const createPost = async (req, res, next) => {
  try {
    const { content, tags } = req.body;

    const newPost = await CommunityPost.create({
      user: req.user._id,
      content,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    const populatedPost = await newPost.populate('user', 'name avatar');

    res.status(201).json({ success: true, data: populatedPost });
  } catch (error) {
    next(error);
  }
};

// @desc    Like or Unlike a post
// @route   PUT /api/community/:id/like
// @access  Private
export const likePost = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    // Check if the post has already been liked
    const isLiked = post.likes.find(like => like.user.toString() === req.user._id.toString());

    if (isLiked) {
      // Unlike
      post.likes = post.likes.filter(like => like.user.toString() !== req.user._id.toString());
    } else {
      // Like
      post.likes.unshift({ user: req.user._id });
    }

    await post.save();

    res.json({ success: true, likes: post.likes });
  } catch (error) {
    next(error);
  }
};

// @desc    Add comment to a post
// @route   POST /api/community/:id/comment
// @access  Private
export const addComment = async (req, res, next) => {
  try {
    const post = await CommunityPost.findById(req.params.id);

    if (!post) {
      res.status(404);
      throw new Error('Post not found');
    }

    const newComment = {
      user: req.user._id,
      text: req.body.text,
    };

    post.comments.push(newComment);
    await post.save();
    
    // We populate the comments user for real-time frontend update
    const populatedPost = await CommunityPost.findById(req.params.id)
      .populate('comments.user', 'name avatar');

    res.status(201).json({ success: true, comments: populatedPost.comments });
  } catch (error) {
    next(error);
  }
};
