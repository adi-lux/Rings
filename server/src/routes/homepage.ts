import express from 'express';

const router = express.Router();

// oidc
router.get('/', (req, res) => {
  res.json(req.auth.payload);
});

router.get('/profile', (req, res) => {
  res.json(req.auth);
});

router.get('*', (req, res) => {
  res.json({ data: '404 world!' });
});
export default router;
