var express = require("express");
var passport = require("passport");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");

var alerta;
var functions = require('../functions/functions');

var router = express.Router();



router.get("/", function(req,res){
    console.log("Start Page");
    res.render("home/index");
});

router.get("/home", function(req,res){
    console.log("Home Page");
    res.render("home/home");


});

router.get("/about", function(req,res){
    console.log("About Page");
    res.render("home/about");
    
});


router.get("/login", function(req,res){
    console.log("Login Page");
    res.render("home/login");

});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/home");
 });

router.post("/login", passport.authenticate("login", {
    successRedirect: "/form",
    failureRedirect: "/login",
    failureFlash: true
 }));

router.get("/signup", function(req,res){
    console.log("Sign Up Page");
    res.render("home/signup");

});

router.post("/signup", function (req, res, next) {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
 
    User.findOne({ email: email }, function (err, user) {
       if (err) { return next(err); }
       if (user) {
          req.flash("error", "There's already an account with this email");
          return res.redirect("/signup");
       }
 
       var newUser = new User({
          username: username,
          password: password,
          email: email
       });
 
       newUser.save(next);
 
    });
 
 }, passport.authenticate("login", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
 }));

 router.get

module.exports = router;