const express = require('express');
const router = express.Router()

const UserController = require('../controller/UserController');
const {getChartReport,getCorFaculty, getStudentForEachFaculty, listReportForCoor, viewReportForCoor, feedBackReportForCoor, publicReportForCoor, getPublicReportForCoor,getSingleReportPublic} = require('../controller/CoordinatorController');
const {addFacultyForAdmin, displayFaculty, updateFaculty, deleteFaculty, getSingleFaculty, displayUser, getCordinator} = require('../controller/AdminController');
const {ResubmitReport,getProfile, editProfile, joinFaculty, submitAndResubmitReport, viewReportForStudent, listReportForStudent, deleteReport,singleReport} = require('../controller/StudentController');

const {checkAdmin, checkGuest , checkCoor, checkLogin, checkManager, checkStudent, checkCoorOrManager, getLogin} = require('../middleware/checkAuth');
const {validate} = require('../validators/validator');
const { check } = require('express-validator');


// User
router.post('/homeAdmin/register',checkLogin, checkAdmin, validate.validateRegisterUser() ,UserController.register);
router.post('/login', UserController.login);
router.get('/checkRole', checkLogin, getLogin);
router.post('/register', UserController.register);
router.get('/homeAdmin/lstUser', checkLogin, checkAdmin, displayUser);
router.patch('/homeAdmin/lstUser/:userID', checkLogin, checkAdmin, UserController.updateUser);
router.delete('/homeAdmin/lstUser/:userID', checkLogin, checkAdmin, UserController.deleteUser);
router.get('/homeAdmin/lstUser/:userID', checkLogin, checkAdmin, UserController.singleUser);

// Admin
router.get('/coordinator', getCordinator);
router.post('/homeAdmin/addFaculty',addFacultyForAdmin);
router.get('/homeAdmin/lstFaculty',checkLogin, checkAdmin, displayFaculty);
router.get('/homeAdmin/lstFaculty/:facultyID',checkLogin,checkAdmin, getSingleFaculty);
router.put('/homeAdmin/lstFaculty/:facultyID', checkLogin, checkAdmin, updateFaculty);
router.delete('/homeAdmin/lstFaculty/:facultyID',checkLogin,checkAdmin, deleteFaculty);

//Coordinator 
router.get('/homeCoor/Faculty', checkLogin, checkCoor, getCorFaculty);
router.get('/homeCoor/lstFaculty/:facultyID', checkLogin, checkCoor, getStudentForEachFaculty);
router.get('/homeCoor/lstFaculty/report/list/:facultyID', checkLogin, checkCoor, listReportForCoor);
router.get('/homeCoor/lstFaculty/report/view/:facultyID/:reportID', checkLogin, checkCoor, viewReportForCoor);
router.post('/homeCoor/lstFaculty/report/feedback/:facultyID/:reportID', checkLogin, checkCoor, feedBackReportForCoor);
router.post('/homeCoor/lstFaculty/report/public/:facultyID/:reportID', checkLogin, checkCoor, publicReportForCoor);
//outer.get('/homeCoor/lstFaculty/report/public', checkLogin, checkCoorOrManager, getPublicReportForCoor);


// Student 
router.get('/homeStudent/lstFaculty', checkLogin, checkStudent, displayFaculty);
router.post('/homeStudent/lstFaculty/:facultyID', checkLogin, checkStudent, joinFaculty);
router.post('/homeStudent/lstFaculty/report/upload/:facultyID', checkLogin, checkStudent, submitAndResubmitReport);
router.get('/homeStudent/lstFaculty/report/view/:facultyID/:reportID', checkLogin, checkStudent, viewReportForStudent);
router.get('/homeStudent/lstFaculty/report/list/:facultyID', checkLogin, checkStudent, listReportForStudent);
router.delete('/homeStudent/lstFaculty/report/delete/:facultyID/:reportID', checkLogin, checkStudent, deleteReport);
router.get("/homeStudent/:reportID", checkLogin, checkStudent, singleReport)

router.patch('/homeStudent/lstFaculty/report/upload/:reportID', checkLogin, checkStudent, ResubmitReport);


router.get('/profile', checkLogin, checkStudent, getProfile);
router.get('/homeCoor/Profile', checkLogin, checkCoor, getProfile);
router.patch('/homeStudent/Profile', checkLogin, checkStudent, editProfile)

//Manager

router.get('/homeManager/lstFaculty/report/public', checkLogin, checkManager, getPublicReportForCoor);
router.get('/homeManager/lstFaculty/chart', checkLogin, checkManager, getChartReport);
router.get("/homeManager/public/:reportID", checkLogin, checkManager, getSingleReportPublic);
//guest
router.get('/homeGuest/lstFaculty/report/public', checkLogin, checkGuest, getPublicReportForCoor);

module.exports = router;