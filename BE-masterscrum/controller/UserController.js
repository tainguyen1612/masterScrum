const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var {validationResult} = require('express-validator');
const User = require('../models/User');
// add user in api
const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ errors: errors.array() });
            return;
          }
        const { userID, name, email, phone, password, role } = req.body;
        const user = await Users.findOne({ email });
        if(user) {
            res.json({
                message: 'User exits!'
            })
        }

        const hashPassWord = await bcrypt.hash(password, 10);
        let  newUser = new Users({
            userID,
            name,
            email,
            phone,
            password: hashPassWord,
            role
        });
        newUser.save();
        res.json({
            message: 'User Added Successfully!',
            user:newUser
        })
    } catch (error) {
        res.json({
            message: 'Error Account'
        })
    }

};

const login = async (req, res, next) => {
    try {
        const { password , email} = req.body
        const user = await Users.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                const token = jwt.sign({ _id: user._id }, 'pass');
                res.json({
                   // message: 'login Success',
                    token: token,
                    
                 //   password:user.password
                 role:user.role
                })
            } else {
                res.json({
                    message: 'password does not match',
                })
            }
        } else {
            res.json({
                message: "No User"
            })
        }
    } catch (error) {
        res.json({
            message: 'Error Account'
        })
    }
}

const updateUser = async (req,res) => {
    try {
        var findUser = await User.findById(req.params.userID).exec();
        findUser.set(req.body);
        findUser.set({password: await bcrypt.hash(req.body.password, 10)});
        var result = await findUser.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteUser = async (req,res) => {
    try {
        var findUser = await User.deleteOne({ _id: req.params.userID }).exec();
        res.send(findUser);
    } catch (error) {
        res.status(500).send(error);
    }
}

const singleUser = async (req,res) => {
    try {
        var getSingleUser = await User.findById(req.params.userID).exec();
        res.send(getSingleUser);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports = {
    register, login, updateUser, deleteUser, singleUser
}