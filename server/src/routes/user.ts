import express from 'express';
import userController from '../controllers/user';
import blogController from '../controllers/blog';

const router = express.Router();

router.get('/', userController.getUsers);

router.put('/:username', userController.updateUser);
router.get('/:username', userController.getUser);
router.post('/:username', userController.postUser);
router.get('/:username/chat', (req, res) => res.send('unimplemented'));
router.get('/:username/blogs', blogController.getBlogs);

router.post('/:username/blogs', blogController.postBlog);
router.get('/:username/blogs/:blog', blogController.getBlog);
router.post('/:username/blogs/:blog', blogController.postComment);
router.put('/:username/blogs/:blog', blogController.editBlog);
router.delete('/:username/blogs/:blog', blogController.deleteBlog);
// TODO: define paths for adding comments to blogs as well as
export default router;