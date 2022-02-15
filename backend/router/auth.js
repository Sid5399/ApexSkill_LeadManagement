const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const authenticate = require('../middleware/authenticate');

require('../db/conn');
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send(`hello world from server router`)
})

//Registration route
router.post('/signup', async (req, res) => {

    const { name, email, password, cpassword, number} = req.body;

    if( !name || !email ||!password || !cpassword|| !number ){
        return res.status(422).json({error : "Please fill out all the fields correctly."});
    }


    try{

        //if we find a matching mail, user exists.
        const userExists = await User.findOne({email: email});

        if(userExists) {
            return res.status(422).json({error: "Already registered!"})
        } else if( password !== cpassword){
            return res.status(422).json({error: "Your passwords don't match."})
        } else {
            // if the user doesn't exist:
            //get data
            const user = new User({name, email,number , password, cpassword   });
            //hash data
            await user.save();
        }

        res.status(201).json({message: "User Registered Successfully!"});

    } catch(err) {
        console.log(err);
    }



});


//Login route
router.post('/signin', async (req, res) => {


    try{
        let token;
        const { email, password } = req.body;

        if( !email || !password ){
            return res.status(400).json({error : "Please fill out all the fields."});
        }

        // compare database email with user typed email
        const userLogin = await User.findOne({ email: email });
        //console.log(userLogin);
        if(userLogin){
            // compare  database password with user typed password
            const isMatch = await bcrypt.compare(password, userLogin.password);

            console.log("Login Credentials matched. Allow login.")

            //Generate and store JWT token and store it in db
            token = await userLogin.generateAuthToken();
            //console.log(`The token for user ID: ${userLogin._id} is - ${token}`);
            console.log(`token: ${token}`);

            //converting tokens to cookies
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 7776000000 ), //token set to expire in 90 days
                httpOnly: true
            });

            if(!isMatch){
                //password error
                res.status(400).json({error: "Unable to Sign in, Invalid credentials."});
            } else {
                res.json({message: "Signed in successfully!"});
            }
        } else {
            res.status(400).json({error: "Unable to Sign in."});
        }



    } catch(err) {
        console.log(err);
    }
});

//leads

router.get('/leads', authenticate, (req, res) => {
    console.log('leads > ');
    //res.send(`LEADS`);
    res.send(req.rootUser);
})

module.exports = router;

