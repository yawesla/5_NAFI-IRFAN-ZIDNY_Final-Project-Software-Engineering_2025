const express = require("express");
const router = express.Router();
const { AuthN} = require("../middlewares/auth");
const { errorHandle } = require("../middlewares/ErrorHandling");
require("dotenv").config();

const customerController = require("../controllers/customerController.js")
const ticketController = require("../controllers/ticketController.js")
const movieController = require("../controllers/movieController.js")
const showtimeController = require("../controllers/showtimeController.js")

//router.[method]("/path",[xxxxController].[function])

router.post("/register", customerController.register);
router.post("/login", customerController.login);

router.get("/movies", movieController.getAllMovies)
router.get("/movies/:id([0-9]+)", movieController.getMovieById)
router.get("/movies/search", movieController.searchMovies)
router.get("/movies/:title([a-zA-Z0-9-_]+)", movieController.getMovieByTitle);

router.get("/showtimes", showtimeController.getShowtime)
router.get("/showtimes/:movieID", showtimeController.getShowtimeByMovieID)

router.use(AuthN); //pembelian tiket harus autentifikasi login customer
router.post("/tickets/:id", ticketController.buyTicket)
router.get("/tickets", ticketController.getTickets)
router.get("/tickets/:id", ticketController.getTicketDetail)

// router.get("/transactions", transactionController.getTransactions)

router.post("/movies/create", movieController.createMovie)
router.put("/movies/update/:id", movieController.updateMovie)
router.delete("/movies/delete/:id", movieController.deleteMovie)

router.use(errorHandle);

module.exports = router;
