const userModel = require('../models/User');
const HireRequest = require('../models/HireRequest'); 


const hireRequest = async (req, res) => {
    const { employerId, workerId, fullName, phoneNumber, secondPhoneNumber, address, email, description, specialRequest } = req.body;
    
    try {
        // Save hire request in the database
        const hireRequest = new HireRequest({
            employerId,
            workerId,
            fullName,
            phoneNumber,
            secondPhoneNumber,
            address,
            email,
            description,
            specialRequest,
            status: 'Pending', 
        });

        await hireRequest.save();
        return res.status(201).json({ message: 'Hire request submitted successfully.', success: true });
    } catch (error) {
        return res.status(500).json({ message: 'Error submitting hire request.', error });
    }
};

module.exports = {hireRequest};
