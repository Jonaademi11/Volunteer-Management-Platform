const express = require("express");
const router = express.Router();
const eventController = require("../controllers/event.controller");
const auth = require("../middleware/auth");
router.post("/createEvent", auth, eventController.createEvent);
router.get("/getAllEvents", auth, eventController.getAllEvents);
router.put("/updateEvent/:eventId", auth, eventController.updateEvent);
router.delete("/deleteEvent/:eventId", auth, eventController.deleteEvent);

module.exports = router;
