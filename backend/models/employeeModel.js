const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    employeeId: {
        type: String,
        required: [true, 'Please add an employee ID'],
        unique: true
    },
    fullName: {
        type: String,
        required: [true, 'Please add a full name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    department: {
        type: String,
        required: [true, 'Please add a department']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
