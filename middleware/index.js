const { jwtDecode } = require("jwt-decode"),
    User = require("../models/User");

// checks is user logged in 
exports.isLoggedIn = async (req, res, next) => {
    try {
        res.header(
            'Access-Control-Allow-Headers',
            'authorization, Origin, Content-Type, Accept'
        )
        console.log("checking if user is logged in")
        const token = req.headers.authorization;
        if (!token) return res.status(403).json({ msg: "You aren't authorized" });
        const tokenId = jwtDecode(token)?.data?._id;
        const user = await User.findById(tokenId);
        if (!user) return res.status(400).json({ msg: "User not found" });
        if (token && user?.email) {
            req.user = user;
            next()
        }
    } catch (e) {
        return res.status(500).json({ msg: e.message });
    }
}

// checks if user tyring to access route is user that's logged in
exports.isOwner = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization;
        const tokenId = jwtDecode(token)?.data?._id;
        console.log("checking if user is owner");
        if (!token || (tokenId !== req?.params?.userId)) return res.status(403).json({ msg: "You aren't authorized" });
        if (tokenId === req?.params?.userId) next();
    } catch (err) { }
}

// checks if user type is admin
exports.isAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        const tokenId = jwtDecode(token).data._id;
        const user = await User.findById(tokenId);
        console.log("checking if user is admin")
        if (user?.type === "admin" || user?.type === "holy") {
            req.userId = String(user._id);
            next()
        }
        else return res.status(403).json({ msg: "You aren't an admin" });
    } catch (err) { }
}
