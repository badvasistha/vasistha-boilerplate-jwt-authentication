const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const validator = require('validator');

const validateEmail = function(email){
    return validator.isEmail(email);
};

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true, 
        validate: [
            validateEmail,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', async function(next){
    const user = this;
    try {
        const salt = await bcrypt.genSalt();
        console.log('salt', salt);
        const hash = await bcrypt.hash(user.password, salt);
        console.log('hash', hash);
        user.password = hash;
        next();
    } catch (e) {
        return next(e);
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;