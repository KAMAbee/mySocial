import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res
          .status(400)
          .json({ message: "User with this username is already exists" });
      }

      if (existingUser.email === email) {
        return res
          .status(400)
          .json({ message: "User with this email is already exists" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ userId: newUser._id, username: newUser.username });

  } catch (err) {
    res.status(500).json({message: "Server error"})
  }
};
