const Favorite = require('../models/Favorite');

exports.getFavoriteByUserIDAndDeckID = async (req, res) => {
    const { deckID } = req.query;
    try {
        const favorite = await Favorite.findOne({ user: req.user._id, deck: deckID }).populate('deck');
        res.status(200).json({ msg: "Found favorite", favorite });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

exports.postFavoriteByUserIDAndDeckID = async (req, res) => {
    try {
        const { deckID } = req.query;
        const favorite = await Favorite.create({ user: req.user._id, deck: deckID });
        res.status(201).json({ msg: "Favorite added", favorite });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}

exports.deleteFavoriteByUserIDAndDeckID = async (req, res) => {
    try {
        const { deckID } = req.query;
        await Favorite.findOneAndDelete({ user: req.user._id, deck: deckID });
        res.json({ message: 'Favorite removed' });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}