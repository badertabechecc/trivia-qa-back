"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const entity = await strapi.services.questions.find();

    const cleanAnswers = (answers) => {
      return answers.map((x) => ({ _id: x.id, answer: x.answer }));
    };

    return entity.map((x) => {
      return {
        _id: x._id,
        question: x.question,
        answers: cleanAnswers(x.answers),
      };
    });
  },
};
