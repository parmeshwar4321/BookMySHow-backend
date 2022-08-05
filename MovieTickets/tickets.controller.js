const ticketDataAccess = require("./tickets.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.getTicket = async () => {
  const getAllTicket = await ticketDataAccess.getTicket();
  return getAllTicket;
};
exports.addTicket = async (req) => {
  const userId = req.token_data._id;
  const { cinemaId, movieId } = req.query;
  console.log(userId);
  const { seats, screen } = req.body;

  if (!userId || !cinemaId || !movieId) {
    throw new ExpressError(401, "Bad request");
  }
  const ticketData = {
    seats,
    screen,
    cinema: cinemaId,
    movie: movieId,
    userId,
  };
  const lead = await ticketDataAccess.addTicket(ticketData);
  // if (lead) {
  //   addToUser = {
  //     userId: userId,
  //     cinemaId: lead._id,
  //   };
  //   const addedToUser = await ticketDataAccess.addTicketToUser(addToUser);
  return {
    error: false,
    sucess: true,
    message: "Get ticket data",
    data: lead,
  };
};
exports.updateTicket = async (req) => {
  const { cinemaId } = req.params;
  console.log(cinemaId);
  const { skillName, level, proficiency, yearsOfExperiance, isExpert } =
    req.body;

  if (!cinemaId) {
    throw new ExpressError(401, "Bad request");
  }

  const updateTicketData = {
    cinemaId,
    toUpdate: req.body,
  };
  console.log(updateTicketData);
  const update = await ticketDataAccess.updateTicket(updateTicketData);
  if (!update) {
    return {
      error: true,
      sucess: false,
      message: "skills not updated1",
    };
  }
  return {
    error: false,
    sucess: true,
    message: "Ticket updated successfully!",
    data: update,
  };
};

exports.deleteTicket = async (req) => {
  const { cinemaId } = req.params;
  const userId = "62cff7c3cee0c11d76e079bb";

  if (!cinemaId) {
    throw new ExpressError(401, "Bad request");
  }

  const deleted = await ticketDataAccess.deleteTicket(cinemaId);
  if (deleted.deletedCount > 0) {
    console.log(deleted);
    deleteToUser = {
      userId,
      cinemaId,
    };
    const deletedToUser = await ticketDataAccess.deleteTicketToUser(
      deleteToUser
    );
    return {
      error: false,
      sucess: true,
      message: "Ticket deleted successfully!",
      data: deleted,
    };
  }
  return {
    error: true,
    sucess: false,
    message: "skill not deleted",
  };
};
