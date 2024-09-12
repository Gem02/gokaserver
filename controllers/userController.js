const UserModel = require('../models/User');

const userInfo = async (req, res) =>{
    if (req.user) {
        res.status(200).json({
            user: req.user, 
            role: req.user.role,  
          });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

const userProfile = async (req, res) => {
    try {
        const user = req.user.id;
        const userData = await UserModel.findOne({_id: user});

        if (userData) {
            const {
                name,
                email, 
                phone, 
                role, 
                state, 
                lga, 
                area, 
                isVerified, 
                upgraded, 
                businessName, 
                specialization, 
                description, 
                profileImage 
            } = userData;

           return res.status(200).json({
                name,
                email, 
                phone, 
                role, 
                state, 
                lga, 
                area, 
                isVerified, 
                upgraded, 
                businessName, 
                specialization, 
                description, 
                profileImage
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const otherUserProfile = async (req, res) => {
    try {
        const user = req.params.userId;
        const userData = await UserModel.findOne({_id: user});
        if (userData) {
            const {
                name,
                email, 
                phone, 
                role, 
                state, 
                lga, 
                area, 
                isVerified, 
                upgraded, 
                businessName, 
                specialization, 
                description, 
                profileImage 
            } = userData;

           return res.status(200).json({
                name,
                email, 
                phone, 
                role, 
                state, 
                lga, 
                area, 
                isVerified, 
                upgraded, 
                businessName, 
                specialization, 
                description, 
                profileImage
            });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}


module.exports = {userInfo, userProfile, otherUserProfile};