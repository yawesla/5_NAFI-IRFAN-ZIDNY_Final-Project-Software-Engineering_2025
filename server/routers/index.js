const express = require("express");
const router = express.Router();
const { AuthN} = require("../middlewares/auth");
const { errorHandle } = require("../middlewares/ErrorHandling");
const customerController = require("../controllers/customerController");
require("dotenv").config();

// Customer(Public)
router.post("/register", customerController.register);
router.post("/login", customerController.login);


router.use(AuthN); //pembelian tiket harus autentifikasi login customer


router.use(errorHandle);

module.exports = router;
