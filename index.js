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
const workersRoutes = require('./routes/workersRoute');
const jobsRoutes = require('./routes/jobsRoute');
const chatRouts = require('./routes/chatRoute');
const messageRoutes = require('./routes/message');
const reviewRoutes = require('./routes/reviewRoutes');
const hireRoute = require('./routes/hireRoute');
const notificationRoute = require('./routes/notificationRoute');
const statsRoute = require('./routes/statsRoute');
const imageRoute = require('./routes/imageRoute');

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(helmet());
app.use(cors({
    origin: [process.env.REACTURL, 'http://localhost:3001'],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
}));
app.use(globalLimiter);
app.use('/api/auth', authRoutes);
app.use(stateRoutes);
app.use('/user/verify', userRoute); 
app.use('/api', workersRoutes) ;
app.use('/api/job', jobsRoutes); 
app.use('/chat', chatRouts);
app.use('/message', messageRoutes);
app.use('/review', reviewRoutes);
app.use('/hire', hireRoute);
app.use('/notification', notificationRoute);
app.use('/stats', statsRoute);
app.use('/album', imageRoute);

mongoose.connect(process.env.MONGO_COMPASS).then(() => {
    console.log('MongoDB connected')
}).catch(err => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
})