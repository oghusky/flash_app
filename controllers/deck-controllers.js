const Deck = require("../models/Deck"),
    Question = require("../models/Question");

exports.createDeck = async (req, res) => {
    try {
        const { name, description, isForAdults } = req.body;
        if (!name) return res.status(500).json({ msg: "Name of deck required" });
        if (!description) return res.status(500).json({ msg: "Deck description required" });
        if (description && description.length > 50) return res.status(500).json({ msg: "Description must be 50 characters or less" });
        if (isForAdults === null || isForAdults === undefined) return res.status(500).json({ msg: "Is this deck for adults" });
        const deck = await Deck.create({ name, description, isForAdults, user: req.user._id });
        return res.status(201).json({ msg: "Deck created", deck });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.getDecks = async (req, res) => {
    try {
        const { sort } = req.query;
        const page = req.query.page || 1;
        const limit = parseInt(req.query.limit) || 10; // Number of videos per page, default is 10
        let sortType = sort === "des" ? -1 : 1;
        const startIndex = (page - 1) * limit; // Start index for pagination
        const endIndex = page * limit; // End index for pagination
        let totalCount;
        const decks = await Deck.find()
            .sort({ createdAt: sortType })
            .populate("user")
            .limit(limit)
            .skip(startIndex);
        // Pagination metadata
        const pagination = {};
        if (endIndex < totalCount) {
            pagination.next = {
                page: page + 1,
                limit: limit,
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit: limit,
            };
        }
        if (decks.length > 0) return res.status(200).json({ msg: "Found decks", decks, pagination, totalCount });
        else return res.status(404).json({ msg: "Unable to find decks" });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.getDeckByID = async (req, res) => {
    try {
        const { deckID } = req.query;
        const deck = await Deck.findById(deckID).populate("user").populate("questions");
        if (deck) return res.status(200).json({ msg: "Found deck", deck });
        else return res.status(404).json({ msg: "Unable to find deck" })
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.updateDeckByID = async (req, res) => {
    try {
        const { deckID } = req.query;
        const data = req.body;
        let deck = await (await Deck.findOne({ _id: deckID, user: req.user })).populate("user");
        if (!deck) return res.status(404).json({ msg: "Unable to find deck" });
        deck = await Deck.findOneAndUpdate({ _id: deckID, user: req.user }, { "$set": data }, { new: true });
        return res.status(200).json({ msg: "Deck updated", deck });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.deleteDeckByID = async (req, res) => {
    try {
        const { deckID } = req.query;
        let deck = await (await Deck.findOne({ _id: deckID, user: req.user })).populate("user");
        await Question.deleteMany({ deck: deckID, user: req.user._id });
        if (!deck) return res.status(404).json({ msg: "Unable to find deck" });
        deck = await Deck.findOneAndDelete({ _id: deckID, user: req.user });
        return res.status(200).json({ msg: "Deck deleted" });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}