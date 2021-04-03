const Faculty = require('../models/Faculty');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const Report = require('../models/Report')


const getCorFaculty = async (req, res) => {
    try{
    //  // xu ly token cua coordinator
    //     var token = req.headers.token;
    //     var id = jwt.verify(token, 'pass');
        const data = await User.findById(req.id);
        const faculty =  await Faculty.find({coordinator:data._id},{facultyName:1, startDay:1, endDay:1});
        return res.status(200).json({
            data: faculty
        });
    } catch (error) {
        res.status(500).json("error faculty");
    }
}

const getStudentForEachFaculty = async (req, res) => {
    try {

        const faculty = await Faculty.findById({ _id: req.params.facultyID }).populate('student');

        return res.status(200).json(faculty.student);

    } catch (error) {
        res.status(500).send(error);
    }
}

const listReportForCoor = async (req, res) => {
    try {
        const coordinatorId = req.id;
        // let faculty = await Faculty.findOne({ $and: [{ '_id': req.params.facultyID }, { 'coordinator': coordinatorId }] }).populate('report.reportID').populate({});
        let faculty = await Faculty.findOne({ $and: [{ '_id': req.params.facultyID }, { 'coordinator': coordinatorId }] }).populate({
            path:'report',
            populate :{
                path:'reportID',
                model:'Report',
                populate:{
                    path: 'student',
                    model:'User'
                }
            }
        });
        res.status(200).json(faculty.report)
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not list report' })
    }
}

const viewReportForCoor = async (req, res) => {
    try {
        console.log(111,req.params.reportID);
        console.log(222,req.params.facultyID);
        let listReport = await Report.findOne({ $and: [{ '_id': req.params.reportID }, { 'facultyID': req.params.facultyID }] });
        console.log(listReport);
        res.status(200).json(listReport)
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not view report' })
    }
}

const feedBackReportForCoor = async (req, res) => {
    try {
        await Report.findOneAndUpdate({ $and: [{ '_id': req.params.reportID }, { 'facultyID': req.params.facultyID }] }, req.body);
        res.status(200).json({ success: true, message: 'feedback Added' })
    } catch (error) {
        res.status(400).json({ success: false, message: 'can not add feedback report' })
    }
}
const publicReportForCoor = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log(req.params.reportID);
        // console.log(req.params.facultyID);
        await Report.findOneAndUpdate({ $and: [{ '_id': req.params.reportID }, { 'facultyID': req.params.facultyID }] }, req.body);
        res.status(200).json({ success: true, message: 'Public Successfuly' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'can not add public report' })
    }
}

const getPublicReportForCoor = async (req, res) => {
    try {
        const publiReport = await Report.find({ 'public': true }).populate('student').populate('facultyID');
        res.status(200).json(publiReport)
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'can not get public report' })
    }
}

const getChartReport = async (req, res) => {
    try {
        let studentCount;
        let reportCount;
        let publicReport;
        let submitCount;
        let pointAvarge;
        let reportLength;
        let temp;
        const facultys = await Faculty.find().populate('report.reportID');
        const chart = facultys.map((e, index) => {
            studentCount = e.student && e.student.length;
            reportCount = e.report.length;
            publicReport = e.report.filter(y => y.reportID && y.reportID.public === true).length;
            submitCount = e.report.filter(x => x.reportID && x.reportID.reportStatus === 'submit').length;
            reportLength = e.report.length;
            e.report.map((z, index) => {
                console.log();
                if(index == reportLength) {
                    pointAvarge =  temp / reportLength
                } else {
                    temp = temp + z.reportID.point;
                }
            })
            return {
                facultyId: e._id,
                facultyName: e.facultyName,
                studentCount,
                reportCount,
                publicReport,
                pointAvarge,
                submitCount,
            }
        })
        res.json(chart)
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, message: 'can not get chart report' })
    }
}

module.exports = {
    getChartReport,getCorFaculty, getStudentForEachFaculty, listReportForCoor, viewReportForCoor, feedBackReportForCoor, publicReportForCoor, getPublicReportForCoor
}