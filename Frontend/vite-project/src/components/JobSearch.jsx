import { useState } from "react"
import { ChevronDown, X } from "lucide-react"

function JobSearch({ filters, onFilterChange, loading }) {
  const [showFilters, setShowFilters] = useState({
    location: false,
    experience: false,
    salary: false,
    function: false,
    industry: false,
    jobType: false,
    skills: false,
  })

  const [tempFilters, setTempFilters] = useState({
    location: filters.location || "",
    minExp: filters.minExp || "",
    maxExp: filters.maxExp || "",
    minSalary: filters.minSalary || "",
    maxSalary: filters.maxSalary || "",
    function: filters.function || "",
    industry: filters.industry || "",
    jobType: filters.jobType || "",
    skills: filters.skills || "",
  })

  const locations = ["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai", "Pune", "Noida", "Gurgaon"]
  const functions = ["Software Development", "Data Science", "Product Management", "Design", "Marketing", "Sales"]
  const industries = ["Information Technology", "Finance", "Healthcare", "E-commerce", "Education", "Manufacturing"]
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"]

  const toggleFilter = (filterType) => {
    setShowFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }))
  }

  const handleFilterSelect = (filterType, value) => {
    const newTempFilters = { ...tempFilters, [filterType]: value }
    setTempFilters(newTempFilters)

    // Apply filter immediately for single-select filters
    if (["location", "function", "industry", "jobType"].includes(filterType)) {
      onFilterChange({ [filterType]: value })
      setShowFilters((prev) => ({ ...prev, [filterType]: false }))
    }
  }

  const handleExperienceApply = () => {
    onFilterChange({
      minExp: tempFilters.minExp,
      maxExp: tempFilters.maxExp,
    })
    setShowFilters((prev) => ({ ...prev, experience: false }))
  }

  const handleSalaryApply = () => {
    onFilterChange({
      minSalary: tempFilters.minSalary,
      maxSalary: tempFilters.maxSalary,
    })
    setShowFilters((prev) => ({ ...prev, salary: false }))
  }

  const handleSkillsApply = () => {
    onFilterChange({ skills: tempFilters.skills })
    setShowFilters((prev) => ({ ...prev, skills: false }))
  }

  const clearFilter = (filterType) => {
    if (filterType === "experience") {
      setTempFilters((prev) => ({ ...prev, minExp: "", maxExp: "" }))
      onFilterChange({ minExp: "", maxExp: "" })
    } else if (filterType === "salary") {
      setTempFilters((prev) => ({ ...prev, minSalary: "", maxSalary: "" }))
      onFilterChange({ minSalary: "", maxSalary: "" })
    } else {
      setTempFilters((prev) => ({ ...prev, [filterType]: "" }))
      onFilterChange({ [filterType]: "" })
    }
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      location: "",
      minExp: "",
      maxExp: "",
      minSalary: "",
      maxSalary: "",
      function: "",
      industry: "",
      jobType: "",
      skills: "",
    }
    setTempFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(tempFilters).some((value) => value !== "")

  return (
    <div className="job-search">
      <div className="job-search-header">
        <h2 className="job-search-title">Job Search</h2>
        {loading && <div className="loading-indicator">Loading...</div>}
      </div>

      <div className="filters">
        {/* Location Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.location ? "active" : ""}`}
            onClick={() => toggleFilter("location")}
          >
            Location {tempFilters.location && `(${tempFilters.location})`}
            <ChevronDown size={16} />
            {tempFilters.location && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("location")
                }}
              />
            )}
          </button>
          {showFilters.location && (
            <div className="filter-dropdown-content">
              {locations.map((location) => (
                <div key={location} className="filter-option" onClick={() => handleFilterSelect("location", location)}>
                  {location}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Experience Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.minExp || tempFilters.maxExp ? "active" : ""}`}
            onClick={() => toggleFilter("experience")}
          >
            Experience
            {(tempFilters.minExp || tempFilters.maxExp) &&
              ` (${tempFilters.minExp || 0}-${tempFilters.maxExp || "∞"} yrs)`}
            <ChevronDown size={16} />
            {(tempFilters.minExp || tempFilters.maxExp) && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("experience")
                }}
              />
            )}
          </button>
          {showFilters.experience && (
            <div className="filter-dropdown-content">
              <div className="range-filter">
                <input
                  type="number"
                  placeholder="Min years"
                  value={tempFilters.minExp}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, minExp: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder="Max years"
                  value={tempFilters.maxExp}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, maxExp: e.target.value }))}
                />
                <button onClick={handleExperienceApply} className="apply-btn">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Salary Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.minSalary || tempFilters.maxSalary ? "active" : ""}`}
            onClick={() => toggleFilter("salary")}
          >
            Salary
            {(tempFilters.minSalary || tempFilters.maxSalary) &&
              ` (₹${tempFilters.minSalary || 0}-${tempFilters.maxSalary || "∞"})`}
            <ChevronDown size={16} />
            {(tempFilters.minSalary || tempFilters.maxSalary) && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("salary")
                }}
              />
            )}
          </button>
          {showFilters.salary && (
            <div className="filter-dropdown-content">
              <div className="range-filter">
                <input
                  type="number"
                  placeholder="Min salary"
                  value={tempFilters.minSalary}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, minSalary: e.target.value }))}
                />
                <input
                  type="number"
                  placeholder="Max salary"
                  value={tempFilters.maxSalary}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, maxSalary: e.target.value }))}
                />
                <button onClick={handleSalaryApply} className="apply-btn">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Function Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.function ? "active" : ""}`}
            onClick={() => toggleFilter("function")}
          >
            Function {tempFilters.function && `(${tempFilters.function})`}
            <ChevronDown size={16} />
            {tempFilters.function && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("function")
                }}
              />
            )}
          </button>
          {showFilters.function && (
            <div className="filter-dropdown-content">
              {functions.map((func) => (
                <div key={func} className="filter-option" onClick={() => handleFilterSelect("function", func)}>
                  {func}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Industry Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.industry ? "active" : ""}`}
            onClick={() => toggleFilter("industry")}
          >
            Industry {tempFilters.industry && `(${tempFilters.industry})`}
            <ChevronDown size={16} />
            {tempFilters.industry && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("industry")
                }}
              />
            )}
          </button>
          {showFilters.industry && (
            <div className="filter-dropdown-content">
              {industries.map((industry) => (
                <div key={industry} className="filter-option" onClick={() => handleFilterSelect("industry", industry)}>
                  {industry}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Job Type Filter */}
        <div className="filter-dropdown">
          <button
            className={`filter-btn ${tempFilters.jobType ? "active" : ""}`}
            onClick={() => toggleFilter("jobType")}
          >
            Job Type {tempFilters.jobType && `(${tempFilters.jobType})`}
            <ChevronDown size={16} />
            {tempFilters.jobType && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("jobType")
                }}
              />
            )}
          </button>
          {showFilters.jobType && (
            <div className="filter-dropdown-content">
              {jobTypes.map((type) => (
                <div key={type} className="filter-option" onClick={() => handleFilterSelect("jobType", type)}>
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Skills Filter */}
        <div className="filter-dropdown">
          <button className={`filter-btn ${tempFilters.skills ? "active" : ""}`} onClick={() => toggleFilter("skills")}>
            Skills {tempFilters.skills && `(${tempFilters.skills})`}
            <ChevronDown size={16} />
            {tempFilters.skills && (
              <X
                size={14}
                onClick={(e) => {
                  e.stopPropagation()
                  clearFilter("skills")
                }}
              />
            )}
          </button>
          {showFilters.skills && (
            <div className="filter-dropdown-content">
              <div className="skills-filter">
                <input
                  type="text"
                  placeholder="Enter skills (comma separated)"
                  value={tempFilters.skills}
                  onChange={(e) => setTempFilters((prev) => ({ ...prev, skills: e.target.value }))}
                />
                <button onClick={handleSkillsApply} className="apply-btn">
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button className="clear-all-btn" onClick={clearAllFilters}>
            Clear All Filters
          </button>
        )}
      </div>
      <hr className="divider" />
    </div>
  )
}

export default JobSearch
