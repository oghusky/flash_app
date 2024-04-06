const mongoose = require('mongoose');

const ErrorLogSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    stackTrace: {
        type: String,
        required: true,
    },
    // Additional fields as needed
}, { timestamps: true });

const ErrorLog = mongoose.model('ErrorLog', ErrorLogSchema);

module.exports = ErrorLog;
