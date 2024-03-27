const Question = require("../models/Question"),
    Deck = require("../models/Deck");

exports.createQuestion = async (req, res) => {
    try {
        const { deckID } = req.query;
        const questions = req.body;
        if (!req.user._id) return res.status(403).json({ msg: "You aren't authorized to do that" });
        const deck = await Deck.findOne({ _id: deckID });
        if (!deck) return res.status(404).json({ msg: "Unable to find deck" });
        if (questions.length < 1) return res.status(500).json({ msg: "Deck must have at least one question" });
        for (let i = 0; i < questions.length; i++) {
            let question = questions[i];
            if (!question.answer) {
                return res.status(500).json({ msg: "Question must have an answer" });
            }
            if (!question.question) {
                return res.status(500).json({ msg: "Question must have a question" });
            }
        }
        const questionsArray = questions.map(q => {
            return {
                question: q.question,
                answer: q.answer,
                user: req.user._id,
                deck: deckID
            }
        })
        const newQuestions = await Question.insertMany(questionsArray);
        await deck.questions.push(...newQuestions.map(q => q._id)); // push just newQuestionIDs to deck.questions
        await deck.save();
        return res.status(201).json({ msg: "Inserted questions", questions: newQuestions });
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({ msg: e.message })
    }
}

exports.getQuestionsByDeckID = async (req, res) => {
    try {
        const { deckID } = req.query;
        const deck = await Deck.findOne({ _id: deckID });
        if (!deck) return res.status(404).json({ msg: "Unable to find deck" });
        const questions = await Question.find({ deck: deckID });
        if (questions.length < 1) return res.status(200).json({ msg: "This deck doesn't have any questions yet" });
        return res.status(200).json({ msg: "Found questions", questions });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.getQuestionsByUserID = async (req, res) => {
    try {
        const { userID } = req.query;
        console.log({ userID })
        const questions = await Question.find({ user: userID });
        if (questions.length < 1) return res.status(200).json({ msg: "This deck doesn't have any questions yet" });
        return res.status(200).json({ msg: "Found questions", questions });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.getQuestionByQuestionID = async (req, res) => {
    try {
        const { questionID } = req.query;
        const question = await Question.findOne({ _id: questionID });
        if (!question) return res.status(404).json({ msg: "Unable to find question" });
        return res.status(200).json({ msg: "Found question", question });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.updateQuestionByQuestionID = async (req, res) => {
    try {
        const { questionID } = req.query;
        if (!req.body.question) return res.status(500).json({ msg: "Question required" });
        if (!req.body.answer) return res.status(500).json({ msg: "Answer required" });
        const data = {
            question: req.body.question,
            answer: req.body.answer
        }
        let question = await Question.findOne({ _id: questionID, user: req.user });
        if (!question) return res.status(404).json({ msg: "Unable to find question" });
        question = await Question.findOneAndUpdate({ _id: questionID }, { "$set": data }, { new: true });
        return res.status(200).json({ msg: "Question updated", question });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

exports.deleteQuestionByQuestionID = async (req, res) => {
    try {
        const { questionID } = req.query;
        let question = await (await Question.findOne({ _id: questionID, user: req.user })).populate("user");
        const deck = await Deck.findOneAndUpdate({ _id: question.deck }, { "$pull": { questions: questionID } }, { new: true }).populate("user");
        if (!question) return res.status(404).json({ msg: "Unable to find question" });
        await question.deleteOne();
        return res.status(200).json({ msg: "Question deleted", deck });
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}