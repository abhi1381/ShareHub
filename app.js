var express = require("express"),

        app = express(),

 bodyParser = require("body-parser"),
 
 mongoose   = require("mongoose"),
 
 flash     =  require("connect-flash"),
 
 passport   = require("passport"),
 
 LocalStrategy = require("passport-local"),
 
 methodOverride = require("method-override"),
 
 campGrounds = require("./models/campground"),
 
 Comment    = require("./models/comment"),
 
 User       = require("./models/user"),
 
     seedDB = require("./seeds");

var commentRoutes = require("./routes/comments");
var campGroundRoutes = require("./routes/campgrounds");
var authRoutes = require("./routes/index");
     


 mongoose.connect("mongodb://localhost/yelp_camp");
app.use(flash());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + "/public"));

app.set("view engine","ejs");

app.use(methodOverride("_method"));

//seedDB(); //seed the database
 
 
 //passport configs
 
 app.use(require("express-session")({
     secret:"first auth page",
     resave:false,
     saveUninitialized:false
 }));   
 
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campGrounds/:id/comments",commentRoutes);
app.use("/campGrounds",campGroundRoutes);
app.use("/",authRoutes);

app.listen(process.env.PORT, process.env.IP,function() {
    console.log("server started");
});