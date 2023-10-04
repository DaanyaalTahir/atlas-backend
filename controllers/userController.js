const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
