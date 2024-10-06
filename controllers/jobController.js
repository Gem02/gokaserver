const JobModal = require('../models/Job');  



// Create a job
const createJob =  async (req, res) => {
  const { location, tag, heading, description } = req.body;

  try {
    const job = new JobModal({
      businessName,
      location,
      tag,
      heading,
      description,
      postedBy: req.user.id,  
    });
    
    const savedJob = await job.save();
    return res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get jobs
const getJobs =  async (req, res) => {
  try {
    const jobs = await JobModal.find()
    .populate('postedBy', 'businessName profileImage lga state'); 
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Apply for a job
const applyJob =  async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    job.applicants.push(req.user.id);  // Add user to applicants
    await job.save();
    
    res.status(200).json({ message: 'Applied successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};


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

// Get a single job by ID
const singleJob =  async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
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

module.exports = {createJob, getJobs, applyJob};
