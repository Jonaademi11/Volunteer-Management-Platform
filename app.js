const express = require("express");
const mongoDbConnection = require("./db/connection");
require("dotenv").config();

const app = express();
mongoDbConnection
  .then(() => {
    console.log("test");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());

app.use("/api/user", require("./routes/user.routes"));
app.use("/api/role", require("./routes/role.routes"));
app.use("/api/event", require("./routes/event.routes"));

app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
