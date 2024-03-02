const express = require('express');
const router = express.Router();
const User = require('../../Models/User.js');
const Post = require('../../Models/Post.js'); 
const FollowFollowing = require('../../Models/Follow.js')
const Comment = require('../../Models/Comment.js')
const MiddleWare = require('../../MiddleWare/JWTtoUser.js')
const multer = require('multer');

router.get('/:id' , MiddleWare , async(req,res)=>{
    try {
        const UserId = req.params.id;
        const userdetails = await User.findById(UserId).select('-password');
        const {email} = userdetails; 
        const Posts = await  Post.find({userEmail : email })
        const email2 = req.user.email; 
        if(email2 == email){
            res.json({userdetail : userdetails  , Posts :Posts , user : true  })

        }else{
            res.json({userdetail : userdetails  , Posts :Posts  , user : false })

        }
    } catch (error) {
        res.status(500).json({success : false , error : error })
    }
})


router.get('/follow/:id' , MiddleWare , async(req,res)=>{
    try {
        const followingUserId = req.params.id 
        const {_id} = req.user 
        const followingUser =  await User.findById(followingUserId).select('-password');
        const followerUser = await User.findById(_id).select('-password')
        const UpdateUserFollower =  await  User.findByIdAndUpdate(_id, { $push: { FollowingBy: followingUser.email } }, { new: true })

        const UpdateUserFollowing = await User.findByIdAndUpdate(followingUserId , {$push : {FollowedBy : followerUser.email }} , {new : true} )

        const newConnection = await FollowFollowing.create({
            Follower : UpdateUserFollower.email , 
            Following : UpdateUserFollowing.email
        })

        res.json({success : true , updatedUser : UpdateUserFollowing })
        
        
        
    } catch (error) {
        res.status(500).json({success : false , error : error })
    }
})


router.get('/unfollow/:id' , MiddleWare , async(req,res)=>{
    try {
        const followingUserId = req.params.id 
        const {_id} = req.user 
        const followingUser =  await User.findById(followingUserId).select('-password');
        const followerUser = await User.findById(_id).select('-password')
        const breakConnection = await FollowFollowing.findOneAndDelete({Follower : followerUser.email , Following : followingUser.email})
        console.log(breakConnection)
        const UpdateUserFollower =  await  User.findByIdAndUpdate(_id, { $pull: { FollowingBy: followingUser.email } }, { new: true })

        const UpdateUserFollowing = await User.findByIdAndUpdate(followingUserId , {$pull : {FollowedBy : followerUser.email }} , {new : true} )


        

        res.json({success : true , updatedUser : UpdateUserFollowing })
        
        
        
    } catch (error) {
        res.status(500).json({success : false , error : error })
    }
}); 



router.get('/suggest/me' , MiddleWare ,  async(req,res)=>{
    try {
        const {  FollowingBy , FollowedBy} = req.user 
        const specificEmail = req.user.email

        const usersFollowingByArray = await User.find({
            FollowedBy: { $in: FollowingBy },
            email: {
                $nin: FollowingBy,
                $ne: specificEmail // Combining arrays to exclude specificEmail and emails in FollowingBy
            }
        }).select('-password');
        console.log(specificEmail)

        if(usersFollowingByArray.length == 0){
         
            const usersFollowedByArray = await User.find({
                FollowedBy: { $in: FollowedBy },
                email: {
                    $nin: FollowingBy,
                    $ne: specificEmail
                }
            }).select('-password')
            

            if(usersFollowedByArray.length ==0 ){

                const allEmails  = await User.find({
                    email: {
                        $nin: FollowingBy,
                        $ne: specificEmail
                    }
                }).select('-password');

                res.json({success : true , suggestedUser : allEmails})
            }else{
            
                res.json({success : true , suggestedUser : usersFollowedByArray })
              
            }
        }else{
            res.json({success : true , suggestedUser : usersFollowingByArray })
        }

        
    } catch (error) {
        res.status(500).json({success : false , error : error })
    }
})


router.get('/search/:query' , MiddleWare , async(req,res)=>{
    try {

        const query = req.params.query

        const users = await User.find({
            $or: [
                { username: { $regex: query, $options: 'i' } }, // Name matching the provided string
                { email: { $regex: query } } // Email containing the specified string
              ]
        })

        res.json({success : true , User : users})
        
    } catch (error) {
        res.status(500).json({success : false , error : error })
        
    }
})

router.get('/follower/:id' ,MiddleWare , async(req,res)=>{
    try{

        const userid = req.params.id 
        const {FollowedBy } = await  User.findById(userid)

        const followers = await User.find({
            email : {$in : FollowedBy}
        })

        res.json({success : true , followers : followers })

    }catch(error){
        console.log(error)
        res.status(500).json({error : error , success : false })
    }
} )

router.get('/following/:id' ,MiddleWare , async(req,res)=>{
    try{

        const userid = req.params.id 
        const {FollowingBy } = await  User.findById(userid)

        const following = await User.find({
            email : {$in : FollowingBy}
        })
        console.log(FollowingBy)

        res.json({success : true , following : following })

    }catch(error){
        console.log(error)
        res.status(500).json({error : error , success : false })
    }
} )


module.exports = router ; 
