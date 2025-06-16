# 💼 Job Search Web App

A full-stack job search platform built using **React + Vite** on the frontend and **Node.js + Express + MongoDB Atlas** on the backend. Users can filter jobs by multiple criteria, paginate results, and view detailed job descriptions dynamically.

---

## 🏗️ Project Structure

Frontend/
└── vite-project/
├── node_modules/
├── public/
├── src/
│ ├── assets/ # Static assets (images, icons)
│ ├── components/ # React components (JobCard, FilterBar, JobDetail, etc.)
│ ├── service/ # API service calls (e.g., axios or fetch)
│ ├── App.jsx # Root component
│ ├── App.css
│ ├── index.css
│ └── main.jsx # ReactDOM render entry
├── index.html # Main HTML file
├── .env # Environment variables (e.g., VITE_API_URL)
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
## 🔧 Setup Instructions

### 1️⃣ Install Dependencies

```bash
cd Frontend/vite-project
npm install

2️⃣ Configure .env
Create a .env file with:

env
VITE_API_URL=http://localhost:5001/api

npm run dev

# 🖥️ Job Search Backend (Node.js + Express + MongoDB)

This is the **backend** API for the Job Search Web App. It handles job postings, dynamic filtering, pagination, and serves job data to the frontend via RESTful endpoints.

---

## 📁 Folder Structure

Backend/
├── config/ # DB configuration (MongoDB connection)
├── controllers/ # Business logic for routes
├── models/ # Mongoose schemas for Job entries
├── routes/ # API route definitions
├── node_modules/
├── .env # Environment variables (Mongo URI, PORT)
├── package.json
├── package-lock.json
└── server.js # Entry point of the backend server


## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **CORS** for frontend-backend communication
- **dotenv** for environment config

---

## ⚙️ Setup Instructions

### 1️⃣ Install Dependencies

```bash
cd Backend
npm install

PORT=5001
MONGO_URI=your_mongodb_connection_string

node server.js

📚 Features
📥 Create Job Posting

Via POST /api/jobs/createJob

🔍 Search & Filter Jobs

Filter by location, experience, and salary (individually or in combinations)

📄 Job Detail

GET endpoint for full job details
Via GET /api/jobs/getjob

🔁 Pagination

Fetch 10 jobs per page

Use ?page=1, ?page=2, etc.


📬 Developer
Manav Garg (B.tech CSE CGPA 8.5)

💻 GitHub: https://github.com/manavgarg-source3
📧 Email: mgarg2457@gmail.com


