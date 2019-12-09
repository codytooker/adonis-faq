"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FaqSchema extends Schema {
  up() {
    this.create("faqs", table => {
      table.increments();
      table.string("title").notNullable();
      table.text("description").notNullable();
      table
        .boolean("isPopular")
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
