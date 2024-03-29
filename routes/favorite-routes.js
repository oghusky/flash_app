const express = require('express'),
    { isLoggedIn } = require("../middleware"),
    { getFavoriteByUserIDAndDeckID, postFavoriteByUserIDAndDeckID, deleteFavoriteByUserIDAndDeckID } = require("../controllers/favorite-controllers"),
    router = express.Router();

// GET all favorites for a user
router
    .route('/')
    .get(isLoggedIn, getFavoriteByUserIDAndDeckID)
    .post(isLoggedIn, postFavoriteByUserIDAndDeckID)
    .delete(isLoggedIn, deleteFavoriteByUserIDAndDeckID);

module.exports = router;
