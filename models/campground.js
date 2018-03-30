var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

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
