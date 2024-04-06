const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestQuestion"
    }],
    questionType: {
        type: String,
        enum: ['TrueFalse', 'MultipleChoice', 'FillInTheBlank']
    },
}, { timestamps: true });

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;
