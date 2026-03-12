const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  languages: [{ type: String }],
  skills: [{ type: String }],
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
