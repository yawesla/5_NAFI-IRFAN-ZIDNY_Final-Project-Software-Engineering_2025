const { Ticket, Transaction, Showtime, Movie, User } = require("../models");
const { Op } = require('sequelize')

class movieController {

    static async getAllMovies(req, res, next){
        try {
            const movies = await Movie.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            })

            res.status(200).json({
                status: 200,
                data: movies,
                message: "fetching all movies successful"
            })
        }catch(err){
            next(err)
        }
    }

    static async getMovieById(req, res, next){
        try {
            const id = +req.params.id
            const movie = await Movie.findOne({
                attributes: {
                    exclude: ["createdAt","updatedAt"]
                },
                where: {
                    id
                },
                include: [
                    {
                      model: Showtime
                    },
                  ],
            })
            if(movie){
                res.status(200).json({
                    status: 200,
                    data: movie,
                    message: "fetching movie by id successful"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "invalid id - movie doesn't exist"
                })
            }
        }catch(err){
            next(err)
        }
    }

    static async getMovieByTitle(req, res, next){
        try {
            const title = req.params.title
            const movie = await Movie.findOne({
                attributes: {
                    exclude: ["createdAt","updatedAt"]
                },
                where: {
                    title
                }
            })
            if(movie){
                res.status(200).json({
                    status: 200,
                    data: movie,
                    message: "fetching movie by title successful"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "invalid title - movie doesn't exist"
                })
            }
        }catch(err){
            next(err)
        }
    }

    static async createMovie(req, res, next){
        try {
            const { title, image_link, synopsis, director, genre, release_date, duration } = req.body
            const movie = await Movie.create({
                title,
                image_link,
                synopsis,
                director,
                genre,
                release_date,
                duration
            })

            res.status(201).json({
                status: 201,
                data_inserted: movie, // for debugging purpose
                message: "insert new movie successful"
            })
        }catch(err){
            next(err)
        }
    }

    static async updateMovie(req, res, next){
        try {
            const { title, image_link, synopsis, director, genre, release_date, duration } = req.body
            const id = req.params.id
            const [updated_count, movies] = await Movie.update(
                { title, image_link, synopsis, director, genre, release_date, duration },
                {
                    where: { id },
                    returning: true
                }
            )
            if(updated_count){
                res.status(200).json({
                    status: 200,
                    updated_movie: movies[0],
                    message: "movie updated successfully"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    invalid_id: id,
                    message: "invalid id - movie doesnt exist"
                })
            }
        }catch(err){
            next(err)
        }
    }

    static async deleteMovie(req, res, next){
        try {
            const id = req.params.id
            const deleted_count = await Movie.destroy({
                where: { id }
            })
            if(deleted_count){
                res.status(200).json({
                    status: 200,
                    message: "movie deleted successfully"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "invalid id - movie doesn't exist"
                })
            }
        }catch(err){
            next(err)
        }
    }

    static async searchMovies(req, res, next){
        try {
            const { title, director, genre } = req.query

            const where_conditions = {}
            if(title) where_conditions.title = { [Op.iLike]: `%${title}%`}
            if(director) where_conditions.director = { [Op.iLike]: `%${director}%`}
            if(genre) where_conditions.genre = { [Op.iLike]: `%${genre}%`}

            const movies = await Movie.findAll({
                attributes: {
                    exclude: ["createdAt","updatedAt"]
                },
                where: where_conditions
            })

            if(movies.length > 0){
                res.status(200).json({
                    status: 200,
                    data: movies,
                    message: "fetch filtered-movies successful"
                })
            }else{
                res.status(404).json({
                    status: 404,
                    message: "no movies found that match the given filters"
                })
            }
        }catch(err){
            next(err)
        }
    }
}

module.exports = movieController