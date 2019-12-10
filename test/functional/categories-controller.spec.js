"use strict";

const { test, trait } = use("Test/Suite")("Categories Controller");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("DatabaseTransactions");

const Category = Factory.model("App/Models/Category");

test("can fetch all categories", async ({ assert, client }) => {
  await Category.createMany(3);

  const response = await client.get("/categories").end();

  response.assertStatus(200);
  assert.equal(response.body.data.categories.length, 3);
});
