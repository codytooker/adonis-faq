"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FaqSchema extends Schema {
  up() {
    this.create("faqs", table => {
      table.increments();
      table.string("title").notNullable();
      table.string("description").notNullable();
      table
        .boolean("is_active")
        .notNullable()
        .defaultTo(true);
      table
        .boolean("is_popular")
        .notNullable()
        .defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop("faqs");
  }
}

module.exports = FaqSchema;
