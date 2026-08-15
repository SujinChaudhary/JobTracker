import { useState } from "react";
import { Briefcase, Upload } from "lucide-react";
import { useJobs } from "../hooks/useJobs";
import { filterJobs, isValidJobForm } from "../services/jobService";
import { EMPTY_FORM } from "../data/constants";
import JobStats from "./JobStats";
import JobForm from "./JobForm";
import JobFilters from "./JobFilters";
import JobList from "./JobList";

// Container layer: owns page-level state (form, search, filter, editing),
// wires the hook + service layer to the presentation components below.
// This is the only component that "knows" how everything connects.

export default function JobTracker() {
  const { jobs, add, update, remove, importJobs, stats } = useJobs();

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        importJobs(event.target.result);
      } catch (err) {
        alert("Invalid JSON file: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = ""; // allow re-uploading the same file later
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidJobForm(form)) return;

    if (editingId) {
      update(editingId, form);
      setEditingId(null);
    } else {
      add(form);
    }
    setForm(EMPTY_FORM);
  };

  const startEdit = (job) => {
    setForm({ company: job.company, title: job.title, date: job.date, status: job.status });
    setEditingId(job.id);
  };

  const handleDelete = (id) => {
    remove(id);
    if (editingId === id) {
      setForm(EMPTY_FORM);
      setEditingId(null);
    }
  };

  const filtered = filterJobs(jobs, { search, status: statusFilter });

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
              <Briefcase size={22} className="text-cyan-300" /> Job Application Tracker
            </h1>
            <p className="text-slate-400 text-sm">Track every application in one place.</p>
          </div>
          
        </div>

        <JobStats stats={stats} />

        <JobForm form={form} setForm={setForm} onSubmit={handleSubmit} isEditing={!!editingId} />

        <JobFilters
          search={search}
          setSearch={setSearch}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        <JobList jobs={filtered} onEdit={startEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
}