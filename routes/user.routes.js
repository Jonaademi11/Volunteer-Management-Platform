const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth");
const { validateRegister, validateLogin } = require("../middleware/validators");

router.post("/register", validateRegister, userController.register);
router.post("/login", validateLogin, userController.login);
router.get("/currentUser", auth, userController.getCurrentUser);
router.put("/updateUser", auth, userController.updateUser);
router.delete("/deleteUser", auth, userController.deleteUser);
module.exports = router;
