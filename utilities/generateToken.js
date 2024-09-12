const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = (id, email, role, name) => {
    return jwt.sign({id, email, role, name}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
}

const generateRefreshToken = (id, email, role, name) => {
    return jwt.sign({id, email, role, name}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
}

module.exports = { generateAccessToken, generateRefreshToken };