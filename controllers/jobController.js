const JobModal = require('../models/Job');  
const {newNotification} = require('../utilities/notification');


// Create a job
const createJob = async (req, res) => {
  const { heading, fullName, phoneNumber, secondPhoneNumber, address, tag, email, description, specialRequest } = req.body;

  try {
    const job = new JobModal({
      location: address,
      phoneNumber,
      fullName,
      secondPhoneNumber,
      email,
      tag,
      heading,
      description,
      specialRequest,
      postedBy: req.user.id, 
    });
    
    const savedJob = await job.save();
    return res.status(201).json(savedJob);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const hireRequest = async (req, res) => {
  const { heading, workerId, fullName, phoneNumber, secondPhoneNumber, address, email, description, specialRequest } = req.body;
  
  try {
      // Save hire request in the database
      const hireRequest = new JobModal({
          location: address,
          phoneNumber,
          workerId,
          fullName,
          secondPhoneNumber,
          email,
          heading,
          description,
          specialRequest,
          postedBy: req.user.id,
          status: 'hired',
      })

      await hireRequest.save();
      const message = `You have been hired directly by ${fullName} for a job. Accept or Reject this offer now before your employer cancels the offer...`;
      const head = 'CONGRATULATIONS (Direct offer}';
      const purpose = 'jobOffer';

      const data = await newNotification(hireRequest._id, hireRequest.postedBy, workerId, message, head, purpose );
     
      return res.status(201).json({ data, success: true });
  } catch (error) {
      return res.status(500).json({ message: 'Error submitting hire request.', error });
  }
};

const employerHire = async (req, res) =>{
  const {workerId, jobId} = req.query;
  const employerId = req.user.id;
  try {
      const hire = await JobModal.findByIdAndUpdate(jobId, {
        workerId,
        applicants: [],
        status: 'pending'
      });
      if(hire){
        const message = `You have been hired for a job. Accept or Reject this offer now before your employer cancels the offer...`;
        const head = 'CONGRATULATIONS';
        const purpose = 'jobOffer';

        const data = await newNotification(jobId, employerId, workerId, message, head, purpose );
        return res.status(200).json({status: true, data});
      }
  } catch (error) {
    console.log(error)
      return res.status(401).json({message: 'Error hiring please try again later'})
  }
}

const acceptJob = async (req, res) =>{
  try {
    const jobId = req.params.jobId
    const job = await JobModal.findByIdAndUpdate(jobId, {
      status: 'accepted'
    });
    if(job){
      const message = `Congrats, your work is about to start.`;
      const head = 'JOB ACCEPTED';
      const purpose = 'jobAccepted';

      const data = await newNotification(jobId, job.workerId, job.postedBy, message, head, purpose );

      return res.status(200).json({ status: true, message: 'Job accepted', data});
    }
    
  } catch (error) {
    return res.status(500).json({message: 'server error'});
  }
}

const declineJob = async (req, res) =>{
  try {
    const job = JobModal.findByIdAndUpdate(req.params.jobId, {
      status: 'null'
    });
    if(job){
      return res.status(200).json({ status: true, message: 'Job declined'});
    }
  } catch (error) {
    
  }
}

const setProgress = async (req, res) =>{
  try {
    const job = await JobModal.findByIdAndUpdate(req.params.jobId, {
      status: 'inprogress'
    });
    if(job){
      return res.status(200).json({ status: true, message: 'Job is now in progress'});
    }
    
  } catch (error) {
    return res.status(500).json({message: 'server error'});
  }
}

// Get jobs
const getJobs =  async (req, res) => {
  try {
    const jobs = await JobModal.find({status: ['pending' ,'null']})
    .populate('postedBy', 'businessName profileImage lga state')
    .sort({createdAt: -1}); 
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Apply for a job
const applyJob = async (req, res) => {
  const jobId = req.params.jobId; // job id from the route params
  const applicantId = req.user?.id; // current user applying for the job

  try {
    // Find the job by id
    const job = await JobModal.findById(jobId);

    if (!job) {
      return res.status(404).json({ message: "Job not found." });
    }

    // Check if the applicant has already applied
    const alreadyApplied = job.applicants.includes(applicantId);
    
    if (alreadyApplied) {
      return res.status(200).json({ message: "You have already applied for this job.", duplicate: true });
    }

    // If not already applied, push the applicant's ID into the array
    job.applicants.push(applicantId);
    
    // Save the job with the updated applicants list
    await job.save();

    res.status(200).json({ message: "You have successfully applied for the job.", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while applying for the job." });
  }
};

// Get a single job by ID
const singleJob =  async (req, res) => {
    try {
      const info = await JobModal.findById(req.params.id).populate('postedBy', 'name profileImage email isVerified');
      if(info){
        return res.status(200).json({status: true, info});
      } 
      return res.status(404).json({ message: 'Job not found' });
      
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: 'Server error', });
    }
};

const applicants =  async (req, res) => {
  try {
      const job = await JobModal.findById(req.params.id).populate('applicants', 'name businessName specialization description profileImage area lga state isVerified');
      if (!job) {
          return res.status(404).json({ message: 'Job not found' });
      }
      res.status(200).json({status: true, applicants: job.applicants, heading: job.heading});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', })
  }
};

const employerJob = async (req, res) =>{
  try {
    const employerJob = await JobModal.find({postedBy: req.params.userId})
    .populate('postedBy', 'businessName profileImage lga state')
    if(employerJob){
      return res.status(200).json(employerJob);
    }
  } catch (error) {
    return res.status(500).json({message: 'server error'});
  }
}









const completedJob = async (req, res) =>{
  try {
    const job = await JobModal.findByIdAndUpdate(req.params.jobId, {
      status: 'completed'
    });
    if(job){
      return res.status(200).json({ status: true, message: 'Job is now completed'});
    }
  } catch (error) {
    
  }
}

// Get jobs by location or required skills (filtering)
const filterJob =  async (req, res) => {
  const { location, skill } = req.query;
  try {
      let query = {};
      if (location) query.location = location;
      if (skill) query.requiredSkills = skill;
      const jobs = await Job.find(query).populate('employer', 'name email');
      res.json(jobs);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
};

// Update a job (Employer only)
const updateJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job || job.employer.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete a job (Employer only)
const deleteJob =  async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job || job.employer.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Job not found or unauthorized' });
        }
        await job.remove();
        res.json({ message: 'Job removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {createJob, getJobs, singleJob, applyJob,
   applicants, hireRequest, acceptJob, declineJob, setProgress,
    employerHire, employerJob, completedJob};
