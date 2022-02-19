var mongoose = require("mongoose");

var url = process.env.DATABASEURL || "mongodb+srv://CAMPER:PFiwvnvVYbG1PF0L@camper.7nojm.mongodb.net/camper?retryWrites=true&w=majority";
 mongoose.connect(url);

var campGroundsSchema = new mongoose.Schema({
    name:String,
    price:String,
    image: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username:String
    },
    comments : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]
});

var campGrounds = mongoose.model("campGrounds",campGroundsSchema);

module.exports = campGrounds;
