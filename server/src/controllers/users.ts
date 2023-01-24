import { Request, Response } from 'express';
import db from '../db';

const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  res.json(rows[0]);
};

export default {
  getById
};