const userService = require("../services/user.service");
const Event = require("../models/Events");

const addEvent = async (userId, event) => {
  const user = userService.findUser(userId);
  if (!user) {
    throw new Error("User not found");
  }
  try {
    const newEvent = new Event({
      user: userId,
      ...event,
    });
    await newEvent.save();
    return newEvent;
  } catch (err) {
    throw new Error("Could not create event");
  }
};

const getUserEvents = async (userId) => {
  const events = await Event.find({ "participants.user": userId });
  return events;
};
const updateEvent = async (
  eventId,
  title,
  description,
  date,
  location,
  maxVolunteers,
  participantUpdate,
) => {
  const event = await Event.findById(eventId);
  if (!event) {
    throw new Error("Event not found!");
  }

  event.title = title;
  event.description = description;
  event.date = date;
  event.location = location;
  event.maxVolunteers = maxVolunteers;

  if (participantUpdate) {
    const { userId, status, hoursWorked, notes } = participantUpdate;
    const participant = event.participants.find(
      (p) => p.user.toString() === userId,
    );
    if (!participant) throw new Error("Participant not found");

    participant.status = status;
    participant.hoursWorked = hoursWorked;
    participant.notes = notes;
  }

  await event.save();
  return event;
};
const deleteEvent = async (eventId) => {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) throw new Error("Event not found!");
  return event;
};
module.exports = {
  addEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
};
