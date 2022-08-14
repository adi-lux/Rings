import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  posted: Date,
  comments: [{ type: Schema.Types.ObjectId, ref: 'BlogComment' }],
});

const BlogPost = model('BlogPost', BlogPostSchema);
export default BlogPost;