const { model } = require('mongoose');
const createPath = require('../helpers/create-path');
const Post = require('../models/post');

const handleError = (res, err) => {
  console.log(err);
  res.render(createPath('error'), { title: 'Error' });
};

const getPost = (req, res) => {
  const title = 'Post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('post'), { title, post }))
    .catch(err => handleError(res, err));
};

const getPosts = (req, res) => {
  const title = 'Posts';
  Post
    .find()
    .sort({ createdAt: -1 })
    .then(posts => res.render(createPath('posts'), { title, posts }))
    .catch(err => handleError(res, err));
};

const getAddPost = (req, res) => {
  const title = 'Add post';
  res.render(createPath('add-post'), { title });
};

const getEditPost = (req, res) => {
  const title = 'Edit Post';
  Post
    .findById(req.params.id)
    .then(post => res.render(createPath('edit-post'), { title, post }))
    .catch(err => handleError(res, err));
};

const addPost = (req, res) => {
  const { title, text, author } = req.body;
  const post = new Post({ title, text, author });
  post
    .save()
    .then(result => res.redirect('/posts'))
    .catch(err => handleError(res, err));
};

const editPost = (req, res) => {
  const { title, text, author } = req.body;
  const { id } = req.params;
  Post
    .findByIdAndUpdate(id, { text, title, author })
    .then(_ => res.redirect(`/posts/${id}`))
    .catch(err => handleError(res, err));
};

const deletePost = (req, res) => {
  // const title = 'Post';
  Post
    .findByIdAndDelete(req.params.id)
    .then(_ => {
      res.sendStatus(200);
    })
    .catch(err => handleError(res, err));
};

module.exports = {
  getPost,
  getPosts,
  getAddPost,
  getEditPost,
  addPost,
  editPost,
  deletePost
};
