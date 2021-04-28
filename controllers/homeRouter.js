const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home Page",
    isLoggedIn: false,
    user: { username: "test", id: 1 },
  });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Log-In Page" });
});

router.get("/signup", (req, res) => {
  res.render("signup", { title: "Sign-Up Page" });
});

module.exports = router;
