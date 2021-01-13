import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('vxtel', (table: Knex.TableBuilder) => {
    table.increments();
    table.integer('origin');
    table.integer('destiny');
    table.float('per_hour');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('update_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('vxtel');
}
