var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var url = process.env.DATABASEURL;
 mongoose.connect(url);


var UserSchema = mongoose.Schema({
    username:String,
    password:String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);