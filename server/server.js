require("dotenv").config();

var expressSession = require('express-session');

// Middleware 
const bodyParser = require("body-parser");
const session = require("client-sessions");
const helmet = require("helmet");
const express = require("express");
const app = express();
const path = require("path");

// Routing 
const food = require("./api/food");
const weight = require("./api/weight");
const signup = require("./api/signup");
const login = require("./api/login");
const userSettings = require("./api/user");
const isLoggedIn = require("./api/isLoggedIn");

// Middleware 
app.use(expressSession({secret: 'your secret', saveUninitialized: true, resave: false}));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));

// cookie from stackoverflow 
app.use(session({
    cookieName: "User",
    secret: 'cookieSecret',
    duration: 16000000000, 
    activeDuration: 1000 * 60 * 6,
    cookie: {
      httpOnly: true, 
      secure: false 
    }
  }));

if(process.env.NODE_ENV === "production") app.use(express.static(path.join(__dirname, 'build')));

app.all("*", (req, res, next) => {
  const isDefined = typeof(req.User.userId) === "undefined" ? false : true;
  const path = req.path;
  if(  (path.includes("/api") || path.includes("/user") ) && path !== "/api/isLoggedIn" ) {
    if(isDefined) {
      return next();
    } else {
      return res.redirect(401, "/login");
    }
  }
  return next();
} );


// Use Routes
app.use(food);
app.use(weight);
app.use(login);
app.use(userSettings);
app.use(signup);
app.use(isLoggedIn);

if(process.env.NODE_ENV === "production") {
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}
// Port Check
app.listen(process.env.PORT || 5000, () => console.log(`Working on Port ${process.env.PORT || 5000}`));
