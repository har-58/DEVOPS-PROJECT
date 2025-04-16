import express from "express";
import bcrypt from "bcryptjs";
import user from "../user.js"; // Ensure the import is in lowercase

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new user({ ...req.body, password: hashedPassword }); // Make sure to use 'user' here
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const user = await user.findOne({ email: req.body.email }); // Use 'user' here as well
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
