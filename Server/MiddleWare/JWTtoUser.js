const jwt = require('jsonwebtoken'); 
const User = require('../Models/User.js')

const MiddleWare =  async(req, res, next) => {
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1]
            var decoded = jwt.verify(token, process.env.SECRET_TOKEN);
            const user = await User.findOne({email : decoded.user.email}).select('-password')
            req.user = user
            next()
        }else{
            console.log("Not provided ")
            res.status(500).json({success : false , error : "Authorization is not provided "})
        }
        
    } catch (error) {
        res.status(401).json({success : false , error : "Some Bad thing Happens " })
    }

  };

module.exports = MiddleWare