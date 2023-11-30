const express = require("express");
const router = express.Router();
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("../lib/auth");

router.get("/signup", isNotLoggedIn, function (req, res) {
  res.render("auth/signup");
});

router.post(
  "/signup",
  isNotLoggedIn,
  passport.authenticate("local.signup", {
    successRedirect: "/profile",
    failureRedirect: "/signup",
    failureFlash: true,
  })
);

router.get("/signin", isNotLoggedIn, function (req, res) {
  res.render("auth/signin");
});

router.post(
  "/signin",
  isNotLoggedIn,
  passport.authenticate("local.signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    failureFlash: true,
  })
);

router.get("/profile", isLoggedIn, (req, res) => {
  res.render("users/profile");
});

router.get("/logout", isLoggedIn, (req, res) => {
  req.logOut(() => {
    res.redirect("/signin");
  });
});

module.exports = router;
