const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators');
const User = require('../../models/User');
//const { SECRET_KEY } = require('../../config');
const { SECRET_KEY } = process.env.SECRET_KEY;


function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },
        SECRET_KEY,
        { expiresIn: '2h' }
    );
}


module.exports = {
    Mutation: {
        
        // log in functionality
        async login(
            _,
            { username, password }){
                const { errors, valid } = validateLoginInput(username, password);

                if(!valid){
                    throw new UserInputError('Invalid login credentials', { errors });
                }
                const user = await User.findOne({ username });

                if(!user){
                    errors.general = 'User not found';
                    throw new UserInputError('Credentials do not match any user in database', { errors });
                }

                const match = await bcrypt.compare(password, user.password);
                if(!match){
                    errors.general = 'Wrong password';
                    throw new UserInputError('Wrong password', { errors });
                }
                
                const token = generateToken(user);

                return {
                    ...user._doc,
                    id: user._id,
                    token
                }

                
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

                const token = generateToken(res)

                return {
                    ...res._doc,
                    id: res._id,
                    token
                }
            }
    }
}