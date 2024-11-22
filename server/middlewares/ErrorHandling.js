async function errorHandle(err, req, res, next) {
    console.log(err);
  
    let code = 500;
    let msg = "Internal Server Error";
  
    if (err.name === "SequelizeValidationError" || err.name === 'SequelizeUniqueConstraintError') {
      code = 400;
      msg = err.errors[0].message; // dari model
    } else if (err.name === "ID_NOT_FOUND") {
      code = 404;
      msg = "Id not found";
    } else if (err.name === "USER_NOT_FOUND") {
      code = 401;
      msg = "User not found";
    } else if (err.name === "loginInvalid") {
      code = 401;
      msg = "Invalid email/password";
    } else if (err.name === "INVALID_TOKEN" || err.name === "JsonWebTokenError") {
      code = 401;
      msg = "Invalid access token";
    } else if (err.name === "NOT_ENOUGH_ACCESS") {
      code = 403;
      msg = "Forbidden, not enough access";
    } else if (err.name === "NOT_FOUND") {
      code = 404;
      msg = "Data not found";
    }
  
    //kembalikan status code dan pesan error
    res.status(code).json({
      statusCode: code,
      error: msg,
    });
  }
  
  module.exports = { errorHandle };
  