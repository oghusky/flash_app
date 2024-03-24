// Require mongoose
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// Define User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        unique: true,
        required: "Email required",
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email must be valid']
    },
    firstName: {
        type: String,
        required: "First name required"
    },
    lastName: {
        type: String,
        required: "Last name required"
    },
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        select: false,
        required: "Password required",
        match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/, 'Password must be valid']
    },
    isAdult: {
        type: Boolean,
        required: "Age verification required",
        default: false
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["normie", "admin", "holy"],
        default: "normie"
    }
}, { timestamps: true });

UserSchema.pre('save', function (next) {
    let user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// Define models
module.exports = mongoose.model('User', UserSchema);

