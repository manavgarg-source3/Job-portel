
import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  experience: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  salary: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  function: { type: String },
  industry: { type: String },
  jobType: { type: String },
  skills: [String], 
  description: { type: String },
  postedAt: { type: Date, default: Date.now },
  isVerified: { type: Boolean, default: false },
});
// made by manav
export default mongoose.model("Job", jobSchema);
