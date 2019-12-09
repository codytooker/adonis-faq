"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

Factory.blueprint("App/Models/Faq", async (faker, i, data) => {
  return {
    title: data.title || faker.sentence({ words: 3 }),
    description: data.description || faker.paragraph(),
    isPopular: data.isPopular || false
  };
});
