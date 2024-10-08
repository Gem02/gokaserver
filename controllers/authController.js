const UserModel = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../utilities/generateToken');
const { sendVerificationEmail, sendWelcomEmail, sendVerificationPassword } = require('../utilities/emailTemplate');
const bcrypt = require('bcrypt');
const VerificationCode = require('../models/VerificationCode');


const preRegisteration = async (req, res) =>{
    try {
        const {email, name} = req.body.userData;
        const token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    
        let user = await VerificationCode.findOne({email});
        if (user) {
            return res.status(400).json({message: 'Error try again later'})
        }
        const validUser = await UserModel.findOne({email});
        if (validUser){
            return res.status(400).json({message: 'This is email is already in use'})
        }

        user = await VerificationCode.create({ email, name, token });
        sendVerificationEmail(email, name, token);
        return res.status(200).json({message: 'verification sent', status: true});
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sorry a server error occured' });
    }
};

const verifyCode = async (req, res) => {
    console.log('arrived here')
    try {
        const { email, code } = req.body;
        const user = await VerificationCode.findOne({ email });
        if (!user || user.token !== code) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }
        
        await VerificationCode.updateOne({ email }, { $unset: { token: 1 } });
        res.status(200).json({ message: 'Email verified successfully', status: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


const changepassword = async (req, res) => {
    try {
     const { email, password } = req.body.userData;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User does not exist' });
    }

    user.password = password;
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const registerUser = async (req, res) =>{
    try {
        const { name, email, phone, password, role, businessName, state, lga, area, specialization } = req.body.formData;
    
        const userExists = await UserModel.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await UserModel.create({ name, email, phone, password, role, businessName, state, lga, area, specialization });
        return res.status(201).json({ message: 'new user created' });
    } catch (error) {
        return res.status(401).json('error creating new user', error);
    }

    //sendWelcomEmail( user.email, user.name,);

};

const login = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const userInfo = await UserModel.findOne({email});

        if(!userInfo){
            return res.status(401).json({message: 'Invalid email or password'});
        }
    
        const isCorrect = bcrypt.compareSync(password, userInfo.password);
        if (!isCorrect) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const accessToken =  generateAccessToken(userInfo._id, userInfo.email, userInfo.role, userInfo.name);
        const refreshToken = generateRefreshToken(userInfo._id, userInfo.email, userInfo.role, userInfo.name);
        
        res.cookie('accessToken', accessToken, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });

        res.cookie('refreshToken', refreshToken, {
            maxAge:  7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        });
        

         return res.status(200).json({
            id: userInfo._id,
            name: userInfo.name,
            email: userInfo.email,
            role: userInfo.role,
            
            profileImage: userInfo.profileImage,
            isVerified: userInfo.isVerified,
            upgraded: userInfo.upgraded
        }); 

    } catch (error) {
        return res.status(400).json({message: error});
    }

}

const logout = (req, res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'Strict'
    });
    return res.status(200).json({ message: 'Logged out successfully', logout:true });

}

const passResetRegisteration = async(req, res) =>{
    try {
        const {email} = req.body;
        const token = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    
        let user = await VerificationCode.findOne({email});
        if (user) {
            return res.status(400).json({message: 'Error try again later'})
        }
        const validUser = await UserModel.findOne({email});

        if (validUser){
            const name = 'UNKNOWN';
            user = await VerificationCode.create({ email, name, token });
            sendVerificationPassword(email, token);
            return res.status(200).json({message: 'verification sent', status: true});
        } else{
            return res.status(400).json({message: 'No account is linked to this email'})
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Sorry a server error occured' });
    }
}

module.exports = { registerUser, login, logout, preRegisteration, verifyCode, changepassword, passResetRegisteration };