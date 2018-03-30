var express = require("express");
var router = express.Router();
var campGrounds = require("../models/campground");
var middlewares  = require("../middlewares");
// var  Comment    = require("../models/comment");


//camp

router.get("/", function(req,res){
    campGrounds.find({},function (err,campCollections) {
        if(err){
            console.log(err);
        }else{
             res.render("campgrounds/index",{campGrounds:campCollections,currentUser:req.user});
        }
    });
});


//camp create
router.post("/",middlewares.isLoggedIn,function (req,res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newCamp = {name:name,price:price,image:image,description:desc,author:author};
    campGrounds.create(newCamp,function(err,campCollections){
       if(err){
           console.log(err);
       } else {
          res.redirect("/campGrounds"); 
       }
    });
    
})


//form new

router.get("/new",middlewares.isLoggedIn,function(req, res) {
    res.render("campgrounds/new");
});

router.get("/:id",function(req, res) {
    campGrounds.findById(req.params.id).populate("comments").exec(function(err,found){
        if(err) {
            console.log(err);
        } else {
        
            res.render("campgrounds/show",{campGrounds:found});
        }
    })
});

//edit

router.get("/:id/edit",middlewares.campOwnership,function(req, res) {
    campGrounds.findById(req.params.id,function (err,foundCampground) {
        res.render("campgrounds/edit",{campground:foundCampground});
    });
});
    
//update

router.put("/:id",middlewares.campOwnership,function(req,res){
   campGrounds.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp) {
       if(err){
           res.redirect("/campGrounds");
       } else {
           res.redirect("/campGrounds/" + req.params.id);
       }
   }); 
});

// DESTROY

router.delete("/:id",middlewares.campOwnership,function (req,res) {
    campGrounds.findByIdAndRemove(req.params.id,function(err) {
        if(err){
            res.redirect("/campGrounds");
        }else {
            res.redirect("/campGrounds");
        }
    })
})


module.exports = router;