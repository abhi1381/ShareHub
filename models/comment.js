var mongoose = require("mongoose");

var url = process.env.DATABASEURL;
 mongoose.connect(url);

var commentSchema =mongoose.Schema({
    text:String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    }
    
});

module.exports = mongoose.model("Comment",commentSchema);