const Deck = require("../models/Deck"),
    Test = require("../models/Test");

exports.getDeckBySearch = async (req, res) => {
    try {
        console.log(req.query)
        const searchTerm = req.query.searchTerm || "";
        const testsSearchTerm = req.query.testsSearchTerm || "";
        let decks, tests;
        if (searchTerm) {
            decks = await Deck.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } }, // Match name
                    { description: { $regex: searchTerm, $options: 'i' } } // Match description
                ]
            }).populate("user");
            return res.status(200).json({ msg: "Searched decks", decks });
        }
        if (testsSearchTerm) {
            tests = await Test.find({
                $or: [
                    { name: { $regex: testsSearchTerm, $options: 'i' } }, // Match name
                    { description: { $regex: testsSearchTerm, $options: 'i' } } // Match description
                ]
            }).populate("user")
            return res.status(200).json({ msg: "Searched decks", tests });
        }
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }

}