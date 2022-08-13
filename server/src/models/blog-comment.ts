import { Schema, model } from 'mongoose';

const BlogCommentSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
  commenter: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
  content: String,
});

const BlogComment = model('BlogComment', BlogCommentSchema);
export default BlogComment;
