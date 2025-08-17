export const OFFICIAL_EMAIL_DOMAIN = "@gehu.ac.in";
export const FACULTY_SECRET_KEY = "FACULTY-KEY-2025";

export const COMPANIES = [
  { company_id: 101, name: "Innovate Inc.", website: "innovate.com" },
  { company_id: 102, name: "Tech Solutions Ltd.", website: "techsolutions.com" },
  { company_id: 103, name: "DataCorp", website: "datacorp.com" },
  { company_id: 104, name: "Future Systems", website: "futuresystems.com" },
];

export const JOBS = [
  { job_id: 1, company_id: 101, title: "Frontend Developer", description: "Build responsive UIs with React.", package_lpa: 12.5, required_cgpa: 8.0, required_branch: "Computer Science", location: "Bengaluru", created_at: Date.now()-6*864e5 },
  { job_id: 2, company_id: 102, title: "Backend Engineer", description: "APIs, DBs, services.", package_lpa: 14.0, required_cgpa: 8.2, required_branch: "Computer Science", location: "Pune", created_at: Date.now()-5*864e5 },
  { job_id: 3, company_id: 103, title: "Data Analyst", description: "Analyze datasets for insights.", package_lpa: 10.0, required_cgpa: 7.5, required_branch: null, location: "Remote", created_at: Date.now()-4*864e5 },
  { job_id: 4, company_id: 101, title: "QA Engineer", description: "Manual + automation testing.", package_lpa: 9.0, required_cgpa: 7.0, required_branch: "Information Technology", location: "Hyderabad", created_at: Date.now()-3*864e5 },
  { job_id: 5, company_id: 104, title: "DevOps Specialist", description: "Cloud infra & CI/CD.", package_lpa: 15.0, required_cgpa: 8.5, required_branch: "Computer Science", location: "Bengaluru", created_at: Date.now()-2*864e5 },
];

export const STUDENTS = [
  { student_id: 1, first_name: "Priya", last_name: "Sharma", email: "priya.sharma"+OFFICIAL_EMAIL_DOMAIN, course: "B.Tech", branch: "Computer Science", cgpa: 8.75, resume_url: "" },
  { student_id: 2, first_name: "Aman", last_name: "Verma", email: "aman.verma"+OFFICIAL_EMAIL_DOMAIN, course: "B.Tech", branch: "Information Technology", cgpa: 7.2, resume_url: "" },
  { student_id: 3, first_name: "Riya", last_name: "Singh", email: "riya.singh"+OFFICIAL_EMAIL_DOMAIN, course: "B.Tech", branch: "Computer Science", cgpa: 8.9, resume_url: "" },
];

export const APPLICATIONS = [
  { application_id: 1001, student_id: 1, job_id: 3, status: "Shortlisted", applied_at: Date.now()-864e5 },
];
