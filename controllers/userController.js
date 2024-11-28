const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const JobModal = require('../models/Job');
const Review = require('../models/review');

const userInfo = async (req, res) =>{
    if (req.user) {
        const userDetails = req.user;
        const userInfo = await UserModel.findOne({_id: req.user.id})
        if (userInfo) {
            const userImage = userInfo?.profileImage 
            res.status(200).json({
                user:  {
                    id: userDetails.id,
                    name: userDetails.name,
                    email: userDetails.email,
                    role: userDetails.role,
                    profileImage: userImage}, 
                role: req.user.role, 
                verified: true
              });
        }
        
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

const checkToken = async (req, res) =>{
    try {
        const accessToken = req.cookies.accessToken; 
        if (accessToken) {
            return res.status(200).json({verified: true});
        }
    } catch (error) {
        return res.status(400).json({verified: false});
    }
}

const userProfile = async (req, res) => {
    try {
        const user = req.user.id;
        const userData = await UserModel.findOne({_id: user}).select('-password');

        if (userData) {
           return res.status(200).json({userData});
        }
    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong' });
    }
}

const otherUserProfile = async (req, res) => {
    try {
        const user = req.params.userId;
        const userData = await UserModel.findOne({_id: user}).select('-password');
        
        if (userData?.role === "artisan") {
          const completedJobs = await JobModal.countDocuments({ workerId:user, status: 'completed' });
          const activeJobs = await JobModal.countDocuments({ workerId:user, status: { $in: ['pending', 'hired', 'inprogress'] } });
          const reviews = await Review.find({ workerId: user });
            const averageRating = reviews.length
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : 0;
          
            
           return res.status(200).json({profile: {userData}, stats:{completedJobs, activeJobs, reviews: { totalReviews: reviews.length, averageRating, }, }});
        
        } else if(userData?.role === 'employer') {
        console.log(userData)
            const completedJobs = await JobModal.countDocuments({ postedBy:user, status: 'completed' });
            const activeJobs = await JobModal.countDocuments({ postedBy:user, status: { $in: ['pending', 'hired', 'inprogress'] } });
    
                // Aggregate review stats
        
            const reviews = await Review.find({ workerId: user });
            const averageRating = reviews.length
                ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                : 0;
            return res.status(200).json({profile: {userData}, stats: {completedJobs, activeJobs, reviews: { totalReviews: reviews.length, averageRating, }, }});
        }
    } catch (error) {
       // return res.status(500).json({ message: 'Something went wrong' });
    }
}

const updateInfo = async (req, res) =>{
    try {
        const userId = req.body.id;
        const { name, email, phone, about,  businessName, state, lga, area, specialization } = req.body;
        const updateUser = await UserModel.findByIdAndUpdate(userId,{
            phone,
            description: about,
            businessName,
            state,
            lga,
            area,
            specialization
        });

        if (updateUser) {
            return res.status(200).json({success: true});
        } 
    } catch (error) {
        console.log(error)
    }
}

const changepassword = async (req, res) =>{
    try {
        const {id, newPassword, oldPassword } = req.body;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(400).json({message: 'Error Changing password', verify: false });
        }
        
        const checkPassword = bcrypt.compareSync(oldPassword, user.password);
        if (!checkPassword) {
            return res.status(401).json({message: 'Old pasword incorrect', verify: false});
        }
        
        user.password = newPassword;
        await user.save();

        return res.status(200).json({message: 'Password changed successfully', verify: true})      
    } catch (error) {
        return res.status(401).json({message: 'Sorry an error occured Password not changed', verify: false});
    }
}


module.exports = {userInfo, userProfile, otherUserProfile, checkToken, updateInfo, changepassword};