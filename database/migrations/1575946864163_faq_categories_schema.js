"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//TODO: figure out where the references foreign key setup doesn't work should do an ondelete cascade probably
class FaqCategoriesSchema extends Schema {
  up() {
    this.create("faq_categories", table => {
      table.increments();
      table.integer("faq_id").unsigned();
      // .references("id")
      // .inTable("faq");
      table.integer("category_id").unsigned();
      // .references("id")
      // .inTable("categories");
      table.timestamps();
    });
  }

  down() {
    this.drop("faq_categories");
  }
}

module.exports = FaqCategoriesSchema;
