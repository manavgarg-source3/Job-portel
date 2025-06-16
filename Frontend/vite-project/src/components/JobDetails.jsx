import { CheckCircle, MapPin, Briefcase, Calendar, Share2, Bookmark, Printer, DollarSign } from "lucide-react"

function JobDetail({ job }) {
  const formatSalary = (min, max) => {
    const formatAmount = (amount) => {
      if (amount >= 10000000) return `${(amount / 10000000).toFixed(1)} Crore`
      if (amount >= 100000) return `${(amount / 100000).toFixed(1)} Lakh`
      return `${(amount / 1000).toFixed(0)}K`
    }
    return `₹${formatAmount(min)} - ${formatAmount(max)} per annum`
  }

  const formatExperience = (min, max) => {
    if (min === max) return `${min} years`
    return `${min}-${max} years`
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
    <div className="job-detail">
      <div className="job-detail-header">
        <div className="company-logo-container">
          <div className="company-logo"></div>
        </div>
        <div className="company-info">
          <h2 className="company-name">{job.company}</h2>
          {job.isVerified && (
            <div className="verified-badge">
              <CheckCircle size={16} className="verified-icon" />
              <span>Company Verified Company</span>
            </div>
          )}
        </div>
      </div>

      <h1 className="job-title">{job.title}</h1>

      <div className="job-stats">
        <span className="posted-date">Posted {formatDate(job.postedAt)}</span>
        <span className="job-function">{job.function}</span>
        <span className="job-industry">{job.industry}</span>
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="skill-tags">
          {job.skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>
      )}

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
          <span>{job.jobType}</span>
        </div>
        <div className="meta-item">
          <DollarSign size={16} />
          <span>{formatSalary(job.salary.min, job.salary.max)}</span>
        </div>
      </div>

      <div className="action-buttons">
        <button className="apply-btn">Apply</button>
        <button className="action-btn">
          <Bookmark size={18} />
        </button>
        <button className="action-btn">
          <Share2 size={18} />
        </button>
        <button className="action-btn">
          <Printer size={18} />
        </button>
      </div>

      <div className="job-description">
        <h3>Job Description</h3>
        <div className="description-content">
          <p>{job.description}</p>
        </div>

        <div className="job-requirements">
          <h4>Requirements</h4>
          <ul>
            <li>Experience: {formatExperience(job.experience.min, job.experience.max)}</li>
            <li>Location: {job.location}</li>
            <li>Job Type: {job.jobType}</li>
            {job.skills && job.skills.length > 0 && <li>Skills: {job.skills.join(", ")}</li>}
          </ul>
        </div>

        <div className="about-company">
          <h3>About Company</h3>
          <p>
            {job.company} is a leading company in the {job.industry} industry, focused on {job.function}. We are
            committed to providing excellent opportunities for professional growth and development.
          </p>
        </div>

        <button className="view-similar-btn">View Similar Jobs</button>
      </div>
    </div>
  )
}

export default JobDetail
