import { RequestHandler } from "express";
import User from "../models/user";
import BlogPost from "../models/blog-post";
import BlogComment from "../models/blog-comment";

const getBlogs: RequestHandler = async (req, res, next) => {
  // Fetch all blogs for a given user
  try {
    const userBlogs = await User.findById(req.params.username).populate(
      "blogPage"
    );
    return res.json(userBlogs?.blogPage);
  } catch (e) {
    return next(e);
  }
};
const getBlog: RequestHandler = async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.blog)
      .populate("comments")
      .exec();
    return res.json(blog);
  } catch (e) {
    return next(e);
  }
};
const postBlog: RequestHandler = async (req, res, next) => {
  try {
    const userBlogPost = await new BlogPost({
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
      posted: new Date(),
    }).save();
    const updated = await User.findByIdAndUpdate(req.params.username, {
      $push: { blogPage: userBlogPost },
    }).exec();
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
  // TODO: SANITIZE BLOG
};
const editBlog: RequestHandler = async (req, res, next) => {
  try {
    // TODO: SANITIZE
    const updated = await BlogPost.findByIdAndUpdate(req.params.blog, {
      title: req.body.title,
      content: req.body.content,
      published: req.body.published,
    }).exec();
    return res.json({ updated });
  } catch (e) {
    return next(e);
  }
};
const deleteBlog: RequestHandler = async (req, res, next) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.blog);
    User.findByIdAndUpdate(req.params.username, { $pull: { ...deleted } });
    return res.json({ deleted });
  } catch (e) {
    return next(e);
  }
};

const postComment: RequestHandler = async (req, res, next) => {
  try {
    const userComment = await new BlogComment({
      commenter: req.body.username,
      content: req.body.content,
      timestamp: new Date(),
    }).save();
    await BlogPost.findByIdAndUpdate(req.params.blog, {
      $push: { comments: userComment },
    }).exec();
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