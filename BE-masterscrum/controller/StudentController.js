const Faculty = require('../models/Faculty');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const { SUBMIT, REUSUBMIT } = require('../constants/status');
const Report = require('../models/Report')
const sendMail = require('../constants/sendMail');
const getProfile = async (req, res) => {

    try {

        const data = await User.findById({_id:req.id}, {userID:1,name:1,email:1,phone:1,password:1,_id:0});
        res.send(data);
    } catch (error) {
        res.status(500).send(error);
    }

}

const editProfile = async (req, res) => {
    try {
        // var token = req.headers.token;
        // var id = jwt.verify(token, 'pass');
        const upPro = await User.findById(req.id).exec();
        upPro.set(req.body);
        const result = await upPro.save();
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

const joinFaculty = async (req, res) => {
    try {
        //validate data as required
  
        const faculty =  await Faculty.findById(req.params.facultyID).exec();
        // var token = req.headers.token;
        // var id = jwt.verify(token, 'pass');

        const data = await User.findById(req.id);
        faculty.student = data._id;

        faculty.save();

        const users = await User.findById({ _id: faculty.student })
        users.faculty.push(faculty);
        await users.save();

        res.status(200).json({ success: true, data: faculty, student: users })

    } catch (err) {
        res.status(400).json({ success: false, message: err.message })
    }
}

const submitAndResubmitReport = async (req, res) => {
    try {
        const studentId = req.id;
        let stautsSubmit = SUBMIT;
        let faculty = await Faculty.findById(req.params.facultyID).populate('report.reportID').populate('coordinator');
        const { name } = await User.findById(studentId);
        if (faculty) {
            const isStudentJoin = faculty.student.some(id => id.toString() == studentId);
            if (!isStudentJoin) {
                console.log(213123);
                return res.status(400).json({ success: false, message: 'student have not join this class' })
            }
            if (faculty.report.some(e => e.reportID.student == studentId)) {
                stautsSubmit = REUSUBMIT;
            }
            const report = new Report({
                facultyID: faculty._id,
                student: studentId,
                reportUrl: req.body.reportUrl,
                reportStatus: stautsSubmit,
            })
            const reportSave = await report.save();
            faculty.report.push({ reportID: reportSave._id })
            await faculty.save();
            if (faculty.coordinator && faculty.coordinator.email) {
                   await sendMail("taino846@gmail.com", name, stautsSubmit);
            }
            res.status(200).json({ success: true, message: 'upload report successfuly' })
        } else {
            res.status(400).json({ success: false, message: 'faculty not exsit' })

        }
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not upload report' })
    }
}

const viewReportForStudent = async (req, res) => {
    console.log(7562378567823);
    try {
        let listReport = await Report.findOne({ $and: [{ 'student': req.id }, { '_id': req.params.reportID }, { 'facultyID': req.params.facultyID }] });
        res.status(200).json(listReport)
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not view report' })
    }
}

const listReportForStudent = async (req, res) => {
    try {
        let listReport = await Report.find({ $and: [{ 'student': req.id }, { 'facultyID': req.params.facultyID }] }).populate('facultyID');
        res.status(200).json(listReport)
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not list report' })
    }
}

const deleteReport = async (req, res) => {
    try {
        let faculty = await Faculty.findById(req.params.facultyID);
        const removeIndex = faculty.report
            .map(e => e.reportID.toString())
            .indexOf(req.params.reportID);
        faculty.report.splice(removeIndex, 1);
        await faculty.save();
        await Report.deleteOne({ $and: [{ 'student': req.id }, { '_id': req.params.reportID }, { 'facultyID': req.params.facultyID }] });
        res.status(200).json({ success: true, message: 'delete report successfuly' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not delete report' })
    }
}

module.exports = {
    getProfile, editProfile, joinFaculty, submitAndResubmitReport, viewReportForStudent, listReportForStudent, deleteReport
}