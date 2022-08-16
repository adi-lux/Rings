import { RequestHandler } from 'express';
import User from '../models/user';
import BlogPost from '../models/blog-post';

const getBlogs: RequestHandler = async (req, res, next) => {
  // Fetch all blogs for a given user
  const userBlogs = await User.findById(req.params.username).populate('blogPage');
  res.json(userBlogs?.blogPage);
};
const getBlog: RequestHandler = async (req, res, next) => {
  const blog = await BlogPost.findById(req.params.blog);
  res.json(blog);
};
const postBlog: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE BLOG

  const userBlogPost = await new BlogPost({
    title: req.body.title,
    content: req.body.content,
    published: req.body.published,
    posted: new Date(),
  }).save();
  await User.findByIdAndUpdate(req.params.username, { $push: { blogPage: userBlogPost } }).exec();
};
const editBlog: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE
  const updated = await BlogPost.findByIdAndUpdate((req.params.blog), { title: req.body.title, content: req.body.content, published: req.body.published }).exec();
  res.json({ updated });
};
const deleteBlog: RequestHandler = async (req, res, next) => {
  const deleted = await BlogPost.findByIdAndDelete(req.params.blog);
  User.findByIdAndUpdate(req.params.username, { $pull: { ...deleted } });
};

export default {
  getBlogs, getBlog, postBlog, editBlog, deleteBlog,
};
