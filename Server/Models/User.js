const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const UserScheme = mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true, 
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    default : null
  },
  profileImg : {
    type: String , 
    default : null
  },
  Bio : {
    type : String , 
    default : null
  },
  Gender : {
    type : String , 
    default : null
  },
  follower : {
    type : Number ,
    default : 0 
  },
  following :{
    type : Number , 
    default : 0 
  },
  FollowedBy : {
    type: [String],
    default: [],    
  },
  FollowingBy : {
    type : [String],
    default : [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
 
  
});
const User = mongoose.model("user", UserScheme);

module.exports = User; 