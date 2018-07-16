const express = require("express");
const passport = require('passport');
const authRoutes = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');
const { ensureLoggedIn, ensureLoggedOut, isTeacher} = require("../middleware/ensureLogin");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

let transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'TeachAwayProject@gmail.com',
    pass: 'teach1234away' 
  }
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/auth/userPanel",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;


//  const rol = req.body.role;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);
    const hasConfCode = bcrypt.hashSync(username, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email,
      confirmationCode: hasConfCode.replace(/\//gi, "")
    });

    subject = "Confirmation email";
    message="http://localhost:3000/auth/confirm/"+hasConfCode.replace(/\//gi, "");

    newUser.save((err) => {
      if (err) {
        res.render("auth/signup", { message: "Something went wrong" });
      } else {
        res.redirect("/");
        transporter.sendMail({
          from: '"Teach-Away 👻" <TeachAwayProject@gmail.com>',
          to: email, 
          subject: subject, 
//          text: message,
          html: `<b>${message}</b>`
        })
        .then(info =>  console.log(`Mensaje enviado a ${email}`))
        .catch(error => console.log(error));
      }
    // close save  
    });
    // close findOne
  });
  // close post
});

authRoutes.get("/confirm/:confirmationCode", (req, res, next) => {
  confirmationCode = req.params.confirmationCode;
  console.log(confirmationCode);
  User.findOne({ confirmationCode }).then(user => {
    username=user.username;
    console.log(`Este es el user ${user}, username ${username}`)
    if (user === null) {
      res.render("error", { message: "The username not found. Something is wrong" });
    }else {
      User.findByIdAndUpdate(user._id,{ status : "Active" })
      .then(() =>  { 
        console.log(`Usuario ${user._id} ha sido activado`);
        res.render("auth/confirmation", { username });
      })
      .catch (err => console.log(err))
    }
;
  })
  .catch (err => console.log(err))
});

authRoutes.get("/userPanel", (req, res, next) => {
  user = res.locals.user;
  if (user.status == "Active"){
  res.render("student/userPanel", { user });
  } else {
    res.render("auth/status", { user });
  }

});



authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = authRoutes;

