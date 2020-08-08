"use strict";
const Database = use("Database");
class UserController {
  async index({ request, response }) {
    const user = await Database.from("users").where(request.post());
    return user.length > 0
      ? response.json({
          status: true,
          message: "Login successfully",
          data: user,
        })
      : response
          .status(404)
          .json({ status: false, message: "Login failed", data: {} });
  }
}

module.exports = UserController;
