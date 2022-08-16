import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  id: String,
  posted: Date,
  title: String,
  content: String,
  published: Boolean,
  comments: [{ type: Schema.Types.ObjectId, ref: 'BlogComment' }],
});

const BlogPost = model('BlogPost', BlogPostSchema);
export default BlogPost;
