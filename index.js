require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { globalLimiter } = require('./utilities/ratelimits');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoute');
const stateRoutes = require('./routes/locationRoute');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: process.env.REACTURL,
    credentials: true
}));
app.use(globalLimiter);
app.use('/api/auth', authRoutes);
app.use(stateRoutes);
app.use('/user/verify', userRoute);   

mongoose.connect(process.env.MONGO_COMPASS).then(() => {
    console.log('MongoDB connected')
}).catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
})