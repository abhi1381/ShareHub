var mongoose = require("mongoose");

var passportLocalMongoose = require("passport-local-mongoose");

var url =
  process.env.DATABASEURL ||
  "mongodb+srv://CAMPER:PFiwvnvVYbG1PF0L@camper.7nojm.mongodb.net/camper?retryWrites=true&w=majority";
mongoose.connect(url);

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
