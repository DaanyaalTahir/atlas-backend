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

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (password === user.password) {
      const userInfo = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      };

      return res
        .status(200)
        .json({ message: "Login successful", user: userInfo });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
