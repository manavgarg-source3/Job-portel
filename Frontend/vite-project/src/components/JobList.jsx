import JobCard from "./JobCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

function JobList({ jobs, onJobSelect, selectedJobId, loading, error, pagination, onPageChange }) {
  if (loading) {
    return (
      <div className="job-list">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading jobs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="job-list">
        <div className="error-state">
          <p>Error loading jobs: {error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="job-list">
        <div className="empty-state">
          <p>No jobs found matching your criteria.</p>
          <p>Try adjusting your filters.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="job-list">
      <div className="job-list-header">
        <p className="results-count">
          Showing {jobs.length} of {pagination.total} jobs
        </p>
      </div>

      {jobs.map((job) => (
        <JobCard key={job._id} job={job} onClick={() => onJobSelect(job)} isSelected={job._id === selectedJobId} />
      ))}

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div className="pagination-info">
            Page {pagination.page} of {pagination.pages}
          </div>

          <button
            className="pagination-btn"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.pages}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  )
}

export default JobList
