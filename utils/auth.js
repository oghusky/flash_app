const jwt = require('jsonwebtoken');

exports.signToken = async ({ email, firstName, lastName, _id }) => {
    const payload = { email, firstName, lastName, _id };
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
}