const Deck = require("../models/Deck");

exports.getDeckBySearch = async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const decks = await Deck.find({
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } }, // Match name
                { description: { $regex: searchTerm, $options: 'i' } } // Match description
            ]
        }).populate("user");
        return res.status(200).json({ msg: "Searched decks", decks });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }

}