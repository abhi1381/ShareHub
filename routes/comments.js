var express = require("express");
var router = express.Router({mergeParams:true});
var campGrounds = require("../models/campground");
var  Comment    = require("../models/comment");
var middlewares  = require("../middlewares");

//=====================//
   // comments routes
//=====================//

//comments new
router.get("/new",middlewares.isLoggedIn,function(req, res) {
    campGrounds.findById(req.params.id,function (err,campground) {
        if(err){
            console.log(err);
        }else {
            res.render("comments/new",{camp:campground});
        }
    })
    
});


//comments create
router.post("/",middlewares.isLoggedIn,function(req,res) {
    campGrounds.findById(req.params.id,function(err,campground) {
        if(err){
            console.log(err);
            res.redirect("/campGrounds");
        }else {
            Comment.create(req.body.comment,function (err,comment){
                if(err){
                    req.flash("error","something went wrong");
                    console.log(err);
                }else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully Added Comment");
                    res.redirect("/campGrounds/"+ campground._id);
                }
            });
    
            }
        });
    });
    
//edit 
router.get("/:comment_id/edit",middlewares.commentOwnership,function (req,res) {
    Comment.findById(req.params.comment_id,function(err, foundCOmment) {
        if(err){
            res.redirect("back");
        }else {
            res.render("comments/edit",{campground_id:req.params.id,comment:foundCOmment});
        }
    });
});
    
    
//update
router.put("/:comment_id",middlewares.commentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function (err,updatedComment) {
        if(err){
            res.redirect("back");
        }else {
            res.redirect("/campGrounds/" + req.params.id);
        }
    });
});
    
//Delete

router.delete("/:comment_id",middlewares.commentOwnership,function (req,res) {
    Comment.findByIdAndRemove(req.params.comment_id,function(err) {
        if(err){
            res.redirect("back");
        }else {
            req.flash("success","Comment Deleted");
            res.redirect("/campGrounds/" + req.params.id);
        }
    });
});

//middleware



module.exports = router;