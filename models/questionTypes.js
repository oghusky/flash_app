const mongoose = require('mongoose');
const TestQuestion = require("./TestQuestion");
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

// Create discriminators
const TrueFalse = TestQuestion.discriminator('TrueFalse', TrueFalseSchema);
const MultipleChoice = TestQuestion.discriminator('MultipleChoice', MultipleChoiceSchema);
const FillInTheBlank = TestQuestion.discriminator('FillInTheBlank', FillInTheBlankSchema);

module.exports = { TrueFalse, MultipleChoice, FillInTheBlank };