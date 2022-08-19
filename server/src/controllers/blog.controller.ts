import { RequestHandler } from "express";
import BlogService from "../services/blog.service";

const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;
    const blogList = await BlogService.getBlogs(username);
    return res.json(blogList);
  } catch (e) {
    return next(e);
  }
};

const getBlog: RequestHandler = async (req, res, next) => {
  try {
    const blogName = req.params.blog;
    const blog = await BlogService.getBlog(blogName);
    return res.json(blog);
  } catch (e) {
    return next(e);
  }
};
const postBlog: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE BLOG
  try {
    const blog = req.body;
    const { username } = req.params;
    const updated = await BlogService.postBlog(blog, username);
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
};

const editBlog: RequestHandler = async (req, res, next) => {
  // TODO: SANITIZE
  try {
    const blog = req.body;
    const id = req.params.blog;
    const updated = await BlogService.editBlog(id, blog);
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
};
const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const { blog, username } = req.params;
    const deleted = await BlogService.deleteBlog(blog, username);
    return res.json({ deleted });
  } catch (e) {
    return next(e);
  }
};

const postComment: RequestHandler = async (req, res, next) => {
  try {
    const comment = req.body;
    const { blog } = req.params;
    const userComment = await BlogService.postComment(comment, blog);
    return res.json({ userComment });
  } catch (e) {
    return next(e);
  }
};

export default {
  getBlogs,
  getBlog,
  postBlog,
  editBlog,
  deleteBlog,
  postComment,
};