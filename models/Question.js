const mongoose = require("mongoose")
// Define Question Schema
const QuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: "Question required"
    },
    answer: {
        type: String,
        required: "Answer required"
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
