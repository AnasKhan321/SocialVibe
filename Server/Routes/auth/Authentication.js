require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');
const User = require('../../Models/User.js');
const MiddleWare = require('../../MiddleWare/JWTtoUser.js')
const multer = require('multer');


// Define storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/ProfileImg/'); // This is the directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Generate a unique file name
    },
  });
  
const upload = multer({ storage });
function generateOTP() {
    // Generate a 6-digit random number
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp.toString(); // Convert to string for consistent length
}

const SendMail = (email , name )=>{

    return new Promise((resolve, reject) => {
        const otp = generateOTP();

        let transporter = nodemailer.createTransport({
            service: 'gmail', // Replace with your email service provider
            auth: {
                user: process.env.HOST_EMAIL, // Your email address
                pass: process.env.EMAIL_PASSWORD // Your password or app-specific password
            }
        });

        const mailOptions = {
            from: process.env.HOST_EMAIL, // Sender address
            to: email, // List of recipients
            subject: 'Verification for Social Vibe', // Subject line
            text: `Your OTP is ${otp}` // Plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject({ error, otp: null });
            } else {
                resolve({ error: null, otp });
            }
        });
    });
}

router.post('/verifyEmail' , (req,res)=>{

    try {

        const {email} = req.body ;
        SendMail(email)
        res.json({success : true }) 

    } catch (error) {

        res.status(500).json({error : error , success : false})

    }
})

router.post('/signup' , async(req,res)=>{
  try {
    const { username, email, password } = req.body;
    let success = false;
    let user = await User.findOne({ email: email })
    if (user) {
        res.status(500).json({ success: success, error: "Your email is already Register Login or Register with other email " });

    }
    else if (password.length < 8) {
        res.status(500).json({ success: success, error: "Password Must Contain 8 letters " });
    }

    else {
        let salt = await bcrypt.genSaltSync(10);
        let hash = await bcrypt.hashSync(password, salt);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hash
        })
        const data = {
            user: {
                id: newUser.id,
                email: newUser.email
            }
        }
        success = true;
        var token = jwt.sign(data, process.env.SECRET_TOKEN);

        res.status(201).json({ success: success, token: token })
    }
  } catch (error) {
      res.status(500).json({error : error , success : false})
  }
})


router.post('/login' , async(req,res)=>{
  try {
      const {email ,password} = req.body
      let user = await User.findOne({ email: email })
      if (user) {
          const passwordCompare = await bcrypt.compare(password, user.password)
          if(passwordCompare){
              const data = {
                  user  : {
                      id: user.id,
                      email: user.email
                  }
              }
              success = true;
              var token = jwt.sign(data, process.env.SECRET_TOKEN);
              res.json({ success:true, token: token , admin : false })
          }else{
            res.json({success : false , error : "Invalid Password"})
          }
        }

      else{
          res.status(500).json({success : false , error : "Invalid Email or Password "})
      }
  } catch (error) {
      res.status(500).json({error : error , success : false })
  }
})


router.post('/ForgetPassword' , async(req,res)=>{

    try {
        const { email,  newPassword } = req.body;
        let user = await User.findOne({ email: email });
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hashSync(newPassword, salt);
        user.password = hash;
        await user.save();

        res.json({success   : true })
    } catch (error) {
        res.json({success : false , error : error})
    }

})


router.post('/SignUpWithGoogle' , async(req,res)=>{
    try {
        const { username, email, profileImg } = req.body;
        console.log(username ,email ,profileImg)
        let success = false;
        let user = await User.findOne({ email: email })
        if (user) {
            res.status(500).json({ success: success, error: "Your email is already Register Login or Register with other email " });
    
        }
        else {   
            const newUser = await User.create({
                username: username,
                email: email,
                profileImg: profileImg
            })
            const data = {
                user: {
                    id: newUser.id,
                    email: newUser.email
                }
            }
            success = true;
            var token = jwt.sign(data, process.env.SECRET_TOKEN);
    
            res.status(201).json({ success: success, token: token })
        }
      } catch (error) {
          res.status(500).json({error : error , success : false})
      }
})

router.post('/loginWithGoogle' , async(req,res)=>{
    try {
        const {email} = req.body
        let user = await User.findOne({ email: email })
        if (user) {
            const data = {
                user  : {
                    id: user.id,
                    email: user.email
                }
            }
            success = true;
            var token = jwt.sign(data, process.env.SECRET_TOKEN);
            res.json({ success:true, token: token , admin : false })
          }
  
        else{
            res.status(500).json({success : false , error : "Your Email is Not Registered "})
        }
    } catch (error) {
        res.status(500).json({error : error , success : false })
    }
})


router.post('/update' ,MiddleWare, async(req,res)=>{
   try {
    
    const {id}  = req.user 
    const {username ,  Bio , Gender} = req.body 
    const U =  await User.findByIdAndUpdate (id , {username : username , Bio : Bio , Gender : Gender  })
    res.json({success : true })
   } catch (error) {
        console.log(error)
        res.status(500).json({success : false , error : error })
   }
} )

router.post('/updateProfileImg' ,MiddleWare , upload.single('image'),  async(req,res)=>{
    try {
     const {id}  = req.user 
     console.log(req.file.filename)
     const U =  await User.findByIdAndUpdate (id , { profileImg :  req.file.filename })
     res.json({success : true })
    } catch (error) {
        console.log(error)
         res.status(500).json({success : false , error : error })
    }
 } )

router.get('/me' , MiddleWare , async(req,res)=>{
    try {
        const {id } = req.user 
        const user = await  User.findById(id).select('-password'); 
        res.json({user  : user , success : true })
    } catch (error) {
        console.log(error)
        res.status(500).json({success : false , error : error })
    }
})

router.get('/' ,   (req,res)=>{
    res.send('this is authentication ')
})

router.get('/verifyEmail/:email' , async(req,res)=>{
    try{
        const query = req.params.email

        let user = await User.findOne({ email: query })

        if(user && user.password != null ){
            const result = await SendMail(query , user.username)
            if (result.error) {
                res.status(500).json({ success: false, error: "Error sending email" });
            } else {
                res.json({ success: true  , otp : result.otp });
            }
        }else{
            res.json({success : false , error : "You are not registered "})
        }

    } catch(error){
        res.status(500).json({success : false , error : error })
    } 

})

module.exports = router ; 