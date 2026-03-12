const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");

const generateToken = (userId) => {
  const token = jwt.sign({ id: userId }, "secret", { expiresIn: "1d" });
  return token;
};

const register = async (
  fullName,
  email,
  phone,
  languages,
  skills,
  password,
  role,
) => {
  try {
    const userRegister = await User.findOne({ email: email });
    if (userRegister) {
      throw new Error("User with this email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 8);
    const newUser = new User({
      fullName: fullName,
      email: email,
      phone: phone,
      languages: languages,
      skills: skills,
      password: hashPassword,
      role: role,
    });
    await newUser.save();
    return newUser;
  } catch (err) {
    return err;
  }
};
const login = async (email, password) => {
  const user = await findUser(email);

  if (!user) {
    return null;
  }
  const compared = await bcrypt.compare(password, user.password);
  if (compared === true) {
    const token = generateToken(user._id);
    return { user: user, accessToken: token };
  }
  return null;
};

const findUser = async (email) => {
  const user = User.findOne({ email: email });
  return user;
};

const findCurrentUser = async (token) => {
  const decoded = jwt.verify(token, "secret");
  const userId = decoded.id;
  const userCurrent = await User.findOne({ _id: userId }).select("-password");
  if (!userCurrent) {
    throw new Error("User not found");
  }
  return userCurrent;
};

const updateUser = async (
  userId,
  fullName,
  email,
  phone,
  languages,
  skills,
  password,
  role,
) => {
  try {
    const user = await User.findOne(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (fullName) user.fullName = fullName;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (languages) user.languages = languages;
    if (skills) user.skills = skills;

    if (password) {
      const hashPassword = await bcrypt.hash(password, 8);
      user.password = hashPassword;
    }

    if (role) {
      const existingRole = await Role.findOne({ _id: role });
      if (!existingRole) {
        throw new Error("Role not found");
      }
      user.role = role;
    }
    await user.save();

    return await User.findOne(userId).select("-password").populate("role");
  } catch (err) {
    throw new Error("Could not update user!");
  }
};

const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

module.exports = {
  register,
  findUser,
  login,
  findCurrentUser,
  updateUser,
  deleteUser,
};
