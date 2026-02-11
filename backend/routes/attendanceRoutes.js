const express = require('express');
const router = express.Router();
const {
    markAttendance,
    getAttendance,
    getAllAttendance
} = require('../controllers/attendanceController');

router.get('/', getAllAttendance);
router.post('/', markAttendance);
router.get('/:employeeId', getAttendance);

module.exports = router;
