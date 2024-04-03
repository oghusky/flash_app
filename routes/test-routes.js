const router = require('express').Router(),
    { isLoggedIn } = require("../middleware"),
    {
        createTest,
        getAllTests,
        getTestById,
        updateTestById,
        deleteTestById,
    } = require('../controllers/test-controllers');

router.route('/')
    .post(isLoggedIn, createTest)
    .get(getAllTests);

router.route('/id')
    .get(getTestById)
    .put(isLoggedIn, updateTestById)
    .delete(isLoggedIn, deleteTestById);

module.exports = router;
