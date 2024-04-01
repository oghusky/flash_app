const Favorite = require('../models/Favorite');

exports.getFavoriteByUserIDAndDeckID = async (req, res) => {
    try {
        const deckID = req.query.deckID;
        const testID = req.query.testID;
        const favorite = await Favorite.findOne({ user: req.user._id, deck: deckID || undefined, test: testID || undefined }).populate('deck');
        res.status(200).json({ msg: "Found favorite", favorite });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

exports.postFavoriteByUserIDAndDeckID = async (req, res) => {
    try {
        const deckID = req.query.deckID;
        const testID = req.query.testID;
        const favorite = await Favorite.create({ user: req.user._id, deck: deckID || undefined, test: testID || undefined });
        res.status(201).json({ msg: "Favorite added", favorite });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

exports.deleteFavoriteByUserIDAndDeckID = async (req, res) => {
    try {
        const deckID = req.query.deckID;
        const testID = req.query.testID;
        const favorite = await Favorite.findOneAndDelete({ user: req.user._id, deck: deckID || undefined, test: testID || undefined });
        res.json({ message: 'Favorite removed' });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}