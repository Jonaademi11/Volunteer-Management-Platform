const mongoose = require("mongoose");
const mongoDbConnection = mongoose
  .connect("mongodb://localhost:27017/volunteer_platform")
  .then(() => {
    console.log("Connection to db successful");
  })
  .catch((err) => {
    console.log("Could not connect to db", err);
  });

module.exports = mongoDbConnection;
