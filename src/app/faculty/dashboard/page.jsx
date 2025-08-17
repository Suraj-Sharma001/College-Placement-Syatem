"use client";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import { COMPANIES, JOBS, APPLICATIONS, STUDENTS } from "@/lib/mock";
import { companyById, eligible, readLocal, saveLocal, uid } from "@/lib/utils";

const KEY_JOBS = "jobs";
const KEY_APPS = "applications";
const KEY_STUDENTS = "students";

export default function FacultyDashboardPage() {
  const [jobs, setJobs] = useState(readLocal(KEY_JOBS, JOBS));
  const [apps, setApps] = useState(readLocal(KEY_APPS, APPLICATIONS));
  const [students, setStudents] = useState(readLocal(KEY_STUDENTS, STUDENTS));
  const [form, setForm] = useState({ company_id: 101, title: "", description: "", package_lpa: "", required_cgpa: "", required_branch: "", location: "" });
  const [expandedJob, setExpandedJob] = useState(null);

  useEffect(()=>saveLocal(KEY_JOBS, jobs), [jobs]);
  useEffect(()=>saveLocal(KEY_APPS, apps), [apps]);
  useEffect(()=>saveLocal(KEY_STUDENTS, students), [students]);

  const postJob = (e) => {
    e.preventDefault();
    const job_id = uid();
    const job = {
      job_id,
      company_id: Number(form.company_id),
      title: form.title,
      description: form.description,
      package_lpa: Number(form.package_lpa),
      required_cgpa: Number(form.required_cgpa),
      required_branch: form.required_branch || null,
      location: form.location,
      created_at: Date.now(),
    };
    setJobs([job, ...jobs]);
    setForm({ company_id: 101, title: "", description: "", package_lpa: "", required_cgpa: "", required_branch: "", location: "" });
  };

  const updateAppStatus = (application_id, status) => {
    setApps(apps.map(a => a.application_id === application_id ? { ...a, status } : a));
  };

  const eligibleByJob = (job) => students.filter(s => eligible(s, job));

  const appsByJob = useMemo(() => {
    const map = new Map();
    apps.forEach(a => {
      const arr = map.get(a.job_id) || [];
      arr.push(a);
      map.set(a.job_id, arr);
    });
    return map;
  }, [apps]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 space-y-10">
        <section className="card p-6">
          <h2 className="section-title">Post a Job</h2>
          <form onSubmit={postJob} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="border rounded-lg p-2" value={form.company_id} onChange={e=>setForm({...form, company_id:e.target.value})}>
              {COMPANIES.map(c => <option key={c.company_id} value={c.company_id}>{c.name}</option>)}
            </select>
            <input className="border rounded-lg p-2" placeholder="Job Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required />
            <input className="border rounded-lg p-2" placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} required />
            <input className="border rounded-lg p-2 md:col-span-3" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} required />
            <input className="border rounded-lg p-2" type="number" step="0.1" placeholder="Package (LPA)" value={form.package_lpa} onChange={e=>setForm({...form, package_lpa:e.target.value})} required />
            <input className="border rounded-lg p-2" type="number" step="0.1" placeholder="Required CGPA" value={form.required_cgpa} onChange={e=>setForm({...form, required_cgpa:e.target.value})} required />
            <input className="border rounded-lg p-2" placeholder="Required Branch (or Any)" value={form.required_branch} onChange={e=>setForm({...form, required_branch:e.target.value})} />
            <button className="btn md:col-span-3">Post Job</button>
          </form>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Jobs & Applications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.sort((a,b)=>b.created_at-a.created_at).map(job=>{
              const comp = companyById(COMPANIES, job.company_id);
              const related = appsByJob.get(job.job_id) || [];
              return (
                <div key={job.job_id} className="card p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-600">{comp?.name}</p>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <p className="text-gray-600 text-sm">{job.location} • {job.package_lpa} LPA • CGPA {job.required_cgpa}+ • Branch {job.required_branch || "Any"}</p>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100" onClick={()=>setExpandedJob(expandedJob===job.job_id?null:job.job_id)}>
                      {expandedJob===job.job_id ? "Hide" : "Manage"}
                    </button>
                  </div>

                  {expandedJob===job.job_id && (
                    <div className="mt-4 grid gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Eligible Students</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {eligibleByJob(job).map(s=>(
                            <div key={s.student_id} className="p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                              <div>
                                <p className="font-medium">{s.first_name} {s.last_name}</p>
                                <p className="text-xs text-gray-600">{s.branch} • CGPA {s.cgpa}</p>
                              </div>
                              <button className="px-2 py-1 text-xs rounded bg-indigo-600 text-white"
                                onClick={()=>{
                                  // quick-create application if none
                                  const exists = related.some(a=>a.student_id===s.student_id);
                                  if (!exists) {
                                    setApps([{ application_id: uid(), student_id: s.student_id, job_id: job.job_id, status: "Shortlisted", applied_at: Date.now() }, ...apps]);
                                  }
                                }}>
                                Shortlist
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Applications</h4>
                        <div className="space-y-2">
                          {related.length ? related.map(a=>{
                            const st = students.find(x=>x.student_id===a.student_id);
                            return (
                              <div key={a.application_id} className="p-3 rounded-lg bg-gray-50 flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{st?.first_name} {st?.last_name}</p>
                                  <p className="text-xs text-gray-600">Status: {a.status}</p>
                                </div>
                                <div className="flex gap-2">
                                  {["Applied","Shortlisted","Interviewing","Offered"].map(s=>(
                                    <button key={s} className={`px-2 py-1 text-xs rounded ${a.status===s?"bg-gray-900 text-white":"bg-white border"}`} onClick={()=>updateAppStatus(a.application_id, s)}>{s}</button>
                                  ))}
                                </div>
                              </div>
                            );
                          }) : <p className="text-sm text-gray-500">No applications yet.</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
