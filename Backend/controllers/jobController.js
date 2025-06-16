import Job from "../models/Job.js";

export const createJob = async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const {
      title,
      location,
      minExp,
      maxExp,
      minSalary,
      maxSalary,
      function: fn,
      industry,
      jobType,
      skills,
      page = 1,
      limit = 10,
    } = req.query;
// develop by manav garg
    const filter = {};
    if (title) filter.title = title;
    if (location) filter.location = location;
    if (minExp) filter["experience.min"] = { $gte: +minExp };
    if (maxExp) filter["experience.max"] = { $lte: +maxExp };
    if (minSalary) filter["salary.min"] = { $gte: +minSalary };
    if (maxSalary) filter["salary.max"] = { $lte: +maxSalary };
    if (fn) filter.function = fn;
    if (industry) filter.industry = industry;
    if (jobType) filter.jobType = jobType;
    if (skills) {
      // comma-separated list → array of strings
      const skillList = skills.split(",").map((s) => s.trim());
      filter.skills = { $all: skillList };
    }

    const total = await Job.countDocuments(filter);
    const jobs = await Job.find(filter)
      .sort({ postedAt: -1 })
      .skip((page - 1) * limit)
      .limit(+limit);

    res.json({
      total,
      page: +page,
      pages: Math.ceil(total / limit),
      jobs,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
