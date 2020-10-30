var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var functions = require('../functions/functions');

var router = express.Router();


router.use(ensureAuthenticated);

router.get("/", function(req, res){
    res.render("form/form");
    
});

router.post("/", function(req,res){
    res.render("form/customcluster", { functions:functions });
    req.flash("info", "Your Cluster is being created!");
    
});

module.exports = router;