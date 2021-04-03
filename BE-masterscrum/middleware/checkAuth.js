const User = require('../models/User')
const jwt = require('jsonwebtoken');


const checkLogin = async (req,res,next) =>{
    try{
    //    var token = req.cookies.token;
        var token = req.headers.token;
        var id = jwt.verify(token, 'pass');
        const data = await User.findById(id);
        if(data){
            req.data = data;
            req.id = data._id;
            next();
        } else{
            res.json("NOT PERMISSON");
        }
    } catch(err){
        
        res.json({
            err: err,
            token : token
        })
    }
}

const checkAdmin = (req, res, next)=>{
    const role = req.data.role;
    if(role === 'admin'){
        next();
    }else{
        res.status(404).json('you not an admin');
    }
}

const checkCoorOrManager = (req, res, next)=>{
    var role = req.data.role;
    if(role === 'admin' || 'manager'){
        next();
    }else{
        res.status(404).json('you not an admin');
    }
}

const checkManager = (req, res, next)=>{
    var role = req.data.role;
    if(role === 'manager'){
        next();
    }else{
        res.status(404).json('You not a manager')
    }
}

const checkStudent = (req, res, next)=>{
    var role = req.data.role;
    if(role === 'student'){
        
        req.role = role;
        next();
    }else{
        res.status(404).json('You not a student')
    }
}

const checkCoor = (req, res, next)=>{
    var role = req.data.role;
    if(role === 'coordinator'){
        next();
    }else{
        res.status(404).json('You not a Coordinator')
    }
}

const checkGuest = (req, res, next)=>{
    var role = req.data.role;
    if(role === 'guest'){
        next();
    }else{
        res.status(404).json('You not a Guest');
    }
}

const getLogin = async (req,res,next) =>{

    res.status(200).json({
        data: req.data.role
    });
}

module.exports = {
    checkLogin, checkAdmin, checkGuest, checkCoor, checkManager, checkStudent, checkCoorOrManager, getLogin
}