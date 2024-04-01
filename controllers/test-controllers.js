const Test = require('../models/Test'),
    Favorite = require("../models/Favorite");

// Create a new test
exports.createTest = async (req, res) => {
    try {
        const { name } = req.body;
        const test = await Test.create({ name, user: req.user._id });
        res.status(201).json({ msg: "Test created", test });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

exports.getAllTests = async (req, res) => {
    try {
        const { userID } = req?.query;
        const tests = await Test.find().populate("user");
        // Fetch all favorites for the authenticated user
        let favorites
        userID ? favorites = await Favorite.find({ user: userID }) : null;
        // Create a set of favorite test IDs for faster lookup
        const favoriteTestIds = new Set(favorites?.map(favorite => favorite?.test?.toString()));
        // Modify the test objects to include information about whether they have been favorited
        const testsWithFavorites = tests?.map(test => ({
            ...test?.toObject(),
            isFavorited: favoriteTestIds?.has(test?._id?.toString()), // Check if the test ID exists in the set of favorite test IDs
        }));
        const whichTests = favorites?.length > 0 ? testsWithFavorites : tests
        if (whichTests.length > 0) return res.status(200).json({ msg: "Found tests", tests: whichTests });
        else return res.status(404).json({ msg: "Unable to find tests" });
    } catch (e) {
        return res.status(500).json({ msg: e.message })
    }
}

// Get all tests for a user
exports.getAllTestsByUser = async (req, res) => {
    try {
        const { userID } = req.query
        const tests = await Test.find({ user: userID }).populate("user");
        res.status(200).json({ msg: "Found tests by user", tests });
    } catch (err) {
        res.status(500).json({ msg: e.message });
    }
};

// Get a single test by ID
exports.getTestById = async (req, res) => {
    try {
        const { testID } = req.query;
        const test = await Test.findById(testID);
        if (!test) {
            return res.status(404).json({ msg: 'Test not found' });
        }
        res.status(200).json({ msg: "Found test", test });
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

// Update a test by ID
exports.updateTestById = async (req, res) => {
    try {
        const { name } = req.body;
        const test = await Test.findByIdAndUpdate(req.params.id, { name }, { new: true });
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json(test);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a test by ID
exports.deleteTestById = async (req, res) => {
    try {
        const test = await Test.findByIdAndDelete(req.params.id);
        if (!test) {
            return res.status(404).json({ message: 'Test not found' });
        }
        res.json({ message: 'Test deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};