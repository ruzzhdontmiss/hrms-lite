const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Employee'
    },
    date: {
        type: Date,
        required: [true, 'Please add a date']
    },
    status: {
        type: String,
        required: [true, 'Please select a status'],
        enum: ['Present', 'Absent']
    }
}, {
    timestamps: true
});

// Prevent duplicate attendance for same employee on same date
attendanceSchema.index({ employee: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
