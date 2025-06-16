const BASE_URL = import.meta.env.VITE_BASE_URL ?? "https://job-portel-zmy0.onrender.com";

export const jobService = {
  async getJobs(filters = {}) {
    try {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "") {
          queryParams.append(key, value);
        }
      });
//MADE BY MANAV
      const response = await fetch(`${BASE_URL}/api/jobs/getJob?${queryParams.toString()}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  },

  async createJob(jobData) {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/CreateJob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  },
};
// MADE MY MANAV 