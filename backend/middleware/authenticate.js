const jwt = require("jsonwebtoken");
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try{
        //get token
        const token = req.cookies.jwtoken;
        //verify token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if(!rootUser){ throw new Error('User Not Found.')}

        req.token = token;
        req.rootUser = rootUser;
        req.userId = rootUser._id;

        next();


    } catch(err){
        res.status(401).send('Unauthorised access: No token provided');
    }
}

module.exports = authenticate;