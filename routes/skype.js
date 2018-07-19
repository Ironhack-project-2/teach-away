//Importing required modules
var express = require('express');
var app = express();
const skypeRoutes = express.Router();
var bodyParser = require('body-parser');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken')
let APIKey="09e3080a-0c19-d932-521e-c88b6dd32a93";
let APISecret="0af11f9d-78f5-29a6-7c7e-f3b12687f006";

skypeRoutes.get("/verClase", (req, res, next) => {
  user = res.locals.user;
  res.render("curso/verClase", { user });

});

/*
// Used to serve our "front-end"
app.use(express.static('public'));

// Used to transform body request to JSON
app.use(bodyParser.json());


// In-memory storage that contains all the messages we're receiving from Skype Interviews
const messages = []

// Function to verify if the request is valid and authenticated
function signatureIsValid(signature, content) {
  try {
    jwt.verify(signature, APISecret, {
      issuer: APIKey,
      ignoreExpiration: false,
      subject: sha256(content)
    })
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}

// Create a "POST" endpoint where of where the messages should arrive to
skypeRoutes.post('/verClase', function(req, res) {
  const authorization = req.headers.authorization.substring(7);
  if (signatureIsValid(authorization, JSON.stringify(req.body))) {
    messages.push(req.body)
    res.end('OK')
  } else {
    res.status(403).render()
  }
});

// Serves the index.html file
skypeRoutes.get("/verClase", function (request, response) {
  response.sendFile(__dirname + '/views/curso/index.html');
});

// Returns the "front-end" the messages that it's receiving from Skype Interviews
skypeRoutes.get('/messages', function(req, res) {
  res.send(messages);
});

/* Starts the server
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});/


const express = require("express");
const passport = require('passport');
const skypeRoutes = express.Router();
const User = require("../models/User");
const Guid = require('guid');
const sha256= require('sha256');
const jwt= require('jsonwebtoken');

const fetch=require('node-fetch');


let APIKey="09e3080a-0c19-d932-521e-c88b6dd32a93";
let APISecret="0af11f9d-78f5-29a6-7c7e-f3b12687f006";

function generateToken(content) {
  jwt.sign({
    jti: Guid.raw(),
    iss: APIKey,
    sub: sha256(content),
    exp: Math.floor(Date.now() / 1000) + 10
  }, APISecret)
}

console.log(generateToken)
// import fetch from 'node-fetch'

const payload = {    "jti": Guid.raw(), // Random GUID
"iss": APIKey,
"iat": Math.floor(Date.now() / 1000), // Current NumericDate
"sub": sha256(""), // SHA256 hash request body
"exp": Math.floor(Date.now() / 1000) + 10 // Current NumericDate + 10 seconds
}

console.log("====================== token JASON");
console.log(generateToken(JSON.stringify(payload)));
console.log("================ payload =====")
console.log(payload);

fetch('https://interviews.skype.com/api/interviews', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + generateToken(JSON.stringify(payload))
  },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(console.log)

// const payload = {}
// axios.post('https://interviews.skype.com/api/interviews', {
//  //   method: 'POST',
//    headers: {
//      'Content-Type': 'application/json',
//      'Authorization': 'Bearer ' + generateToken(JSON.stringify(payload))
//    },
//    body: JSON.stringify(payload) 
// })
// .then(response => {
//     response.json();
//     console.log('post success');
//     console.log(response)
// })
// .catch(error => {
//     console.log('Oh No! Error!');  
//     console.log(error)
// }) */
module.exports = skypeRoutes;
