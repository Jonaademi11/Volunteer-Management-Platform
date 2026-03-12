const userService = require("../services/user.service");

const register = async (req, res) => {
  try {
    const { fullName, email, phone, languages, skills, password, role } =
      req.body;
    const user = await userService.register(
      fullName,
      email,
      phone,
      languages,
      skills,
      password,
      role,
    );
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Could not register user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await userService.findUser(email);
    if (!userExist) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const user = await userService.login(email, password);
    console.log(user);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: "Could not login user" });
  }
};

const getCurrentUser = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const currentUser = await userService.findCurrentUser(token);
    res.status(200).json(currentUser);
  } catch (err) {
    res.status(500).json({ message: "Could not get current user" });
  }
};
const updateUser = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const currentUser = await userService.findCurrentUser(token);
    const { fullName, email, phone, languages, skills, password, role } =
      req.body;
    const updatedUser = await userService.updateUser(
      currentUser._id,
      fullName,
      email,
      phone,
      languages,
      skills,
      password,
      role,
    );

    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  const token = req.header("x-auth-header");
  try {
    const currentUser = await userService.findCurrentUser(token);

    await userService.deleteUser(currentUser._id);
    res.status(200).json({ message: "User deleted!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports = {
  register,
  login,
  getCurrentUser,
  updateUser,
  deleteUser,
};
