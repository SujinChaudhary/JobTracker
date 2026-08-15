import JobItem from "./JobItem";

export default function JobList({ jobs, onEdit, onDelete }) {
  if (jobs.length === 0) {
    return <p className="text-center text-slate-500 text-sm py-10">No applications found.</p>;
  }

  return (
    <div className="space-y-2">
      {jobs.map((job) => (
        <JobItem key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}