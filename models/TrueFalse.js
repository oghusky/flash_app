const mongoose = require('mongoose');

// TrueFalse schema
const TrueFalseSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: Boolean,
        required: true,
        trim: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
}, { timestamps: true });

module.exports = mongoose.model("TrueFalse", TrueFalseSchema);