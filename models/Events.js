const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  location: { type: String },
  maxVolunteers: { type: Number, default: 0 },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      status: {
        type: String,
        enum: ["Present", "Absent", "Pending"],
        default: "Pending",
      },
      hoursWorked: { type: Number, default: 0 },
      notes: { type: String, default: "" },
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
