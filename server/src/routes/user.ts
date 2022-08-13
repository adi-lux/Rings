import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/', userController.getUsers);

router.get('/:user', (req, res) => res.json({ data: req.params.user }));
router.get('/:user/chat', (req, res) => res.json({ data: `${req.params.user} chat` }));
router.get('/:user/blogs', (req, res) => res.json({ data: `${req.params.user} blogs` }));
router.get('/:user/blogs/:blog', (req, res) => res.json({ data: `${req.params.user} ${req.params.blog}` }));
router.get('/:user/friends', (req, res) => res.json({ data: `${req.params.user} friends` }));

export default router;
