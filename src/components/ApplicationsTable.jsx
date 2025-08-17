export default function ApplicationsTable({ applications, jobs, companies }) {
  const jobById = (id) => jobs.find(j => j.job_id === id);
  const companyById = (id) => companies.find(c => c.company_id === id);

  if (!applications.length) {
    return <div className="card p-6 text-center text-gray-500">You have not applied to any jobs yet.</div>;
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Company</th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Job Title</th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600 uppercase tracking-wider">Applied On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.sort((a,b)=>b.applied_at-a.applied_at).map(a=>{
              const job = jobById(a.job_id); const comp = companyById(job.company_id);
              return (
                <tr key={a.application_id} className="hover:bg-gray-50">
                  <td className="p-4 font-medium">{comp?.name}</td>
                  <td className="p-4 text-gray-700">{job?.title}</td>
                  <td className="p-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeCls(a.status)}`}>{a.status}</span></td>
                  <td className="p-4 text-gray-600">{new Date(a.applied_at).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const badgeCls = (s) => ({
  Applied: "bg-blue-100 text-blue-800",
  Shortlisted: "bg-green-100 text-green-800",
  Interviewing: "bg-amber-100 text-amber-800",
  Offered: "bg-red-200 text-red-800",
}[s] || "bg-gray-100 text-gray-700");
