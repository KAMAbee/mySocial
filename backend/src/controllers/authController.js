import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

// Register
export const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg
      return res.status(400).json({ message: firstError });
  }

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
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0].msg;
      return res.status(400).json({ message: firstError });
    }

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ token, userId: user._id, username: user.username });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
