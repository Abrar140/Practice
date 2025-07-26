const router = require("express").Router();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const User = require("../Models/User");

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    if (!fullName || !email) {
      return res.status(400).json({ message: "please enter all feilds" });
    }
    const isAlreadyexixt = await User.findOne({ email });
    if (isAlreadyexixt) {
      return res.status(400).json({ message: "User alredy exist" });
    }

    // If no password is provided, set it to "lahore"
    const userPassword = password || "lahore";
    const userRole = role || "user";

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const newUser = new User({
      name: fullName,
      email,
      password: hashedPassword,
      role: userRole,
    });
    newUser.save();
    return res.status(200).json({ message: "user saved Sucessfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!password || !email) {
      return res.status(400).json({ message: "please enter all feilds" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User donot exist" });
    }

    const checkvalidation = await bcrypt.compare(password, user.password);
    if (!checkvalidation) {
      return res
        .status(400)
        .send({ message: "User email or password is incorrect" });
    }

    const payload = {
      userId: user._id,
      email: user.email,
    };
    const JWTkey = "pwwf@lahore@123";

    JWT.sign(payload, JWTkey, { expiresIn: "30m" }, async (error, token) => {
      if (error) {
        return res.status(500).send({ message: "Internal Server Error+++" });
      }

      await User.updateOne({ _id: user._id }, { $set: { token } });
      user.token = token;
      user.save();

      return res.status(201).json({
        user: { id: user._id, email: user.email, fullName: user.fullName },
        token: token,
        message: "Login Sucessfully.....",
      });
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..." });
  }
});

router.post("/forgot", async (req, res) => {
  try {
    const { Email, NewPassword, ConfirmPassword } = req.body;
    const hashedPassword = await bcrypt.hash(NewPassword, 10);

    const updateduser = await User.updateOne(
      { email: Email },
      { $set: { password: hashedPassword } }
    );

    if (updateduser.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "User password updated successfully" });
    } else {
      const user = await User.findOne({ email: Email });
      if (!user) {
        return res.status(400).json({ message: "User donot exist" });
      }
      return res
        .status(400)
        .json({ message: "Network error password not updated" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..." });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { email, role } = req.body;
    const thatuser = await User.findOne({ email, role });
    if(thatuser.assignedtask>0){
      return res.status(404).json({ message: "Cannot delete user with assigned task" });

    }

    const user = await User.findOneAndDelete({ email, role });
    if (user) {
      return res
        .status(200)
        .json({ message: "User deleted successfully", user });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..." });
  }
});

router.get("/roles", async (req, res) => {
  try {
    const user = await User.distinct("role");
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive roles" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive users" });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updateduser = await User.updateOne(
      { email: email },
      { $set: { name: name, role: role } }
    );

    if (updateduser.modifiedCount > 0) {
      return res
        .status(200)
        .json({ message: "Userhas been updated successfully" });
    } else if (updateduser.modifiedCount === 0) {
      return res.status(400).json({ message: "nothing is updated " });
    } else {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(400).json({ message: "User donot exist" });
      }
      return res
        .status(400)
        .json({ message: "Network error user not updated" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error..." });
  }
});

router.get("/find/:Name", async (req, res) => {
  try {
    const user = await User.find({ name: req.params.Name });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive user" });
  }
});
router.get("/find", async (req, res) => {
  const { user } = req.body;
  try {
    const usern = await User.find({ _id: user });
    res.status(200).json(usern.name);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrive user" });
  }
});

module.exports = router;
