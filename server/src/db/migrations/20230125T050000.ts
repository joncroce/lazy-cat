import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('cat')
		.addColumn('id', 'serial', (col) => col.primaryKey())
		.addColumn('name', 'varchar(50)', (col) => col.notNull())
		.addColumn('description', 'varchar(500)')
		.execute();
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('cat').execute();
}