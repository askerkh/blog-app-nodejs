const express = require('express');

const router = express.Router();

const { getPost,
  getPosts,
  addPost,
  editPost,
  deletePost
} = require('../controllers/api-post-controller');

// Get all Posts
router.get('/api/posts', getPosts);
// Add new post
router.post('/api/post', addPost);
// Get post by ID
router.get('/api/posts/:id', getPost);
// Delete post by ID
router.delete('api/posts/:id', deletePost);
// Update post by ID
router.put('api/posts/:id', editPost);


module.exports = router;
