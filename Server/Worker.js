const {Worker}  = require("bullmq")
const Post = require("./Models/Post.js")

const ConnectToMongo  = require("./db.js")

ConnectToMongo()

const worker = new Worker('DeletPost', async job => {
    try {
        const {email} = job.data 
        const {postId} = job.data;
        console.log(email)
        console.log(postId)
       
        const foundedPost = await Post.findById(postId)
    
        if (foundedPost) {
            const {userEmail} = foundedPost ; 
    
            if(userEmail == email){
              await foundedPost.deleteOne()
  
              
            }
        }
       
        
      } catch (error) {
        console.log(error)
      }
} , {
    connection: {
        host: "127.0.0.1",
        port: 6379,
     
    },
    limiter: {
        max: 50,
        duration: 10 * 1000 // like it will process only 50 job in 10 second we can increase it 
    }
  });