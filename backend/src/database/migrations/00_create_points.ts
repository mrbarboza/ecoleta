import Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.createTable('points', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.decimal('latitude').notNullable();
    table.decimal('longitude').notNullable();
    table.string('state', 2).notNullable();
    table.string('city').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable('points');
}