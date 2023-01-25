import db from '../db';

import { BaseCat } from './interfaces';

export const ShowCatService = async (id: number) =>
  db.selectFrom('cat')
    .selectAll()
    .where('id', '=', id)
    .executeTakeFirstOrThrow();

export const IndexCatsService = async () =>
  db.selectFrom('cat')
    .selectAll()
    .execute();

export const StoreCatService = async (cat: BaseCat) =>
  db.insertInto('cat')
    .values(cat)
    .returning('id')
    .executeTakeFirstOrThrow();

export const UpdateCatService = async (id: number, fields: Partial<BaseCat>) =>
  db.updateTable('cat')
    .set(fields)
    .where('id', '=', id)
    .returning('id')
    .executeTakeFirst();

export const DeleteCatService = async (id: number) =>
  db.deleteFrom('cat')
    .where('id', '=', id)
    .executeTakeFirstOrThrow();