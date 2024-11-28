const notificationModel = require('../models/notification');

const newNotification = async (directoryId, senderId, receiverId, message, head, purpose) =>{
    try {
        const saveNotification = new notificationModel({
            directoryId,
            senderId, 
            receiverId, 
            message, 
            head,
            purpose
        });
        await saveNotification.save();
        if(saveNotification){
            return saveNotification;
        } 
    } catch (error) {
        console.log('error saving notification');
    }
}

module.exports = {newNotification}