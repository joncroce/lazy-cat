import { Kysely, PostgresDialect, Generated } from 'kysely';
import { Pool } from 'pg';
import Cursor from 'pg-cursor';

import { BaseCat } from '../cats/interfaces';

export interface CatTable extends BaseCat {
	id: Generated<number>;
}

export interface Database {
	cat: CatTable;
}

const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool: new Pool(),
		cursor: Cursor
	})
});

export default db;