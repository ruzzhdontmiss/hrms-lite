const express = require('express');
const router = express.Router();
const {
    getEmployees,
    createEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

router.route('/').get(getEmployees).post(createEmployee);
router.route('/:id').delete(deleteEmployee);

module.exports = router;
