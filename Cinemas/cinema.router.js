const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const cinemaController = require("./cinema.controller");

router.get("/getAllCinemas", async (request, response) => {
  const result = await cinemaController.getCinema(request);
  return response.json(result);
});

// Public form API must be accessible without any authentication.
router.post("/addCinema", authenticateToken, async (request, response) => {
  const result = await cinemaController.addCinema(request);
  return response.json(result);
});

// API to claim leads.
router.put("/updateCinema/:cinemaId", authenticateToken, async (req, res) => {
  const result = await cinemaController.updateCinema(req);
  return res.json(result);
});
router.delete("/deleteCinema/:cinemaId", authenticateToken, async (req, res) => {
  const result = await cinemaController.deleteCinema(req);
  return res.json(result);
});

module.exports = router;
