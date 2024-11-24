const express = require("express");
const router = express.Router();
const { AuthN} = require("../middlewares/auth");
const { errorHandle } = require("../middlewares/ErrorHandling");
require("dotenv").config();

const customerController = require("../controllers/customerController.js")
const ticketController = require("../controllers/ticketController.js")

//router.[method]("/path",[xxxxController].[function])


router.post("/register", customerController.register);
router.post("/login", customerController.login);
// router.get("/movies", movieController.getMovies)
// router.get("/movies/:id", movieController.getMoviesDetail)
// router.get("/showtimes", showtimeController.getShowtime)
// router.get("/showtimes/:id", showtimeController.getShowtimeMovie)


router.use(AuthN); //pembelian tiket harus autentifikasi login customer
router.post("/tickets/:id", ticketController.buyTicket)
router.get("/tickets", ticketController.getTickets)
router.get("/tickets/:id", ticketController.getTicketDetail)
// router.get("/transactions", transactionController.getTransactions)


router.use(errorHandle);

module.exports = router;
