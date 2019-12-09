"use strict";

const { test, trait } = use("Test/Suite")("Popular Faq Controller");
const Factory = use("Factory");

trait("Test/ApiClient");
trait("DatabaseTransactions");

const Faq = Factory.model("App/Models/Faq");

test("an faq can be popular", async ({ client }) => {
  const faq = await Faq.create();

  const response = await client
    .post("popular-faqs")
    .send({ id: faq.id })
    .end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { faq: { isPopular: true } }
  });
});

test("an faq can't be popular if it doesn't exist", async ({ client }) => {
  const response = await client
    .post("popular-faqs")
    .send({ id: 1 })
    .end();

  response.assertStatus(404);
});

test("an faq can become unpopular", async ({ client }) => {
  const faq = await Faq.create({ isPopular: true });

  const response = await client.delete(`popular-faqs/${faq.id}`).end();

  response.assertStatus(200);
  response.assertJSONSubset({
    data: { faq: { isPopular: false } }
  });
});

test("an faq can't become unpopular if it doesn't exist", async ({
  client
}) => {
  const response = await client.delete("popular-faqs/1").end();

  response.assertStatus(404);
});
