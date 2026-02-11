const asyncHandler = require('express-async-handler');
const Employee = require('../models/employeeModel');

// @desc    Get employees
// @route   GET /api/employees
// @access  Public
const getEmployees = asyncHandler(async (req, res) => {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
});

// @desc    Create employee
// @route   POST /api/employees
// @access  Public
const createEmployee = asyncHandler(async (req, res) => {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    // Check if employee exists
    const employeeExists = await Employee.findOne({ $or: [{ email }, { employeeId }] });

    if (employeeExists) {
        res.status(400);
        throw new Error('Employee already exists (ID or Email)');
    }

    const employee = await Employee.create({
        employeeId,
        fullName,
        email,
        department
    });

    if (employee) {
        res.status(201).json(employee);
    } else {
        res.status(400);
        throw new Error('Invalid employee data');
    }
});

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Public
const deleteEmployee = asyncHandler(async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        res.status(404);
        throw new Error('Employee not found');
    }

    await employee.deleteOne();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getEmployees,
    createEmployee,
    deleteEmployee
};
