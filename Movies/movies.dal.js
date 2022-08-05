const movies = require("./movies.model");
const cinema = require("../Cinemas/cinema.model");
require("../utils/jwt");

const getMovie = async () => {
  const getAllMovies = await movies.find();
  return getAllMovies;
};
const getMovieByCinema = async (filter) => {
  const getAllMovies = await movies.find(filter);
  return getAllMovies;
};
const addMovie = async (moviesToStore) => {
  console.log(moviesToStore);
  const storedMovie = await movies.create(moviesToStore);
  return storedMovie;
};
const addMovieToCinema = async (movieData) => {
  const storedMovie = await cinema.updateOne(
    { _id: movieData.cinemaId },
    { $push: { movies: movieData.movieId } }
  );
  return storedMovie;
};
const deleteMovieToCinema = async (movieData) => {
  const storedMovie = await cinema.updateOne(
    { _id: movieData.cinemaId },
    { $pull: { movies: movieData.movieId } }
  );
  return storedMovie;
};

const updateMovie = async (updateMovieData) => {
  const skill = await movies.findOneAndUpdate(
    { _id: updateMovieData.movieId },
    { $set: updateMovieData.toUpdate },
    { new: true }
  );
  return skill;
};
const deleteMovie = async (movieId) => {
  const skill = await movies.deleteOne({ _id: movieId });
  return skill;
};

module.exports = {
  getMovie,
  getMovieByCinema,
  addMovie,
  addMovieToCinema,
  updateMovie,
  deleteMovie,
  deleteMovieToCinema,
};
