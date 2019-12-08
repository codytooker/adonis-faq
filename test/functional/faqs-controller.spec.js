"use strict";

const { test, trait, before } = use("Test/Suite")("Faqs Controller");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("DatabaseTransactions");

const testFaqObject = {
  title: "Testing Faq Object Title",
  description: "Testing Faq Object description"
};

const Faq = Factory.model("App/Models/Faq");
const FaqModel = use("App/Models/Faq");

/**
 * GET REQUESTS
 */
test("can fetch all faqs", async ({ assert, client }) => {
  await Faq.createMany(3);

  const response = await client.get("/faqs").end();

  response.assertStatus(200);
  assert.equal(response.body.data.faqs.length, 3);

  //TODO: possible assert that we have certain columns of data in each one
});

//TODO: should test that we get an error when fetching faqs if they don't exists

test("can fetch a single faq", async ({ client }) => {
  await Faq.create(testFaqObject);

  const response = await client.get("/faqs/1").end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { faq: testFaqObject }
  });
});

test("fetching an faq that doesn't exist returns a 404", async ({ client }) => {
  const response = await client.get("faqs/1").end();

  response.assertStatus(404);
});

/**
 * POST REQUESTS
 */
test("can create an faq", async ({ client }) => {
  const response = await client
    .post("/faqs")
    .send(testFaqObject)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { faq: testFaqObject }
  });
});

/**
 * DELETE REQUESTS
 */
test("can delete an faq", async ({ assert, client }) => {
  await Faq.createMany(4);

  const response = await client.delete("/faqs/3").end();
  const faqCount = await FaqModel.getCount();

  response.assertStatus(204);
  assert.equal(faqCount, 3);
});

test("deleting a faq that doesn't exist returns a 404", async ({
  assert,
  client
}) => {
  await Faq.create();

  const response = await client.delete("/faqs/2").end();
  const faqCount = await FaqModel.getCount();

  response.assertStatus(404);
  assert.equal(faqCount, 1);
});

//TODO: figure out logging in the controller for different use cases.  Error, success, etc
