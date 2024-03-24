const mongoose = require("mongoose")
// Define Question Schema
const QuestionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: "Question required"
    },
    answer: {
        type: String,
        required: "Answer required"
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    }
});

module.exports = mongoose.model('Question', QuestionSchema);
