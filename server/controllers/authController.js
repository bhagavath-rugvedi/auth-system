const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('../models/userModels');
const creatError = require('../utils/appError');

//Register User
exports.signup = async (req, res, next) => {
    try{
        const user = await User.findOne({ email: req.body.email});

        if(user){
            return next(new creatError("User already Exists", 400));
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);

        const newUser = await User.create({
            ...req.body,
            password: hashedPassword,
        });

        //assigning JWT to user
        const token = jwt.sign({_id: newUser._id}, "secretkey123",{
            expiresIn: '2d',
        });

        res.status(201).json({
            status:'Success',
            message: 'User registered successfully',
            token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch(error) {
        next(error);
    }
};

//Login User
exports.login = async (req, res, next) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email});

        if(!user){
            return next (new  creatError("User does not exist!", 404));
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid)
            return next (new creatError("Incorrect email or password!", 401));

        const token = jwt.sign({_id: user._id}, "secretkey123",{
            expiresIn: '2d',
        });

        res.status(200).json({
            status: 'Success',
            token,
            message: 'Logged in Successfully',
            user:{
                _id: user._id,
                name:user.name,
                email:user.email
            }
        })
    }
    catch{
        console.error('Login error:', error);
        next(error); // Pass error to global error handler
    }
};