const router = require('express').Router(),
    { isLoggedIn, isOwner } = require("../middleware"),
    {
        login,
        createUser,
        updateUser,
        deleteUser,
        findUserById,
    } = require("../controllers/user-controllers");

router
    .route("/")
    .post(createUser);
router
    .route("/login")
    .post(login);
router
    .route("/id/:userId")
    .get(isLoggedIn, findUserById)
    .put(isLoggedIn, isOwner, updateUser)
    .delete(isLoggedIn, isOwner, deleteUser);

module.exports = router;
