const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("x-auth-header");
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "secret");
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ msg: "Token is not valid" });
  }
};
module.exports = auth;
