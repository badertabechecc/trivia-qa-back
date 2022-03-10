"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { userId, answerId, questionId } = ctx.request.body;

    const { isCorrect } = await strapi.services.answers.findOne({
      id: answerId,
    });
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id: userId }, ["role"]);

    const { numQuestion, questionsAsked, score } = user;

    let questionAskedParsed = !!questionsAsked
      ? JSON.parse(questionsAsked)
      : [];

    let data = user;
    if (!questionAskedParsed.includes(questionId)) {
      const updateData = {
        numQuestion: numQuestion + 1,
        questionsAsked: JSON.stringify(
          questionAskedParsed.concat([questionId])
        ),
        score: isCorrect ? score + 1 : score,
      };

      data = await strapi.plugins["users-permissions"].services.user.edit(
        { id: userId },
        updateData
      );
    }

    return data;
  },
};
