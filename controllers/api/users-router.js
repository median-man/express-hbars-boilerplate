const { User } = require("../../models");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.create(req.body, { username, password });
    res.json({ id: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error." });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("User not found.");
    }
    const isValidPassword = await user.checkPassword(password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }
    res.json({ id: user.id });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid username or password." });
  }
});

module.exports = router;
