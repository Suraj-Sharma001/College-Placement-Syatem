"use client";
import { readLocal, saveLocal } from "./utils";
import { OFFICIAL_EMAIL_DOMAIN, FACULTY_SECRET_KEY, STUDENTS } from "./mock";
import { uid } from "./utils";

const KEY_ROLE = "role";
const KEY_EMAIL = "userEmail";
const KEY_STUDENTS = "students";

export const getRole = () => readLocal(KEY_ROLE, null);
export const getEmail = () => readLocal(KEY_EMAIL, "");
export const getStudents = () => readLocal(KEY_STUDENTS, STUDENTS);

export const setStudents = (arr) => saveLocal(KEY_STUDENTS, arr);
export const setRole = (r) => saveLocal(KEY_ROLE, r);
export const setEmail = (e) => saveLocal(KEY_EMAIL, e);

export const getCurrentStudent = () => {
  const email = getEmail();
  return getStudents().find(s => s.email === email) || null;
};

export const studentLogin = (email) => {
  if (!email || !email.includes("@")) throw new Error("Enter a valid email");
  if (!email.endsWith(OFFICIAL_EMAIL_DOMAIN)) throw new Error(`Use official email (${OFFICIAL_EMAIL_DOMAIN})`);

  const students = getStudents();
  if (!students.some(s => s.email === email)) {
    const [first] = email.split("@");
    const parts = first.replace(/\d+/g, "").split(".");
    const first_name = (parts[0] || "Student").replace(/^./, m => m.toUpperCase());
    const last_name  = (parts[1] || "User").replace(/^./, m => m.toUpperCase());
    const newStudent = { student_id: uid(), first_name, last_name, email, course: "B.Tech", branch: "Computer Science", cgpa: 8.0, resume_url: "" };
    setStudents([...students, newStudent]);
  }
  setEmail(email);
  setRole("student");
};

export const facultyLogin = (key) => {
  if (key !== FACULTY_SECRET_KEY) throw new Error("Invalid faculty key");
  setRole("faculty");
  setEmail("");
};

export const logout = () => { setRole(null); setEmail(""); };
