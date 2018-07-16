const express = require("express");
const router = express.Router();
const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/becomeTeacher", (req, res, next) => {
  user = res.locals.user;
  res.render("becomeTeacher", { user });
});

router.post("/becomeTeacher", (req, res, next) => {
  user = res.locals.user;
  User.findByIdAndUpdate(user._id, { isTeacher: true })
    .then(() => {
      console.log(`Usuario ${user.username} se ha convertido a profesor`);
      user.isTeacher=true;
      res.render("teacher/teacherPanel", { user });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/userPanel");
    });
});

module.exports = router;
