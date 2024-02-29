const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secret = process.env.JWT_SECRET || ((Math.random()*10000).toFixed(0).toString(16));

async function login(email, password) {
    const existingUser = User.find({email}).collation({locale: 'en',strength: 2})
    if (!existingUser){
        throw new Error('Invalid email or password')
    }

    const matchPass = await bcrypt.compare(password,existingUser.hashedPassword)
    if(matchPass){
        throw new Error('Invalid email or password')
    }

    return createToken(existingUser)
}
function createToken(user) {

    const payload ={
        _id: user._id,
        email: user.email
    }

    const token = jwt.sign(payload)
    
    return {
        _id: user._id,
        email: user.email,
        accessToken: jwt.sign(payload, secret)
    }
}

module.exports = {
    login,
}
