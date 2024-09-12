const renewToken = require('../utilities/validateToken');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) =>{
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        try {
            await renewToken(req, res);
            next();
        } catch (error) {
            console.log('error renewing token');
        }
        
    } else{
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, async(err, decoded) =>{
            if (err) {
                try {
                    await renewToken(req, res);
                    next();
                } catch (error) {
                    console.log('error renewing from verify');
                }
            } else{
                req.user = decoded;
                next();
            }
        })
    }

}

module.exports = verifyToken;
