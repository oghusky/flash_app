// if (questions.length < 1) return res.status(500).json({ msg: "Deck must have at least one question" });
// for (let i = 0; i < questions.length; i++) {
//     let question = questions[i];
//     if (!question.answer) {
//         return res.status(500).json({ msg: "Question must have an answer" });
//     }
//     if (!question.question) {
//         return res.status(500).json({ msg: "Question must have a question" });
//     }
// }