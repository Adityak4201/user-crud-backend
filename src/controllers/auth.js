const { createUser, updateUser } = require("../services/userService");
const { validationResult } = require("express-validator");
const User = require("../models/user");

exports.Register = async function (req, res) {
  //console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, name, phone, city, state, country, area } = req.body;
  try {
    const createdUser = await createUser({
      email,
      name,
      phone,
      city,
      state,
      country,
      area,
    });
    // console.log(createdUser);
    return res.send(createdUser);
  } catch (error) {
    res.status(402).json({ errors: error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) throw "No Users";
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(402).json({ error });
  }
};

exports.UpdateUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, name, phone, country, city, state, area } = req.body;
  // console.log(email, password, firstName, lastName, phone);
  try {
    const updatedUser = await updateUser({
      email,
      phone,
      name,
      country,
      city,
      state,
      area,
    });
    // console.log(updatedUser);
    return res.send({ updatedUser });
  } catch (error) {
    res.status(402).json({ error });
  }
};

exports.Delete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email } = req.query;
  await User.findOneAndDelete({ email })
    .then((user) => {
      if (!user) {
        return res.status(402).send({
          error: "User not found with email " + email,
        });
      }
      res.send({ msg: "User Deleted Successfully" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(402).send({
          message: "User not found with email " + email,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with email " + email,
      });
    });
};
