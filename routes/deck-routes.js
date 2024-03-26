const router = require('express').Router(),
    { isLoggedIn } = require("../middleware"),
    {
        createDeck,
        getDecks,
        getDeckByID,
        updateDeckByID,
        deleteDeckByID
    } = require("../controllers/deck-controllers");

router
    .route("/")
    .get(getDecks)
    .post(isLoggedIn, createDeck);

router
    .route("/id")
    .put(isLoggedIn, updateDeckByID)
    .delete(isLoggedIn, deleteDeckByID)
    .get(getDeckByID);
module.exports = router;