const moviesDataAccess = require("./movies.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.getMovies = async () => {
  const getAllMovies = await moviesDataAccess.getMovie();
  return getAllMovies;
};
exports.getMoviesByCineam = async (req) => {
  const { cinemaId } = req.query;
  const filter = {
    cinema: cinemaId,
  };
  if (!cinemaId) {
    throw new ExpressError(401, "Bad request");
  }
  const getAllMovies = await moviesDataAccess.getMovieByCinema(filter);
  return getAllMovies;
};

exports.addMovie = async (req) => {
  const userId = req.token_data._id;
  const { cinemaId } = req.query;

  const {
    movieName,
    description,
    duration,
    rating,
    languages,
    genre,
    certificate,
    format,
    releaseDate,
  } = req.body;
  if (!movieName || !releaseDate || !duration || !genre || !languages) {
    throw new ExpressError(401, "Bad request");
  }
  const movieData = {
    movieName,
    description,
    duration,
    rating,
    languages,
    genre,
    certificate,
    format,
    releaseDate,
    cinema: cinemaId,
  };
  const lead = await moviesDataAccess.addMovie(movieData);
  // if (lead) {
  //   addToCinema = {
  //     cinemaId,
  //     movieId: lead._id,
  //   };
  //   const addedToUser = await moviesDataAccess.addMovieToCinema(addToCinema);
  return {
    error: false,
    sucess: true,
    message: "Get movie data",
    data: lead,
  };
};
exports.updateMovie = async (req) => {
  const { movieId } = req.params;
  const {
    movieName,
    description,
    duration,
    rating,
    languages,
    genre,
    certificate,
    format,
    releaseDate,
  } = req.body;

  if (!movieId) {
    throw new ExpressError(401, "Bad request");
  }

  const updateMovieData = {
    movieId,
    toUpdate: req.body,
  };
  const update = await moviesDataAccess.updateMovie(updateMovieData);
  if (!update) {
    return {
      error: true,
      sucess: false,
      message: "movie not updated",
    };
  }
  return {
    error: false,
    sucess: true,
    message: "Movies updated successfully!",
    data: update,
  };
};

exports.deleteMovie = async (req) => {
  const { movieId } = req.params;
  const { cinemaId } = req.query;

  if (!movieId) {
    throw new ExpressError(401, "Bad request");
  }

  const deleted = await moviesDataAccess.deleteMovie(movieId);
  if (deleted.deletedCount > 0) {
    console.log(deleted);
    deleteToMovie = {
      cinemaId,
      movieId,
    };
    const deletedToUser = await moviesDataAccess.deleteMovieToCinema(
      deleteToMovie
    );
    return {
      error: false,
      sucess: true,
      message: "Movie deleted successfully!",
      data: deleted,
    };
  }
  return {
    error: true,
    sucess: false,
    message: "movie not deleted",
  };
};
