const mongoose = require('mongoose');

const TestQuestionSchema = new mongoose.Schema({
    // Common fields for all question types
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    // Add other common fields as needed
}, {
    timestamps: true,
    discriminatorKey: 'questionType' // Define a discriminator key
});

const TestQuestion = mongoose.model('TestQuestion', TestQuestionSchema); // Register the model

module.exports = TestQuestion;
