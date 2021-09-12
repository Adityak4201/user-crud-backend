const { check } = require("express-validator");

exports.DeleteUserValidator = [check("email", "E-mail is required").isEmail()];

exports.RegisterValidator = [
  check("email", "E-mail is required").isEmail(),
  check("phone", "Phone is required").not().isEmpty(),
  check("name", "Name is required").not().isEmpty(),
  // check("city", "City is required").not().isEmpty(),
  // check("state", "State is required").not().isEmpty(),
  // check("country", "Country is required").not().isEmpty(),
  // check("area", "Area is required").not().isEmpty(),
];

exports.UpdateProfileValidator = [
  check("email", "E-mail is required").isEmail(),
  check("phone", "Phone is required").not().isEmpty(),
  check("name", "Name is required").not().isEmpty(),
  check("city", "City is required").not().isEmpty(),
  check("state", "State is required").not().isEmpty(),
  check("country", "Country is required").not().isEmpty(),
  check("area", "Area is required").not().isEmpty(),
];
