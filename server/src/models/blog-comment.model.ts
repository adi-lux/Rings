import { model, Schema } from "mongoose";

const BlogCommentSchema = new Schema({
  commenter: String,
  timestamp: Date,
  content: String,
});

const BlogComment = model("BlogComment", BlogCommentSchema);
export default BlogComment;