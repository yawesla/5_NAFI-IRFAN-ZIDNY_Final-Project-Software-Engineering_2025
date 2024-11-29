const { User } = require("../models");
const { comparePassword } = require("../helpers/encryption");
const { signToken } = require("../helpers/jwt");

class customerController {
  static async register(req, res, next) {
    try {
      const { name, email, password,phone_number} = req.body;

      const created = await User.create({
        name,
        email,
        password,
        phone_number,
        role: "Customer",
      });
      res.status(201).json({
        statusCode: 201,
        data: created,
        message: "Register Success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      //ambil data user dari database dgn findOne dgn where email(1)
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        throw { name: "loginInvalid" };
      }

      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: "loginInvalid" };
      }

      //4 - access token jwt
      const accessToken = signToken({
        id: user.id,
        name: user.name,
      });

      //(3)
      res.status(200).json({
        statusCode: 200,
        access_token: accessToken,
        name:user.name,
        role: user.role,
        message: "Logged in",
      });
    } catch (err) {
      next(err);
    }
  }

}

module.exports = customerController;
