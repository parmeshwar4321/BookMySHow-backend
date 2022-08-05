const cinema = require("./cinema.model");
require("../utils/jwt");

const getCinema = async () => {
  const getAllcinema = await cinema.find();
  return getAllcinema;
};
const addCinema = async (cinemaToStore) => {
  console.log(cinemaToStore);
  const storedcinemas = await cinema.create(cinemaToStore);
  return storedcinemas;
};

const updateCinema = async (updateCinemaData) => {
  const cinemas = await cinema.findOneAndUpdate(
    { _id: updateCinemaData.cinemasId },
    { $set: updateCinemaData.toUpdate },
    { new: true }
  );
  return cinemas;
};
const deleteCinema = async (cinemasId) => {
  const cinemas = await cinema.deleteOne({ _id: cinemasId });
  return cinemas;
};

module.exports = {
  getCinema,
  addCinema,
  updateCinema,
  deleteCinema,
};
