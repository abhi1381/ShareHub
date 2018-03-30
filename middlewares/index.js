//all middlewares
var campGrounds = require("../models/campground");
var Comment = require("../models/comment");
var OBJ = {};

OBJ.campOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        campGrounds.findById(req.params.id,function(err, foundCampground) {
            if(err){
                req.flash("error","campGrounds not found");
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error","You Don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else {
        req.flash("error","You need to be logged in to that");
        res.redirect("back");
    }
}

OBJ.commentOwnership = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err, foundComment) {
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else {
                    req.flash("error","You Don't have permission to do that");
                    res.redirect("back");
                }
            }
        });
    }else {
        req.flash("error","You need to be logged in to that");
        res.redirect("back");
    }
}

OBJ.isLoggedIn = function(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to that");
    res.redirect("/login");
}


module.exports = OBJ;