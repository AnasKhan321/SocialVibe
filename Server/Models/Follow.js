const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const FollowSchema = new mongoose.Schema({
  Follower : {
    type : String , 
    required : true 
  },
  Following : {
    type : String,
    required : true
  },
  date: {
    type: Date,
    default: Date.now,
  }
  
  
});
const FollowFollowing = mongoose.model("Follow", FollowSchema);

module.exports = FollowFollowing; 