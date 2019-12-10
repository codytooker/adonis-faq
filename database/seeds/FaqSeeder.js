"use strict";

const _ = require("lodash");

/*
|--------------------------------------------------------------------------
| FaqSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

class FaqSeeder {
  async run() {
    const faqs = await Factory.model("App/Models/Faq").createMany(10);
    const categories = await Factory.model("App/Models/Category").createMany(5);

    faqs.forEach(faq => {
      const categoriesToAttach = _.sampleSize(
        _.map(categories, category => category.id),
        Math.floor(Math.random() * 5) + 1
      );
      faq.categories().sync(categoriesToAttach);
    });
  }
}

module.exports = FaqSeeder;
