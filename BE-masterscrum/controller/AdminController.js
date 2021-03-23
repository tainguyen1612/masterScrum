const Faculty = require('../models/Faculty');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { route } = require('../routes');


const addFacultyForAdmin = async (req, res) => {
    try {
        const { facultyID, facultyName, coordinator, startDay, endDay } = req.body;

        let newFaculty = new Faculty({
            facultyID,
            facultyName,
            coordinator,
            startDay,
            endDay
        });
        console.log(111,newFaculty);
        newFaculty.save();
        const user = await User.findById({ _id: newFaculty.coordinator });
        user.faculty = newFaculty._id;
        user.save();
        res.json({
            message: 'Add faculty Successfully!',
            faculty: newFaculty,
            user: user
        })
    } catch (err) {
        res.json({
            message: 'error',
            newFaculty: newFaculty
        })
    }
}

const getCordinator = async (req, res) => {
    try {
        const result = await User.find({ role: "coordinator" }, { name: 1 });
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).json({
            data: false
        })
    }
}

const displayFaculty = async (req, res) => {
    try {
        let result;
        if (req.role === 'student') {
            result = await Faculty.find().populate('coordinator').lean();
            result = result.map(x => {
                x.isJoin = x.student.length && x.student.some(y => y.toString() == req.id)
                return x;
            })
        } else {
            result = await Faculty.find().populate('coordinator');
        }
        res.status(200).json({
            data: result
        });
    } catch (error) {
        res.status(500).send(error);

    }
}

const getSingleFaculty = async (req, res) => {
    try {
        var getFaculty = await Faculty.findById(req.params.facultyID).exec();
        res.send(getFaculty);
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateFaculty = async (req, res) => {
    try {
        var upFaculty = await Faculty.findById(req.params.facultyID).exec();
        upFaculty.set(req.body);
        var result = await upFaculty.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}
const deleteFaculty = async (req, res) => {
    try {
        var result = await Faculty.deleteOne({ _id: req.params.facultyID }).exec();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const displayUser = async (req, res) => {
    try {
        var result = await User.find().exec();
        res.status(200).json({
            data: { result }
        });
    } catch (error) {
        res.status(500).send(error);
    }
}



module.exports = {
    getCordinator, addFacultyForAdmin, displayFaculty, getSingleFaculty, updateFaculty, deleteFaculty, displayUser
}