"use client"

import { useState, useEffect } from "react"
import Header from "./components/Header"
import JobSearch from "./components/JobSearch"
import JobList from "./components/JobList"
import JobDetail from "./components/JobDetails"
import JobFormModal from "./components/JobFormModal"
import Footer from "./components/Footer"
import "./App.css"
import { jobService } from "./service/jobService"

function App() {
  const [selectedJob, setSelectedJob] = useState(null)
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showJobForm, setShowJobForm] = useState(false)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    pages: 1,
  })

  const [filters, setFilters] = useState({
    location: "",
    minExp: "",
    maxExp: "",
    minSalary: "",
    maxSalary: "",
    function: "",
    industry: "",
    jobType: "",
    skills: "",
    page: 1,
    limit: 10,
  })

  const [searchQuery, setSearchQuery] = useState({
    title: "",
    location: "",
    salary: "",
  })

  const fetchJobs = async (filterParams = filters, searchParams = searchQuery) => {
    setLoading(true)
    setError(null)
    try {
      // Combine filters and search parameters
      const combinedParams = {
        ...filterParams,
        // Add search parameters
        ...(searchParams.title && { title: searchParams.title }),
        ...(searchParams.location && { location: searchParams.location }),
        ...(searchParams.salary && { minSalary: searchParams.salary }),
      }

      const response = await jobService.getJobs(combinedParams)
      setJobs(response.jobs)
      setPagination({
        total: response.total,
        page: response.page,
        pages: response.pages,
      })
      // Auto-select first job if none selected
      if (response.jobs.length > 0 && !selectedJob) {
        setSelectedJob(response.jobs[0])
      }
    } catch (err) {
      setError(err.message)
      console.error("Error fetching jobs:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleJobSelect = (job) => {
    setSelectedJob(job)
  }

  const handleFilterChange = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 }
    setFilters(updatedFilters)
    fetchJobs(updatedFilters, searchQuery)
  }

  const handleSearch = (searchData) => {
    setSearchQuery(searchData)
    const resetFilters = { ...filters, page: 1 }
    setFilters(resetFilters)
    fetchJobs(resetFilters, searchData)
  }

  const handlePageChange = (page) => {
    const updatedFilters = { ...filters, page }
    setFilters(updatedFilters)
    fetchJobs(updatedFilters, searchQuery)
  }

  const handleJobCreated = () => {
   
    fetchJobs(filters, searchQuery)
  }

  return (
    <div className="app">
      <Header onSearch={handleSearch} onOpenJobForm={() => setShowJobForm(true)} />
      <main className="main-content">
        <JobSearch filters={filters} onFilterChange={handleFilterChange} loading={loading} />
        <div className="job-container">
          <JobList
            jobs={jobs}
            onJobSelect={handleJobSelect}
            selectedJobId={selectedJob?._id}
            loading={loading}
            error={error}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
          {selectedJob && <JobDetail job={selectedJob} />}
        </div>
      </main>
      <Footer />

      <JobFormModal isOpen={showJobForm} onClose={() => setShowJobForm(false)} onJobCreated={handleJobCreated} />
    </div>
  )
}

export default App

// MADE BY MANAV GARG