const cinemaDataAccess = require("./cinema.dal");
const ExpressError = require("../utils/errorGenerator");
require("../utils/jwt");

exports.getCinema = async () => {
  const getAllCinema = await cinemaDataAccess.getCinema();
  return getAllCinema;
};
exports.addCinema = async (req) => {
  const userId = req.token_data._id;
  console.log(userId)

  const { cinemaName, location } =
    req.body;
  if (!cinemaName || !location) {
    throw new ExpressError(401, "Bad request");
  }
  const cinemaData = {
    cinemaName: req.body.cinemaName,
    location: req.body.location
  };
  const data = await cinemaDataAccess.addCinema(cinemaData);

  return {
    error: false,
    sucess: true,
    message: "Get cinema data",
    data: data,
  };

};
exports.updateCinema = async (req) => {
  const { cinemaId } = req.params;
  console.log(cinemaId);
  const { cinemaName, location } =
    req.body;

  if (!cinemaId) {
    throw new ExpressError(401, "Bad request");
  }

  const updateCinemaData = {
    cinemaId,
    toUpdate: req.body,
    // {
    // cinemaName: req.body.cinemaName,
    // location: req.body.location,
    //  },
  };
  console.log(updateCinemaData);
  const update = await cinemaDataAccess.updateCinema(updateCinemaData);
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
    message: "Cinema updated successfully!",
    data: update,
  };
};

exports.deleteCinema = async (req) => {
  const { cinemaId } = req.params;
  const userId = "62cff7c3cee0c11d76e079bb"

  if (!cinemaId) {
    throw new ExpressError(401, "Bad request");
  }

  const deleted = await cinemaDataAccess.deleteCinema(cinemaId);
  if (deleted.deletedCount > 0) {
    console.log(deleted);
    deleteToUser = {
      userId,
      cinemaId,
    };
    const deletedToUser = await cinemaDataAccess.deleteCinemaToUser(
      deleteToUser
    );
    return {
      error: false,
      sucess: true,
      message: "Cinema deleted successfully!",
      data: deleted,
    };
  }
  return {
    error: true,
    sucess: false,
    message: "skill not deleted",
  };
};
