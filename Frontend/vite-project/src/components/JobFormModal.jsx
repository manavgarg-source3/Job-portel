

import { useState } from "react"
import { X } from "lucide-react"
import { jobService } from "../service/jobService"

function JobFormModal({ isOpen, onClose, onJobCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    experience: {
      min: "",
      max: "",
    },
    salary: {
      min: "",
      max: "",
    },
    function: "",
    industry: "",
    jobType: "",
    skills: "",
    description: "",
    isVerified: false,
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Convert skills string to array
      const jobData = {
        ...formData,
        experience: {
          min: Number.parseInt(formData.experience.min),
          max: Number.parseInt(formData.experience.max),
        },
        salary: {
          min: Number.parseInt(formData.salary.min),
          max: Number.parseInt(formData.salary.max),
        },
        skills: formData.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill),
      }

      await jobService.createJob(jobData)
      onJobCreated()
      onClose()

      // Reset form
      setFormData({
        title: "",
        company: "",
        location: "",
        experience: { min: "", max: "" },
        salary: { min: "", max: "" },
        function: "",
        industry: "",
        jobType: "",
        skills: "",
        description: "",
        isVerified: false,
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Add New Job</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="job-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-row">
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="e.g. Full Stack Developer"
              />
            </div>
            <div className="form-group">
              <label>Company *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="e.g. Tech Solutions Inc"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="e.g. Delhi, Mumbai"
              />
            </div>
            <div className="form-group">
              <label>Job Type</label>
              <select value={formData.jobType} onChange={(e) => handleInputChange("jobType", e.target.value)}>
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Experience (Years) *</label>
              <div className="range-inputs">
                <input
                  type="number"
                  required
                  placeholder="Min"
                  value={formData.experience.min}
                  onChange={(e) => handleInputChange("experience.min", e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  required
                  placeholder="Max"
                  value={formData.experience.max}
                  onChange={(e) => handleInputChange("experience.max", e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Salary (Annual) *</label>
              <div className="range-inputs">
                <input
                  type="number"
                  required
                  placeholder="Min"
                  value={formData.salary.min}
                  onChange={(e) => handleInputChange("salary.min", e.target.value)}
                />
                <span>to</span>
                <input
                  type="number"
                  required
                  placeholder="Max"
                  value={formData.salary.max}
                  onChange={(e) => handleInputChange("salary.max", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Function</label>
              <select value={formData.function} onChange={(e) => handleInputChange("function", e.target.value)}>
                <option value="">Select Function</option>
                <option value="Software Development">Software Development</option>
                <option value="Data Science">Data Science</option>
                <option value="Product Management">Product Management</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
            <div className="form-group">
              <label>Industry</label>
              <select value={formData.industry} onChange={(e) => handleInputChange("industry", e.target.value)}>
                <option value="">Select Industry</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Education">Education</option>
                <option value="Manufacturing">Manufacturing</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Skills</label>
            <input
              type="text"
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              placeholder="e.g. React, Node.js, MongoDB (comma separated)"
            />
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe the job role, responsibilities, and requirements..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.isVerified}
                onChange={(e) => handleInputChange("isVerified", e.target.checked)}
              />
              <span>Company Verified</span>
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Creating..." : "Create Job"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default JobFormModal