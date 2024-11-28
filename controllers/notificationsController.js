const notificationModel = require('../models/notification');

const getNotifications = async(req, res)=>{
    try {
        const notifications = await notificationModel.find({receiverId: req.params.userId}).sort({createdAt: -1});
        return res.status(200).json(notifications);
    } catch (error) {
        console.log('error getting notifications');
    }
}

const viewCheck = async(req, res) =>{
    try {
        const notification = await notificationModel.findByIdAndUpdate(req.params.Id, {viewed: true});
        if (notification) {
            return res.status(200).json({ success: true, notification });
          }

        res.status(404).json({ success: false, message: 'Notification not found' });
    } catch (error) {
        console.log('Sorry an error occured');
    }
}

module.exports = {getNotifications, viewCheck};