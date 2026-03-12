const userService = require("../services/user.service");
const eventService = require("../services/event.service");

const createEvent = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const user = await userService.findCurrentUser(token);
    // console.log("Token user: ", user);
    const event = await eventService.addEvent(user.id, req.body);
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: "Could not create event" });
  }
};

const getAllEvents = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const user = await userService.findCurrentUser(token);
    const events = await eventService.getUserEvents(user.id);
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ message: "Could not get events" });
  }
};
const updateEvent = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const user = await userService.findCurrentUser(token);
    const { eventId } = req.params;
    const {
      title,
      description,
      date,
      location,
      maxVolunteers,
      participantUpdate,
    } = req.body;

    const event = await eventService.updateEvent(
      eventId,
      title,
      description,
      date,
      location,
      maxVolunteers,
      participantUpdate,
    );

    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const user = await userService.findCurrentUser(token);
    const { eventId } = req.params;
    const event = await eventService.deleteEvent(eventId);
    res.status(200).json({ message: "Event deleted successfully", event });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
};
