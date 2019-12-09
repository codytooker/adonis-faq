"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const Faq = use("App/Models/Faq");

/**
 * Resourceful controller for interacting with faqs
 */
class FaqsController {
  /**
   * Show a list of all faqs.
   * GET faqs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const faqs = await Faq.all();

    response.json({
      status: "success",
      data: { faqs: faqs }
    });
  }

  /**
   * Create/save a new faq.
   * POST faqs
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const data = request.only(["title", "description"]);

    //TODO: validation;

    const faq = await Faq.create(data);

    response.json({
      status: "success",
      data: { faq }
    });
  }

  /**
   * Display a single faq.
   * GET faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const faq = await Faq.findOrFail(params.id);

    response.json({
      status: "success",
      data: { faq }
    });
  }

  /**
   * Update faq details.
   * PUT or PATCH faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a faq with id.
   * DELETE faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const faq = await Faq.findOrFail(id);

    await faq.delete();

    response.status(204);
  }
}

module.exports = FaqsController;
