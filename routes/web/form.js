const e = require("express");
var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var functions = require('../functions/functions');

var router = express.Router();



router.use(ensureAuthenticated);

router.get("/", function(req, res){
    console.log("function")
    res.render("form/form");
    
});

router.get("/custom", function(req,res){
    console.log("custom")
    res.render("form/customcluster");
    functions.teste();
    
});

router.post('/custom', function (req,res){
    console.log(req.body);
    res.render("form/customsend", { functions:functions, success: "Your cluster is being created!" })
   functions.kops_create(req.body);
});

router.get('/delete', function (req,res){
    res.render("form/form", { functions:functions, success: "Your cluster has been deleted!" })
   functions.delete();
});

router.get('/verify', function (req,res){
    console.log(functions.verify());
    if(functions.verify() == 0){

        res.render("form/customsend", { functions:functions, success: "Cluster not ready yet" })
        
    }
    else{
        res.render("form/customsend", { functions:functions, success: "Your cluster is ready!" })
    }
    
});

router.get("/custom/send", function(req,res){
    res.render("form/customsend", { functions:functions, success: "Your cluster is being created!" })
    console.log("clicked");
});

router.get("/dask", function(req,res){
    console.log("dask")
    res.render("form/daskcluster", { functions:functions, success:'' });
    
});

router.post("/dask", function(req,res){
    console.log("dask")
    res.render("form/customsend", { functions:functions, success: "Your cluster is being created!" })
    functions.kops_create(req.body);
    functions.verify_2()
    
});

router.get("/customcluster", function(req,res){
    console.log("custom")
    
});

module.exports = router;