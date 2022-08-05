const express = require("express");
const { authenticateToken } = require("../utils/jwt");
const router = express.Router();
const ticketController = require("./tickets.controller");


// Public form API must be accessible without any authentication.
router.get("/myTickets", authenticateToken, async (request, response) => {
    const result = await ticketController.getTicket(request);
    return response.json(result);
  });
router.post("/bookTicket", authenticateToken, async (request, response) => {
  const result = await ticketController.addTicket(request);
  return response.json(result);
});

// API to claim leads.
router.put("/updateTicket/:ticketId", authenticateToken, async (req, res) => {
  const result = await ticketController.updateTicket(req);
  return res.json(result);
});
router.delete("/deleteTicket/:ticketId", authenticateToken, async (req, res) => {
  const result = await ticketController.deleteTicket(req);
  return res.json(result);
});

module.exports = router;
