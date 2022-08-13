import express from 'express';
import {requiresAuth} from 'express-openid-connect';

const router = express.Router();

// oidc
router.get('/', (req, res) => {
  res.json({data: 'Hellos world!'});
});

router.get('/profile', requiresAuth(), (req, res) => {
  res.json(req.oidc.user);
});


router.get('*', (req, res) => {
  res.json({ data: '404 world!' });
});
export default router;