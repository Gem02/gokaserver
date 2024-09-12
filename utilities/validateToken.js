const jwt = require('jsonwebtoken');
const {generateAccessToken} = require('./generateToken');


const renewToken = (req, res) =>{
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(404).json({ error: 'Token not found' });
    }

     
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ error: 'Invalid refresh token from promise' });
        }

        const newAccessToken = generateAccessToken(decoded._id, decoded.email, decoded.role);
        res.cookie('accessToken', newAccessToken, { maxAge: 1 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'Strict' });
        req.user = decoded;
    });

}




module.exports = renewToken;