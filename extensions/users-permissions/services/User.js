"use strict";

module.exports = {
  /**
   * Promise to fetch authenticated user.
   * @return {Promise}
   */

  async fetchAuthenticatedUser(id) {
    const user = await strapi
      .query("user", "users-permissions")
      .findOne({ id }, ["role"]);

    const history = await strapi.query("users-history").find({ user: id });
    user["history"] = history;
    return user;
  },
};
