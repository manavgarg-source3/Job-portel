

import { MapPin, Briefcase, Calendar, MoreVertical, CheckCircle } from "lucide-react"

function JobCard({ job, onClick, isSelected }) {
  const formatSalary = (min, max) => {
    const formatAmount = (amount) => {
      if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)}Cr`
      if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`
      return `${(amount / 1000).toFixed(0)}K`
    }
    return `₹${formatAmount(min)} - ${formatAmount(max)}`
  }

  const formatExperience = (min, max) => {
    if (min === max) return `${min} yrs`
    return `${min}-${max} yrs`
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  return (
    <div className={`job-card ${isSelected ? "selected" : ""}`} onClick={onClick}>
      <div className="job-card-header">
        <div className="job-title-company">
          <h3 className="job-title">{job.title}</h3>
          <p className="company-name">
            {job.company}
            {job.isVerified && <CheckCircle size={14} className="verified-icon" />}
          </p>
        </div>
        <button className="more-options" onClick={(e) => e.stopPropagation()}>
          <MoreVertical size={18} />
        </button>
      </div>

      <div className="job-meta">
        <div className="meta-item">
          <Briefcase size={16} />
          <span>{formatExperience(job.experience.min, job.experience.max)}</span>
        </div>
        <div className="meta-item">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        <div className="meta-item">
          <Calendar size={16} />
          <span>{formatDate(job.postedAt)}</span>
        </div>
      </div>

      <div className="job-details">
        <div className="salary">{formatSalary(job.salary.min, job.salary.max)}</div>
        <div className="job-type">{job.jobType}</div>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="skills-preview">
          {job.skills.slice(0, 3).map((skill, index) => (
            <span key={index} className="skill-tag-small">
              {skill}
            </span>
          ))}
          {job.skills.length > 3 && <span className="more-skills">+{job.skills.length - 3} more</span>}
        </div>
      )}

      <button className="view-similar" onClick={(e) => e.stopPropagation()}>
        View Similar Jobs
      </button>

      {isSelected && <div className="selection-indicator"></div>}
    </div>
  )
}

export default JobCard
