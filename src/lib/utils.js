export const uid = () => Math.floor(Math.random() * 1_000_000);
export const readLocal = (k, f) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; } };
export const saveLocal = (k, v) => localStorage.setItem(k, JSON.stringify(v));
export const companyById = (companies, id) => companies.find(c => c.company_id === id);
export const eligible = (student, job) => student.cgpa >= job.required_cgpa && (!job.required_branch || job.required_branch === student.branch);
