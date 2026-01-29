const Job = require("../models/job");

// GET jobs
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST job
const createJob = async (req, res) => {
  const { title, company, location } = req.body;
  try {
    const job = new Job({ title, company, location });
    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getJobs, createJob };