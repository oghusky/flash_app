const mongoose = require('mongoose');

const FavoriteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    deck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck',
        required: true,
    },
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
