import db from '../db';

import { BaseCat } from './cat.interface';

export const find = async (id: number) =>
  db.selectFrom('cat')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

export const findAll = async () =>
  db.selectFrom('cat')
    .selectAll()
    .execute();

export const create = async (cat: BaseCat) =>
  db.insertInto('cat')
    .values(cat)
    .returning('id')
    .executeTakeFirstOrThrow();