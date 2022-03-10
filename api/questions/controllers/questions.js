"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async find(ctx) {
    const questionsAsked = ctx?.state?.user?.questionsAsked
      ? JSON.parse(ctx?.state?.user?.questionsAsked)
      : [];
    const questions = await strapi.services.questions.find();

    function shuffleArray(originalArray) {
      const array = [...originalArray];
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    const questionsClean = shuffleArray(
      questions.filter((x) => !questionsAsked.includes(x.id))
    ).slice(0, 10);

    const cleanAnswers = (answers) => {
      return answers.map((x) => ({ _id: x.id, answer: x.answer }));
    };

    const res = questionsClean.reduce((acc, x) => {
      if (questionsAsked.includes(x.id)) {
        return acc;
      }

      acc.push({
        _id: x._id,
        question: x.question,
        answers: cleanAnswers(x.answers),
      });

      return acc;
    }, []);
    return res;
  },
};
