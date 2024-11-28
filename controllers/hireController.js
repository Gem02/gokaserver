const userModel = require('../models/User');
const hiredModel = require('../models/hired');
const HireRequest = require('../models/HireRequest'); 
const {newNotification} = require('../utilities/notification');
const JobModal = require('../models/Job');  



const hired = async (req, res) =>{
    const {workerId, jobId, hireReqId} = req.query;
    const employerId = req.user.id;
    try {
        const hire = new hiredModel({
            employerId,
            workerId,
            jobId,
            hireReqId
        });

        await hire.save();
        const message = `You have been hired for a job. Accept or Reject this offer now before your employer cancels the offer...`;
        const head = 'CONGRATULATIONS';

       
        if (jobId) {
            const fetch = await JobModal.findByIdAndUpdate(jobId, {
                applicants: [],
                status: 'pending',
            });
            const data = await newNotification(jobId, employerId, workerId, message, head );
            return res.status(200).json({status: true, data})
        }

        return res.status(200).json({status: true})
    } catch (error) {
        console.log(error)
        return res.status(401).json({message: 'Error hiring please try again later'})
    }
}

module.exports = { hired};
