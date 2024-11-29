const { Ticket, Transaction, Showtime, Movie, User } = require("../models");
const showtime = require("../models/showtime");

class ticketController {
  static async buyTicket(req, res, next) {
    try {
      //Milih Showtime
      const { start_time, quantity, seat_number } = req.body;
      console.log("🚀 ~ ticketController ~ buyTicket ~ seat_number:", seat_number)
      console.log("🚀 ~ ticketController ~ buyTicket ~ quantity:", quantity)
      console.log("🚀 ~ ticketController ~ buyTicket ~ start_time:", start_time)
      const movieID = +req.params.id;

      //harusnya findOne
      const showtime = await Showtime.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          movieID,
          start_time
        },
      });

      //t Transaction
      const transaction = await Transaction.create({
        userID: req.data.id,
        total_amount: showtime.price * quantity,
        quantity,
        status: "Completed",
        payment_method: "Cash",
        payment_date: Date.now(),
      });

      //
      const created = await Ticket.create({
        transactionID: transaction.id,
        showtimeID: showtime.id,
        seat_number,
      });

      res.status(201).json({
        statusCode: 201,
        data: created,
        message: "Ticket is added",
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTickets(req, res, next) {
    try {
      const data = await Ticket.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Transaction,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            where: {
              userID: req.data.id,
            },
            include: [
              {
                model: User,
                attributes: ["id", "email"],
              },
            ],
          },
          {
            model: Showtime,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Movie,
              },
            ],
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTicketDetail(req, res, next) {
    try {
      const id = +req.params.id;

      const data = await Ticket.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          id: id,
        },
        include: [
          {
            model: Showtime,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: Movie,
                attributes: ["id", "title"],
              },
            ],
          },
        ],
      });

      res.status(200).json({
        statusCode: 200,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ticketController;
