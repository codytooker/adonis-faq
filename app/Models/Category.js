"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Category extends Model {
  static get table() {
    return "categories";
  }

  faqs() {
    return this.belongsToMany("App/Models/Faq")
      .pivotTable("faq_categories")
      .withTimestamps();
  }
}

module.exports = Category;
