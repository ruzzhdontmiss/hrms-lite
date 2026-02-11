const asyncHandler = require('express-async-handler');
const Attendance = require('../models/attendanceModel');
const Employee = require('../models/employeeModel');

// @desc    Mark attendance
// @route   POST /api/attendance
// @access  Public
const markAttendance = asyncHandler(async (req, res) => {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if employee exists
    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
    }

    // Check if attendance already exists for this date
    // Normalize date to start of day for comparison if needed, but requirements just say "same date"
    // Assuming date comes in as a valid Date string or object.
    // To be safe, we can query by the exact date provided, or handle day stripping.
    // For simplicity, we'll rely on the client sending a consistent date format (e.g. YYYY-MM-DD)
    // or we store it as a ISO date. The unique index in model handles exact match.
    // Let's ensure we are comparing strict dates or specific logic.
    // Ideally we strip time.

    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);

    const attendanceExists = await Attendance.findOne({
        employee: employee._id,
        date: attendanceDate
    });

    if (attendanceExists) {
        res.status(400);
        throw new Error('Attendance already marked for this date');
    }

    const attendance = await Attendance.create({
        employee: employee._id,
        date: attendanceDate,
        status
    });

    res.status(201).json(attendance);
});

// @desc    Get attendance for employee
// @route   GET /api/attendance/:employeeId
// @access  Public
const getAttendance = asyncHandler(async (req, res) => {
    const employee = await Employee.findOne({ employeeId: req.params.employeeId });

    if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
    }

    const attendance = await Attendance.find({ employee: employee._id }).sort({ date: -1 });

    res.status(200).json(attendance);
});

// @desc    Get all attendance (optional date filter)
// @route   GET /api/attendance
// @access  Public
const getAllAttendance = asyncHandler(async (req, res) => {
    let query = {};
    if (req.query.date) {
        const queryDate = new Date(req.query.date);
        // Match exact date (ignoring time if stored as ISODate with time, but we stored with time 00:00:00 ideally)
        // Since we didn't enforce 00:00:00 strictly in model (only in controller logic), let's query range or start of day.
        const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
        const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

        query.date = {
            $gte: startOfDay,
            $lte: endOfDay
        };
    }

    const attendance = await Attendance.find(query).populate('employee', 'fullName employeeId department');
    res.status(200).json(attendance);
});

module.exports = {
    markAttendance,
    getAttendance,
    getAllAttendance
};
