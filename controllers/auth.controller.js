const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.status(201).send("User created");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User doesn't exist");

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect)
      return res.status(404).send("Email or password isn't correct");

    // const { email, name, country } = user;
    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  register,
  login,
  logout,
};