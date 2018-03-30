var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");


var UserSchema = mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);