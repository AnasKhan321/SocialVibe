const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const PostSchema = mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true, 
  },
  userEmail : {
    type : String ,
    required : true
  },
 
  caption : {
    type : String
  },
  postImg : {
    type : String , 
    required : true
  },
  No_of_likes : {
    type : Number,
    default : 0 
  },
  No_of_views : {
    type : Number , 
    default : 0 
  }, 
  User: {
    type: Object,
    required: true,
  },
  LikedBy : {
    type: [String], // Declaring an array of strings
    default: [],    // Default value is an empty array
  },

  date: {
    type: Date,
    default: Date.now,
  }
  
  
});
const Post = mongoose.model("post", PostSchema);

module.exports = Post; 