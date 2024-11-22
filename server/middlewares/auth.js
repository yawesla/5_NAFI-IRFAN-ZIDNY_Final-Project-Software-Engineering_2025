const { User} = require("../models");
const { verifyToken } = require("../helpers/jwt");

async function AuthN(req, res, next) {
  try {
    const { access_token } = req.headers; 

    if (!access_token) {
      throw { name: "INVALID_TOKEN" }; //401
    }

    //balikin jadi payload
    const payload = verifyToken(access_token);
    const userId = payload.id;
    const searchUser = await User.findByPk(userId);

    if (!searchUser) {
      throw { name: "USER_NOT_FOUND" };
    }

    req.data = { id: searchUser.id, role: searchUser.role };

    next();
  } catch (err) {
    // console.log(err);
    next(err);
  }
}


module.exports = { AuthN};
