const express = require('express');
const router = express.Router();
const User = require('../../Models/User.js');
const Post = require('../../Models/Post.js'); 
const Comment = require('../../Models/Comment.js')
const MiddleWare = require('../../MiddleWare/JWTtoUser.js')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/PostImg/'); // This is the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    },
  });
  
const upload = multer({ storage });



router.post('/upload' , MiddleWare ,  upload.single('image'),  async(req,res)=>{
    try {
        const {caption}  = req.body 
        const {email } = req.user 
        const post = await  Post.create({
            caption : caption,
            userEmail : email ,
            postImg : req.file.filename ,
            User : req.user
        })
        res.json({success : true })
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false})
    }
})

router.get('/post/:id' , MiddleWare , async(req,res)=>{
  try {
    const postId = req.params.id;
    const foundPost = await Post.findById(postId);

    if (!foundPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const Comments = await Comment.find({postId : postId})

    res.json({success : true , post : foundPost , comments : Comments})
  } catch (error) {

    console.log(error);
    res.status(500).json({success : false , error : error})

  }
})

router.get('/delete/:id' , MiddleWare , async(req,res)=>{
  try {
    const {email} = req.user 
    const postId = req.params.id;
    const foundedPost = await Post.findById(postId)

    if (!foundedPost) {
      return res.status(404).json({ message: "Post not found" , success : false , error : "Not Found " });
    }
    else{
      const {userEmail} = foundedPost ; 

      if(userEmail == email){
        await foundedPost.deleteOne()
        return res.json({success : true })
        
      }else{
        return res.json({success : false , error : "You are not the uer "})
      }

    }
    

  } catch (error) {
    return res.status(500).json({success : false , error : error})
  }
})


router.get('/me' , MiddleWare , async(req,res)=>{
  try {

    const {email} = req.user ; 
    const Posts = await  Post.find({userEmail : email})
    res.json({success : true , Data : Posts})
    
  } catch (error) {
    console.log(error)
    res.status(500).json({success : false , error : error})
  }
})


router.post('/addComment/:id' , MiddleWare , async(req , res)=>{
  try {
    const postId = req.params.id;
    const {comment } = req.body 

    const Commentt = await Comment.create({
      postId : postId , 
      comment : comment , 
      User : req.user 
    })
    res.json({success : true})
    

  } catch (error) {
    res.status(500).json({success : false , error : error })
  }
})

router.get('/allPosts' , MiddleWare , async(req,res)=>{
  try {
    const {FollowingBy , FollowedBy} = req.user 
    if(FollowingBy.length == 0 && FollowedBy.length == 0 ){
      const Posts = await Post.find()
      return res.json({success : true , Posts :Posts })
    }
    else if(FollowingBy.length == 0 && FollowedBy.length !==0){
         const newPosts = await Post.find({userEmail :  { $in: FollowedBy }})
         if(newPosts.length !==0){
            return res.json({success : true , Posts : newPosts})

         }else{
            const allPosts = await Post.find()
            return res.json({success : true , Posts : allPosts})

         }

    }else{
         const newPosts = await Post.find({userEmail :  { $in: FollowingBy }})
         if(newPosts.length !==0){
            return res.json({success : true , Posts : newPosts})

         }else{
            const allPosts = await Post.find()
            return res.json({success : true , Posts : allPosts})
         }
         return res.json({success : true , Posts : newPosts})

    }
    
  } catch (error) {
    res.json({success : false , error : error })
  }
})

router.get('/likePost/:id' , MiddleWare , async(req,res)=>{
  try{

      const postId = req.params.id ; 
      const {email} =req.user  ;
      const UpdatePost =  await  Post.findByIdAndUpdate(postId, { $push: { LikedBy: email } }, { new: true })
      res.json({success : true  , post : UpdatePost})

  }catch(error){
    res.status(500).json({success : false , error : error })
  }
})


router.get('/dislikePost/:id' , MiddleWare , async(req,res)=>{
  try{

      const postId = req.params.id ; 
      const {email} =req.user  ;
      const UpdatePost =  await  Post.findByIdAndUpdate(postId, { $pull: { LikedBy: email } }, { new: true })
      res.json({success : true , post : UpdatePost })

  }catch(error){
    res.status(500).json({success : false , error : error })
  }
})



module.exports = router ; 