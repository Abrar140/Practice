// const { Router } = require("express");
// const User = require("../Models/User");
// const mongoose = require("mongoose");
// const { checkForAuthentication } = require("../Middleware/authormidleware");
// const router = Router();

// router.post("/signin", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const token = await User.matchPasswordAndGenerateToken(email, password);

//     return res
//       .cookie("token", token)
//       .json({ message: "User sign in  successfully" });
//   } catch (error) {
//     return res.status(500).json({ error: "Failed to Sign in  user" });
//   }
// });

// router.get("/logout", (req, res) => {
//   res.clearCookie("token");
// });

// router.post("/signup", async (req, res) => {
//   const { fullName, email, password } = req.body;

//   try {
//     // Create new user
//     const newUser = await User.create({ fullName, email, password });
//     console.log("User created:", newUser);
//     return res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return res.status(500).json({ error: "Failed to create user" });
//   }
// });

// module.exports = router;
const { Router } = require("express");
const User = require("../Models/User");
const { checkForAuthentication } = require("../Middleware/authentic");
const router = Router();

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);

    return res
      .cookie("token", token, { httpOnly: true }) // added httpOnly
      .json({ message: "User signed in successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to sign in user" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true }).json({ message: "User logged out successfully" }); // added httpOnly and message
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Create new user
    const newUser = await User.create({ fullName, email, password });
    console.log("User created:", newUser);
    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user" });
  }
});

module.exports = router;
