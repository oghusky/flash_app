const mongoose = require("mongoose")
// Define Deck Schema
const DeckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Must name deck"
    },
    description: {
        type: String,
        required: "Description required"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: "User required"
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
    isTemporary: {
        type: Number
    },
    isForAdults: {
        type: Boolean,
        required: "Age group required"
    }
}, { timestamps: true });
module.exports = mongoose.model('Deck', DeckSchema);
