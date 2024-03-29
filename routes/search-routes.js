const router = require("express").Router(),
    { getDeckBySearch } = require("../controllers/search-controllers");

router
    .route("/")
    .get(getDeckBySearch);

module.exports = router;