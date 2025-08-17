export default function JobCard({ job, company, eligible, applied, onApply }) {
  return (
    <div className={`card p-6 flex flex-col ${!eligible && !applied ? "opacity-60 bg-gray-50" : ""}`}>
      <div className="flex-grow">
        <p className="text-sm font-semibold text-indigo-600">{company?.name}</p>
        <h3 className="text-xl font-bold text-gray-900 mt-1 mb-2">{job.title}</h3>
        <div className="flex flex-wrap items-center text-gray-500 text-sm mb-4 gap-x-4 gap-y-1">
          <span>📍 {job.location}</span>
          <span>🎓 CGPA: {job.required_cgpa}+</span>
          <span>💼 Branch: {job.required_branch || "Any"}</span>
        </div>
        <p className="text-gray-600 mb-4">{job.description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <p className="text-lg font-bold text-green-600">{job.package_lpa} LPA</p>
        {applied ? (
          <button disabled className="btn-muted">Applied</button>
        ) : eligible ? (
          <button className="btn" onClick={onApply}>Apply Now</button>
        ) : (
          <button disabled className="btn-muted">Not Eligible</button>
        )}
      </div>
    </div>
  );
}
