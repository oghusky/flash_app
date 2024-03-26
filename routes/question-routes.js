const router = require("express").Router(),
    { isLoggedIn } = require("../middleware"),
    {
        createQuestion,
        getQuestionsByDeckID,
        getQuestionByQuestionID,
        updateQuestionByQuestionID,
        deleteQuestionByQuestionID,
        getQuestionsByUserID
    } = require("../controllers/questions-controllers");

router
    .route("/")
    .get(isLoggedIn, getQuestionsByDeckID)
    .post(isLoggedIn, createQuestion);

router
    .route("/id")
    .put(isLoggedIn, updateQuestionByQuestionID)
    .delete(isLoggedIn, deleteQuestionByQuestionID)
    .get(getQuestionByQuestionID);

router
    .route("/userid")
    .get(isLoggedIn, getQuestionsByUserID)

module.exports = router;