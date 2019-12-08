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

test("can't fetch an faq that does not exist", async ({ client }) => {
  const response = await client.get("faqs/1").end();

  response.assertStatus(404);
});

/**
 * POST REQUESTS
 */
test("can create an faq", async ({ assert, client }) => {
  const response = await client
    .post("/faqs")
    .send(testFaqObject)
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { faq: testFaqObject }
  });
});

//TODO: test that we can delete faqs

//TODO: test that we can update faqs

//TODO: figure out logging in the controller for different use cases.  Error, success, etc
