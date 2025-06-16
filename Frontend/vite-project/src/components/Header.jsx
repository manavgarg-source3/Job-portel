

import { User } from "lucide-react"
import { useState } from "react"

function Header({ onSearch, onOpenJobForm }) {
  const [searchData, setSearchData] = useState({
    title: "",
    location: "",
    salary: "",
  })

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSearch = () => {
    onSearch(searchData)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-placeholder"></div>
        <nav className="main-nav">
          <a href="#" className="nav-link active">
            Jobs Manav
          </a>
          <a href="#" className="nav-link">
            Hiring Partners
          </a>
          <button className="nav-link add-job-btn" onClick={onOpenJobForm}>
            Add Jobs
          </button>
        </nav>
      </div>
      <div className="header-right">
        <div className="search-box">
          <input
            type="text"
            placeholder="Job title, company..."
            value={searchData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Location"
            value={searchData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <input
            type="text"
            placeholder="Min Salary"
            value={searchData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="find-jobs-btn" onClick={handleSearch}>
            Find Jobs
          </button>
        </div>
        <button className="user-profile">
          <User size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header