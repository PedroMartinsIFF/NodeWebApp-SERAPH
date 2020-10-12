var express = require("express");
var passport = require("passport");
var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var User = require("../../models/user");

var router = express.Router();

function kops_create(callback){
    const { exec } = require("child_process");

    exec("kops create cluster \
    --state=${KOPS_STATE_STORE} \
    --node-count=2 \
    --master-size=t2.medium \
    --node-size=t2.medium \
    --zones=us-east-1a \
    --name=${KOPS_CLUSTER_NAME} \
    --ssh-public-key=/home/ec2-user/.ssh/id_rsa.pub \
    --dns private \
    --master-count 1", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});

callback();

}

function kops_update(){
    const { exec } = require("child_process");
    exec("kops update cluster --yes", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        });
        if (stdout)
        {
            kops_validate();
            console.log("Deu Bom");
        }
    
}

function kops_validate(){
    const { exec } = require("child_process");
    exec("kops validate cluster", (error, stdout, stderr) => {
    if (error) {
        console.log("Aguardando Validação");
        

        return setTimeout(kops_validate,180000);
    }
    if (stderr) {
        console.log("Nem sei oq q é isso");
        return;
    }
    if (stdout)
    {
        console.log("Deu Bom");
    }
});
}
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

router.get("/form", ensureAuthenticated, function(req, res){
    res.render("home/form");


});

router.post("/form", ensureAuthenticated, function(req,res){
    res.redirect("/about");
    kops_create(kops_update);

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
    successRedirect: "/",
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