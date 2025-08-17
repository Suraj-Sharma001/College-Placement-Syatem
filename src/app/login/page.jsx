"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { studentLogin, facultyLogin } from "@/lib/auth";

export default function LoginPage() {
  const [tab, setTab] = useState("student");
  const [email, setEmail] = useState("");
  const [key, setKey] = useState("");
  const [err, setErr] = useState("");

  const submitStudent = (e) => {
    e.preventDefault();
    try { studentLogin(email.trim()); location.href = "/student/dashboard"; }
    catch (ex) { setErr(ex.message); }
  };

  const submitFaculty = (e) => {
    e.preventDefault();
    try { facultyLogin(key.trim()); location.href = "/faculty/dashboard"; }
    catch (ex) { setErr(ex.message); }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-2">
            <button className={`p-3 font-semibold ${tab==="student"?"bg-indigo-50 text-indigo-700":"text-gray-600 hover:bg-gray-50"}`} onClick={()=>setTab("student")}>Student</button>
            <button className={`p-3 font-semibold ${tab==="faculty"?"bg-indigo-50 text-indigo-700":"text-gray-600 hover:bg-gray-50"}`} onClick={()=>setTab("faculty")}>Faculty</button>
          </div>
          <div className="p-6">
            {tab==="student" ? (
              <form onSubmit={submitStudent} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Official Email</label>
                  <input className="mt-1 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="your.name@college.edu" required/>
                </div>
                <button className="btn w-full">Login as Student</button>
              </form>
            ) : (
              <form onSubmit={submitFaculty} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Faculty Key</label>
                  <input className="mt-1 w-full border rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500" type="password" value={key} onChange={(e)=>setKey(e.target.value)} placeholder="Enter faculty secret key" required/>
                </div>
                <button className="btn w-full bg-green-600 hover:bg-green-700">Login as Faculty</button>
              </form>
            )}
            {err && <p className="text-red-600 text-sm mt-3">{err}</p>}
          </div>
        </div>
      </div>
    </>
  );
}
