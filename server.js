const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // add this
require("dotenv").config();
const app = express();

app.use(cors()); // add this
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log("MongoDB error ❌", err));

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
});
const Job = mongoose.model("Job", jobSchema);

app.get("/", (req, res) => {
  res.send("Backend is alive 🚀");
});

app.get("/api/jobs", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Insert hardcoded jobs on startup
const insertJobs = async () => {
  await Job.deleteMany(); // clear existing jobs
  const jobs = [
    { title: "Software Engineer", company: "ABC Corp", location: "Bangalore" },
    { title: "Data Scientist", company: "XYZ Inc", location: "Delhi" },
  ];
  await Job.insertMany(jobs);
};
insertJobs();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} ✅`);
});