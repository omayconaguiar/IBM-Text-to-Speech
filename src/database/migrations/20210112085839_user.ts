import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.increments();
    table.string('payment_plan');
    table.string('payment_without_plan');
    table.string('origin');
    table.string('destiny');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('update_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('user');
}
