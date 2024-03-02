const mongoose = require('mongoose');
const mongoURl = "mongodb://localhost:27017/"
// this Function will connect to the Mongodb
const ConnectToMongo = async()=>{
	  await mongoose.connect('mongodb://127.0.0.1:27017/SocialVibe');
	  console.log("moongose connected ")
}

module.exports = ConnectToMongo; 
