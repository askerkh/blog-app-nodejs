const express = require('express');

const router = express.Router();

const { getPost,
  getPosts,
  getAddPost,
  getEditPost,
  addPost,
  editPost,
  deletePost
} = require('../controllers/post-controller');

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);
router.get('/add-post', getAddPost);
router.get('/edit/:id', getEditPost);
router.post('/add-post', addPost);
router.put('/edit/:id', editPost);
router.delete('/posts/:id', deletePost);

module.exports = router;
