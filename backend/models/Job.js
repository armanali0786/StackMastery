const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true }, // e.g. Frontend, Backend, Data Science
  location: { type: String, required: true }, // e.g. Remote, Bangalore, CA
  type: { type: String, required: true }, // Full-Time, Internship, Contract
  experience: { type: String, required: true }, // e.g. 0-2 Years, Fresher
  salary: { type: String }, // e.g. 15-20 LPA
  description: { type: String }, // Job requirements/description
  url: { type: String, required: true }, // Application link
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.models.Job || mongoose.model('Job', JobSchema);
