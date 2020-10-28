const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

module.exports = {
    Mutation: {
        async register(
            parent, 
            { 
                registerInput: { username, email, password, confirmPassword }
            }, 
            context, 
            info
            )   {
            // Validate user data
            // Make sure user doesnt already exist
            // hash password and give jwt
                password = await bcrypt.hash(password, 13);

                const newUser =({
                    email,
                    username,
                    password,
                    createdAt: new Date().toISOString()
                });

                const res = await newUser.save();

                const token = jwt.sign({
                    id: res.id,
                    email: res.email,
                    username: res.username,

                }, SECRET_KEY, { expiresIn: '2h'});

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
            }
    }
}