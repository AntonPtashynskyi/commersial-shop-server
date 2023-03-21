const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("../utils/createError");
const { JWT_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) {
      return next(createError(404, "Email or password isn't correct"));
    }

    const token = jwt.sign({ id: user._id, isSeller: user.isSeller }, JWT_KEY);

    const { password, ...info } = user._doc;
    res.cookie("accessToken", token, { httpOnly: true }).status(200).send(info);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  res
    .clearCookie("accessToken", { sameSite: "none", secure: true })
    .status(200)
    .send("User has been logged out.");
};

module.exports = {
  register,
  login,
  logout,
};
