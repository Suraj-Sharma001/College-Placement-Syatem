"use client";
export const dynamic = 'force-dynamic';

import { useMemo, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import ApplicationsTable from "@/components/ApplicationsTable";
import ProfileEditor from "@/components/ProfileEditor";
import { companyById, eligible, readLocal, saveLocal, uid } from "@/lib/utils";
import { COMPANIES, JOBS, APPLICATIONS } from "@/lib/mock";
import { getCurrentStudent } from "@/lib/auth";

const KEY_JOBS = "jobs";
const KEY_APPS = "applications";

export default function StudentDashboardPage() {
  const student = getCurrentStudent();
  const [jobs, setJobs] = useState(readLocal(KEY_JOBS, JOBS));
  const [apps, setApps] = useState(readLocal(KEY_APPS, APPLICATIONS));
  const [filters, setFilters] = useState({ q: "", location: "", branch: "", minPackage: "" });

  useEffect(()=>saveLocal(KEY_JOBS, jobs), [jobs]);
  useEffect(()=>saveLocal(KEY_APPS, apps), [apps]);

  const appliedIds = useMemo(()=> new Set(apps.filter(a=>a.student_id===student?.student_id).map(a=>a.job_id)), [apps, student]);

  const filtered = useMemo(()=> {
    const q = filters.q.toLowerCase();
    return jobs.slice().sort((a,b)=>b.created_at-a.created_at).filter(j=>{
      const comp = companyById(COMPANIES, j.company_id)?.name?.toLowerCase() || "";
      const text = `${j.title} ${comp} ${j.description}`.toLowerCase();
      const qOk = !q || text.includes(q);
      const locOk = !filters.location || j.location.toLowerCase().includes(filters.location.toLowerCase());
      const brOk = !filters.branch || (j.required_branch || "any").toLowerCase().includes(filters.branch.toLowerCase());
      const pkgOk = !filters.minPackage || j.package_lpa >= Number(filters.minPackage);
      return qOk && locOk && brOk && pkgOk;
    });
  }, [jobs, filters]);

  const apply = (job_id) => {
    if (appliedIds.has(job_id)) return;
    const job = jobs.find(j=>j.job_id===job_id);
    if (!eligible(student, job)) return;
    setApps([{ application_id: uid(), student_id: student.student_id, job_id, status: "Applied", applied_at: Date.now() }, ...apps]);
  };

  const updateProfile = (patch) => {
    // Persist a minimal profile override (simple demo)
    const KEY_STUDENT_PATCH = `student_patch_${student.student_id}`;
    const updated = { ...student, ...patch };
    localStorage.setItem(KEY_STUDENT_PATCH, JSON.stringify(updated));
    location.reload(); // quick refresh to reflect currentStudent derived from localStorage in a real app you'd manage state centrally
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 md:p-8 space-y-10">
        <section className="card p-6">
          <h2 className="section-title">My Profile</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Field label="Name" value={`${student.first_name} ${student.last_name}`} />
            <Field label="Course" value={student.course} />
            <Field label="Branch" value={student.branch} />
            <Field label="CGPA" value={student.cgpa.toFixed(2)} />
            <div>
              <label className="block text-sm text-gray-500 mb-1">Resume</label>
              {student.resume_url ? <a className="text-indigo-600 font-semibold underline" href={student.resume_url} target="_blank">View</a> : <span className="text-gray-500">Not uploaded</span>}
            </div>
          </div>
          <ProfileEditor student={student} onUpdate={updateProfile} />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">My Application Status</h2>
          <ApplicationsTable applications={apps.filter(a=>a.student_id===student.student_id)} jobs={jobs} companies={COMPANIES} />
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Job Postings</h2>
          <Filters filters={filters} setFilters={setFilters} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(job=>{
              const comp = companyById(COMPANIES, job.company_id);
              const ok = eligible(student, job);
              const applied = appliedIds.has(job.job_id);
              return <JobCard key={job.job_id} job={job} company={comp} eligible={ok} applied={applied} onApply={()=>apply(job.job_id)} />;
            })}
          </div>
        </section>
      </div>
    </>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-lg">{value}</p>
    </div>
  );
}

function Filters({ filters, setFilters }) {
  return (
    <div className="card p-4 mb-6 grid grid-cols-1 md:grid-cols-4 gap-3">
      <input className="border rounded-lg p-2" placeholder="Search" value={filters.q} onChange={e=>setFilters({...filters, q:e.target.value})}/>
      <input className="border rounded-lg p-2" placeholder="Location" value={filters.location} onChange={e=>setFilters({...filters, location:e.target.value})}/>
      <input className="border rounded-lg p-2" placeholder="Branch (e.g., Computer Science)" value={filters.branch} onChange={e=>setFilters({...filters, branch:e.target.value})}/>
      <input className="border rounded-lg p-2" type="number" placeholder="Min Package (LPA)" value={filters.minPackage} onChange={e=>setFilters({...filters, minPackage:e.target.value})}/>
    </div>
  );
}
