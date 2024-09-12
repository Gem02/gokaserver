const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new job (Employer only)
router.post('/jobs', async (req, res) => {
    
    const { title, description, location, payRate, requiredSkills } = req.body;
    try {
        const job = await Job.create({ title, description, location, payRate, requiredSkills});
        res.status(201).json(job);
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all jobs
router.get('/jobs', async (req, res) => {
    try {
        const jobs = await Job.find().populate('employer', 'name email');
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Get jobs by location or required skills (filtering)
router.get('/jobs/search', async (req, res) => {
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
});

// Get a single job by ID
router.get('/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('employer', 'name email');
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a job (Employer only)
router.put('/jobs/:id', auth, async (req, res) => {
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
});

// Delete a job (Employer only)
router.delete('/jobs/:id', auth, async (req, res) => {
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
});

module.exports = router;
