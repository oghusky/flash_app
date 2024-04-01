const mongoose = require('mongoose');
// MultipleChoice schema
const MultipleChoiceSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
        trim: true
    },
    options: {
        type: [String],
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    test: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Test",
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model("MultipleChoice", MultipleChoiceSchema);