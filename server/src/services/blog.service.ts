import User from "../models/user.model";
import BlogPost from "../models/blog-post.model";
import BlogComment from "../models/blog-comment.model";
import log from "loglevel";

interface Blog {
  title: string;
  content: string;
  published: boolean;
  posted: Date;
}

interface Comment {
  username: string;
  content: string;
}

const getBlogs = async (username: string) => {
  // Fetch all blogs for a given user
  try {
    const userBlogs = await User.findById(username).populate("blogPage");
    return userBlogs?.blogPage;
  } catch (e) {
    log.error(`Error while getting user blog-list:\n${e}`);
  }
};

const getBlog = async (blog: string) => {
  try {
    return await BlogPost.findById(blog).populate("comments").exec();
  } catch (e) {
    log.error(`Error while getting blog:\n${e}`);
  }
};

const postBlog = async (blog: Blog, username: string) => {
  try {
    const userBlogPost = await new BlogPost({
      title: blog.title,
      content: blog.content,
      published: blog.published,
      posted: new Date(),
    }).save();
    return await User.findByIdAndUpdate(username, {
      $push: { blogPage: userBlogPost },
    }).exec();
  } catch (e) {
    log.error(`Error while posting blog:\n${e}`);
  }
  // TODO: SANITIZE BLOG
};

const editBlog = async (id: string, blog: Blog) => {
  try {
    // TODO: SANITIZE
    return await BlogPost.findByIdAndUpdate(id, {
      title: blog.title,
      content: blog.content,
      published: blog.published,
    }).exec();
  } catch (e) {
    log.error(`Error while editing blog:\n${e}`);
  }
};

const deleteBlog = async (blog: string, username: string) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(blog);
    User.findByIdAndUpdate(username, { $pull: { ...deleted } });
    return deleted;
  } catch (e) {
    log.error(`Error while deleting blog:\n${e}`);
  }
};

const postComment = async (comment: Comment, blog: string) => {
  try {
    const userComment = await new BlogComment({
      commenter: comment.username,
      content: comment.content,
      timestamp: new Date(),
    }).save();
    await BlogPost.findByIdAndUpdate(blog, {
      $push: { comments: userComment },
    }).exec();
    return userComment;
  } catch (e) {
    log.error(`Error while posting comment:\n${e}`);
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