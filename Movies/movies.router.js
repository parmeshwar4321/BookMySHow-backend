const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const moviesController = require("./movies.controller");

router.get("/getAllMovies", async (request, response) => {
  const result = await moviesController.getMovies(request);
  return response.json(result);
});
router.get("/getAllMoviesByCinema", async (request, response) => {
  const result = await moviesController.getMoviesByCineam(request);
  return response.json(result);
});

router.post("/addMovies", authenticateToken, async (request, response) => {
  const result = await moviesController.addMovie(request);
  return response.json(result);
});



router.put("/updateMovies/:movieId", authenticateToken, async (req, res) => {
  const result = await moviesController.updateMovie(req);
  return res.json(result);
});
router.delete("/deleteMovies/:movieId", authenticateToken, async (req, res) => {
  const result = await moviesController.deleteMovie(req);
  return res.json(result);
});

module.exports = router;
