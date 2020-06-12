// Created by Deepak 
// at some parts taken help from stackoverflow

const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

router.route("/login")

.post( [
  check("email").isEmail({min: 6, max:60}).withMessage("Enter a Valid Email"),
  check("password").isString().isLength({min:6, max:50}).withMessage("Password must be atleast 6 cahracter wrong."),
], (req,res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let errorArray = errors.array();
    let tmpArray = [];
    for(let i = 0; i < errorArray.length; i++ ) {
      tmpArray.push(errorArray[i].msg);
    }
    return res.status(422).json({ errors: [tmpArray] });
  }

  
  db.connect(async (err, client, release) => {
    if (err) {
      console.error("Error acquiring client", err.stack);
      return res.status(422).json({ errors: ["Unknown error."] });

    }
    const {email, password} = req.body;
    const userInfo = await client.query("select * from \"user\" where email = $1;", [email]);
    if(userInfo.rows.length === 0) {
      return res.status(422).json({ errors: ["Email does not exist in our Database"] });
    } else {
        if(bcrypt.compareSync(password, userInfo.rows[0].password) ) {
          req.User.userId = userInfo.rows[0].userid;
          req.User.gender = userInfo.rows[0].gender;
          req.User.firstName = userInfo.rows[0].first_name;
          req.User.goalWeight = userInfo.rows[0].goalweight;
          req.User.calorieGoal = userInfo.rows[0].caloriegoal;
          release();
          res.json({isLoggedIn: true});
        } else {
            release();
            return res.status(422).json({ errors: ["Incorrect Password"] });
        }
    }
  });
});

module.exports = router;