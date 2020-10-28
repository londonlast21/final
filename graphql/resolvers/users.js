const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
const { SECRET_KEY } = require('../../config');

module.exports = {
    Mutation: {
        // log in functionality
        async login(
            _,
            { username, password }){
                const {errors, valid} = validateLoginInput(username, password);
                
        },

        // signup functionality
        async register(
            parent, 
            { 
                registerInput: { username, email, password, confirmPassword }
            }, 
            // context, 
            // info
            )   {
            // Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }
            // Make sure user doesnt already exist
            const user = await User.findOne({ username })
            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }
            // hash password and give jwt
                password = await bcrypt.hash(password, 13);

                const newUser = new User ({
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