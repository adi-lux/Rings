import { Schema, model } from 'mongoose';

const BlogCommentSchema = new Schema({
  commenter: { type: Schema.Types.ObjectId, ref: 'User' },
  timestamp: Date,
  content: String,
});

const BlogComment = model('BlogComment', BlogCommentSchema);
export default BlogComment;
