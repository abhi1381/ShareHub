var express = require("express");
var router = express.Router();
// var campGrounds = require("../models/campground");
// var  Comment    = require("../models/comment");
var  passport   = require("passport");
var User       = require("../models/user");
//Routes


//root route

router.get("/",function(req,res){
   res.render("land"); 
});



//AuthRoutes

//Register

router.get("/register",function(req, res) {
    res.render("register"); 
});

//handle logic

router.post("/register",function(req, res) {
    var newUser = new User({username:req.body.username});
    
    User.register(newUser,req.body.password,function (err,user) {
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function () {
            req.flash("success","Welcome to Camper " + user.username);
            res.redirect("/campGrounds");
        });
    }); 
});

//login

router.get("/login",function(req, res) {
    res.render("login"); 
});

//handle logic
router.post("/login",passport.authenticate("local",{
    successRedirect:"/campGrounds",
    failureRedirect:"/login"
}),function(req, res) {
   
});

//logout
router.get("/logout",function(req, res) {
    req.logout();
    req.flash("success","logged you out!");
    res.redirect("/campGrounds");
});

module.exports = router;