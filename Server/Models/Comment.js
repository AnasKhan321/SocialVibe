const mongoose = require("mongoose");
const { v4: uuidv4 } = require('uuid');
const CommentSchema = mongoose.Schema({
  postId  : {
    type : String , 
    required : true
  },
  comment  : {
    type : String,
    required : true
  },
  User: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  }
  
  
});
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment; 