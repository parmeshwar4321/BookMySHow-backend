const ticket = require("./tickets.models");
const user = require("../user/user.model");
require("../utils/jwt");

const getTicket = async () => {
  const getAllticket = await ticket.find().populate("cinema movie");
  return getAllticket;
};
const addTicket = async (ticketToStore) => {
  console.log(ticketToStore);
  const storedtickets = await ticket.create(ticketToStore);
  return storedtickets;
};

const addTicketToUser = async (movieData) => {
  const storedMovie = await cinema.updateOne(
    { _id: movieData.cinemaId },
    { $push: { movies: movieData.movieId } }
  );
  return storedMovie;
};
const deleteTicketToUser = async (movieData) => {
  const storedMovie = await cinema.updateOne(
    { _id: movieData.cinemaId },
    { $pull: { movies: movieData.movieId } }
  );
  return storedMovie;
};
const updateTicket = async (updateTicketData) => {
  const tickets = await ticket.findOneAndUpdate(
    { _id: updateTicketData.ticketsId },
    { $set: updateTicketData.toUpdate },
    { new: true }
  );
  return tickets;
};
const deleteTicket = async (ticketsId) => {
  const tickets = await ticket.deleteOne({ _id: ticketsId });
  return tickets;
};

module.exports = {
  getTicket,
  addTicket,
  addTicketToUser,
  updateTicket,
  deleteTicket,
  deleteTicketToUser,
};
