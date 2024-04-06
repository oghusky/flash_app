const router = require("express").Router(),
    { isLoggedIn } = require("../middleware"),
    {
        createQuestion,
        getQuestionsByDeckID,
        getQuestionByQuestionID,
        updateQuestionByQuestionID,
        deleteQuestionByQuestionID,
        getQuestionsByUserID,
        createTestQuestions,
        getQuestionsByTestID,
        deleteTestQuestionByQuestionID,
        checkTestAnswerById
    } = require("../controllers/questions-controllers");

router
    .route("/")
    .get(isLoggedIn, getQuestionsByDeckID)
    .post(isLoggedIn, createQuestion);

router
    .route("/tests")
    .post(isLoggedIn, createTestQuestions);

router
    .route("/tests/id")
    .delete(isLoggedIn, deleteTestQuestionByQuestionID)
    .get(getQuestionsByTestID);

router
    .route("/id")
    .put(isLoggedIn, updateQuestionByQuestionID)
    .delete(isLoggedIn, deleteQuestionByQuestionID)
    .get(getQuestionByQuestionID);

router
    .route("/userid")
    .get(isLoggedIn, getQuestionsByUserID);

router
    .route("/tests/run")
    .get(isLoggedIn, checkTestAnswerById);

module.exports = router;