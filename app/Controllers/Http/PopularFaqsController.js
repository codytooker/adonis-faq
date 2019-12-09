"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with popularfaqs
 */
class PopularFaqController {
  constructor() {
    this.faq = use("App/Models/Faq");
  }

  /**
   * Create/save a new popular-faq.
   * POST popular-faqs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const id = request.input("id");

    const faq = await this.faq.findOrFail(id);

    faq.isPopular = true;
    await faq.save();

    response.json({
      status: "success",
      data: { faq }
    });
  }

  /**
   * Delete a popular faq with id.
   * DELETE popular-faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;

    const faq = await this.faq.findOrFail(id);

    faq.isPopular = false;
    await faq.save();

    response.json({
      status: "success",
      data: { faq }
    });
  }
}

module.exports = PopularFaqController;
