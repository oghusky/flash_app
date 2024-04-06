const router = require("express").Router(),
    { isLoggedIn } = require("../middleware"),
    { createReport } = require("../controllers/report-controllers");

router
    .route("/")
    .post(isLoggedIn, createReport);

module.exports = router;