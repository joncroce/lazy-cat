import Router from 'express-promise-router';
import db from '../db';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  res.json(rows[0]);
});

export default router;