const User = require("../models/User"),
    Deck = require("../models/Deck"),
    Question = require("../models/Question"),
    bcrypt = require("bcryptjs"),
    { signToken } = require("../utils/auth"),
    { checkPassword } = require("../utils/checkPassword"),
    { checkEmail } = require("../utils/checkEmail");
exports.createUser = async (req, res) => {
    const { email, password, firstName, lastName, signUpGoogle, tokenSub, type, isAdult, userName } = req.body.register;
    try {
        let pwdToSave;
        if (!password && signUpGoogle) {
            pwdToSave = `${tokenSub}$${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toLowerCase()}`;
        } else {
            pwdToSave = password;
        }
        if (!email) return res.status(500).json({ msg: "Email required" });
        if (!checkEmail(email)) return res.status(500).json({ msg: "Email must be proper format" });
        if (!pwdToSave) return res.status(500).json({ msg: "Password required" });
        if (!checkPassword(pwdToSave)) return res.status(500).json({ msg: "Password isn't valid" });
        if (isAdult === null || isAdult === undefined) return res.status(500).json({ msg: "Must confirm if you are over 18" });
        if (!firstName || !lastName) return res.status(500).json({ msg: "First and last name required" });
        const user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({ msg: "USER WITH THAT INFO EXISTS" });
        }
        const newUser = await User.create({ email, password: pwdToSave, firstName, lastName, type, isAdult, userName, ipAddress: req.ip });
        const token = await signToken(newUser);
        return res.status(201).json({
            token,
            msg: "USER CREATED",
            user: {
                _id: newUser._id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                isVerified: newUser.isVerified,
                userType: newUser.type,
                userName: newUser.userName
            },
        })
    } catch (err) {
        console.log(err);
    }
}

exports.login = async (req, res) => {
    const { email, password, signUpGoogle, tokenSub, firstName, lastName } = req.body.login;
    try {
        let pwdToSave;
        if (!password && signUpGoogle) {
            pwdToSave = `${tokenSub}$${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toLowerCase()}`;
        } else {
            pwdToSave = password;
        }
        const user = await User.findOne({ email }).select("+password");
        if (user?.email) {
            const authUser = await bcrypt.compare(pwdToSave, user.password);
            if (authUser) {
                const token = await signToken(user);
                return res.status(200).json({
                    token,
                    user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        userType: user.userType,
                        isVerified: user.isVerified,
                        userName: user.userName,
                    },
                    msg: "FOUND USER",
                });
            }
            else return res.status(500).json({ msg: "Info doesn't match" })
        }
        else return res.status(404).json({ msg: "USER DOESN'T EXIST" })
    } catch (err) {
        console.log(err);
    }
}

exports.findUserById = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (user) return res.status(200).json({ msg: "Found user", user });
        else return res.status(404).json({ msg: "User not found" });
    } catch (err) {
        console.log(err);
    }
}



exports.updateUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const data = {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        };

        // Check if the request includes a new password
        if (req.body.password) {
            // Hash the new password
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            // Add the hashed password to the update data
            data.password = hashedPassword;
        }

        // Update the user document in the database
        const user = await User.findByIdAndUpdate(userId, data, { new: true });

        if (user) {
            // Construct the updated user object to send in the response
            const updatedUser = {
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                isVerified: user.isVerified,
            };

            // Sign a new token for the updated user
            const token = await signToken(user);

            return res.status(200).json({ msg: "USER UPDATED", updatedUser, token });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
};


exports.deleteUser = async (req, res) => {
    const { userId } = req.params;
    try {

        await Question.deleteMany({ user: userId });
        await Deck.deleteMany({ user: userId });
        const user = await User.findOneAndDelete({ _id: userId });
        if (user) return res.status(200).json({ msg: "USER DELETED" });
        else return res.status(404).json({ msg: "User not found" });
    } catch (e) {
        console.log(e.message);
    }
}