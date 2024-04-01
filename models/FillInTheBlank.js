const mongoose = require('mongoose');

const FillInTheBlankSchema = new mongoose.Schema({
    question: {
        type: String,
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
modeule.exports = mongoose.model("FillInTheBlank", FillInTheBlankSchema);