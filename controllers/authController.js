const db = require('./../models')
const jwt = require('jwt-simple');
const config = require('./../config');

const tokenForUser = function(user){
    const timeStamp = new Date().getTime();
    //Sub === subject
    // iat === issued at time

    //Its going to encode the whole 1st object and then add our secret to it
    return jwt.encode({sub: user.id, iat: timeStamp}, config.secret);
};


module.exports = {
    signup: async(req, res) =>{
        const {email, password} = req.body;
        if (!email || !password){
            return res.status(422).json({error: 'You must provide an email and password'});
        }
        try {
            //Check if theres an existing user
           const existingUser = await db.User.findOne({email});
           //If user exists, throw error
           if (existingUser){
               return res.status(422).json({error: 'Email is in use'})
           } 
           const user = new db.User({email, password});
           await user.save();
           res.json({token: tokenForUser(user)});
        } catch (e) {
            res.status(404).json({e});
        }
    },
    signIn: async(req, res)=>{
        res.send("I'm hit");
    }
};