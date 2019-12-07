"use strict";

const { test, trait } = use("Test/Suite")("Faqs Controller");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("DatabaseTransactions");

test("can get faqs", async ({ assert, client }) => {
  const faqData = {
    title: "My First Faq",
    description: "The description of my first FAQ"
  };

  await Factory.model("App/Models/Faq").create(faqData);

  const response = await client.get("/faqs").end();

  response.assertStatus(200);
  assert.equal(response.body.data.length, 1);
  response.assertJSONSubset({
    data: [faqData]
  });
});
