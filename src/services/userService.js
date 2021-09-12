const User = require("../models/user");

exports.createUser = async (userData) => {
  try {
    const user = new User(userData);
    var createdUser = await user.save();
    return createdUser;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};

exports.updateUser = async (userData) => {
  try {
    // console.log("userData", userData);
    const { name, email, phone, city, country, state, area } = userData;
    const filter = { email };
    const update = {
      name,
      email,
      phone,
      city,
      state,
      country,
      area,
    };
    let user = await User.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: false,
    });
    // console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};
