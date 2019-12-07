"use strict";

const { test, trait } = use("Test/Suite")("Faqs Controller");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("DatabaseTransactions");

const Faq = Factory.model("App/Models/Faq");

test("can fetch all faqs", async ({ assert, client }) => {
  await Faq.createMany(3);

  const response = await client.get("/faqs").end();

  response.assertStatus(200);
  assert.equal(response.body.data.length, 3);

  //TODO: possible assert that we have certain columns of data in each one
});

//TODO: should test that we get an error when fetching faqs if they don't exists

test("can fetch a single faq", async ({ assert, client }) => {
  const faqObject = {
    title: "Single Faq to fetch",
    description: "This is a single faq to fetch"
  };

  await Faq.create(faqObject);

  const response = await client.get("/faqs/1").end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: faqObject
  });
});

//TODO: should test that we get an error when fetching a single faq that doesn't exist

//TODO: test that we can create FAQs

//TODO: test that we can delete faqs

//TODO: test that we can update faqs
