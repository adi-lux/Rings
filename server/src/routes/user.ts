import express from 'express';
import userController from '../controllers/user';
import blogController from '../controllers/blog';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:username', userController.updateUser);
router.get('/:username/chat', (req, res) => res.send('unimplemented'));
router.get('/:username/blogs', blogController.getBlogs);

router.post('/:username/blogs', blogController.postBlog);
router.get('/:username/blogs/:blog', blogController.getBlog);
router.put('/:username/blogs/:blog', blogController.editBlog);
router.delete('/:username/blogs/:blog', blogController.deleteBlog);
// TODO: define paths for adding comments to blogs as well as
export default router;