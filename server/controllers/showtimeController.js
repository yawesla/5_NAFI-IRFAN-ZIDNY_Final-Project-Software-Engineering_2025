const { Ticket, Transaction, Showtime, Movie, User } = require("../models");
const { Op } = require('sequelize');

class showtimeController{

    static async getShowtime(req, res, next){
        try{
            const showtimes = await Showtime.findAll({})

            res.status(200).json({
                status: 200,
                data: showtimes,
                message: "Showtimes fetched successfully"
            })
        }catch(err){
            next(err);
        }
    }

    static async getShowtimeByMovieID(req, res, next){
        
        try{
            const id = +req.params.movieID;
            const showtimes = await Showtime.findAll({
                where: {
                    movieID: id
                },
                include: [
                    {
                      model: Movie,
                      attributes: ["title", "image_link"],
                    },
                  ],
            });
            if(showtimes){
                res.status(200).json({
                    status: 200,
                    data: showtimes,
                    message: "Showtime fetched successfully"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "Invalid ID / Movie doesn't exist"
                })
            }
        }catch(err){
            next(err);
        }
    }
}

module.exports = showtimeController