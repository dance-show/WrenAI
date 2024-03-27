/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('thread', (table) => {
      table.increments('id').comment('ID');
      table.integer('project_id').comment('Reference to project.id');
      table.string('sql').comment('the sql statement of this thread');
      table.text('summary').comment('the summary of the thread');

      // timestamps
      table.timestamps(true, true);
    })
    .createTable('thread_response', (table) => {
      table.increments('id').comment('ID');
      table.integer('thread_id').comment('Reference to thread.id');
      table.foreign('thread_id').references('thread.id').onDelete('CASCADE');

      // query id from AI service
      table.string('query_id').comment('the query id generated by AI service');

      // response from AI service
      table.text('question').comment('the question of the response');
      table.string('status').comment('the status of the response');
      table.jsonb('detail').nullable().comment('the detail of the response');
      table.string('error').nullable().comment('the error message if any');

      // timestamps
      table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('thread').dropTable('thread_response');
};
