"use client";
import { useState } from "react";

export default function ProfileEditor({ student, onUpdate }) {
  const [form, setForm] = useState({ branch: student.branch, cgpa: student.cgpa, resume_url: student.resume_url });

  return (
    <form className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={(e)=>{ e.preventDefault(); onUpdate({ ...form, cgpa: Number(form.cgpa) }); }}>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Branch</label>
        <input className="w-full border rounded-lg p-2" value={form.branch} onChange={e=>setForm({...form, branch:e.target.value})}/>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">CGPA</label>
        <input type="number" step="0.01" className="w-full border rounded-lg p-2" value={form.cgpa} onChange={e=>setForm({...form, cgpa:e.target.value})}/>
      </div>
      <div>
        <label className="block text-sm text-gray-500 mb-1">Resume URL</label>
        <input className="w-full border rounded-lg p-2" value={form.resume_url} onChange={e=>setForm({...form, resume_url:e.target.value})}/>
      </div>
      <div className="md:col-span-3">
        <button className="btn">Save Profile</button>
      </div>
    </form>
  );
}
