var mongoose = require("mongoose");

var url = process.env.DATABASEURL || "mongodb+srv://CAMPER:PFiwvnvVYbG1PF0L@camper.7nojm.mongodb.net/camper?retryWrites=true&w=majority" 
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