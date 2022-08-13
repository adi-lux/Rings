import { Schema, model } from 'mongoose';

const BlogPostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  chats: [{ type: Schema.Types.ObjectId, ref: 'BlogComment' }],
});

const BlogPost = model('BlogPost', BlogPostSchema);
export default BlogPost;
