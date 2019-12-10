"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Faq extends Model {
  categories() {
    return this.belongsToMany("App/Models/Category")
      .pivotTable("faq_categories")
      .withTimestamps();
  }
}

module.exports = Faq;
