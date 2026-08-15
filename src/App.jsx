import { useState, useEffect } from "react";
import { Plus, Search, Trash2, Pencil, Briefcase } from "lucide-react";

const STATUSES = ["Applied", "Interview", "Offer", "Rejected"];
const STATUS_COLOR = {
  Applied: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20",
  Interview: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  Offer: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  Rejected: "bg-red-500/10 text-red-300 border-red-400/20",
};

const EMPTY_FORM = { company: "", title: "", date: "", status: "Applied" };

export default function JobTracker() {
  const [jobs, setJobs] = useState(() => {
    const saved = localStorage.getItem("jobs");
    return saved ? JSON.parse(saved) : [];
  });
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company || !form.title || !form.date) return;

    if (editingId) {
      setJobs(jobs.map((j) => (j.id === editingId ? { ...form, id: editingId } : j)));
      setEditingId(null);
    } else {
      setJobs([...jobs, { ...form, id: Date.now() }]);
    }
    setForm(EMPTY_FORM);
  };

  const startEdit = (job) => {
    setForm({ company: job.company, title: job.title, date: job.date, status: job.status });
    setEditingId(job.id);
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter((j) => j.id !== id));
    if (editingId === id) { setForm(EMPTY_FORM); setEditingId(null); }
  };

  const filtered = jobs.filter((j) => {
    const matchesSearch = (j.company + j.title).toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" || j.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-200 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Briefcase size={22} className="text-cyan-300" /> Job Application Tracker
        </h1>
        <p className="text-slate-400 text-sm mb-6">Track every application in one place.</p>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-2 mb-6">
          <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
            <p className="text-lg font-bold text-white">{jobs.length}</p>
            <p className="text-[10px] text-slate-400">Total</p>
          </div>
          {STATUSES.map((s) => (
            <div key={s} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
              <p className="text-lg font-bold text-white">{jobs.filter((j) => j.status === s).length}</p>
              <p className="text-[10px] text-slate-400">{s}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-3 mb-8 rounded-2xl bg-white/5 border border-white/10 p-5">
          <input
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            placeholder="Company name"
            className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
          />
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Job title"
            className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
          />
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="bg-slate-900/60 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
          >
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <button
            type="submit"
            className="sm:col-span-2 flex items-center justify-center gap-1.5 bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 text-sm font-medium py-2 rounded-lg transition-colors"
          >
            <Plus size={15} /> {editingId ? "Update Application" : "Add Application"}
          </button>
        </form>

        {/* Search + filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex-1 min-w-[180px] relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company or title..."
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-cyan-400/40"
          >
            <option>All</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* List */}
        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="text-center text-slate-500 text-sm py-10">No applications found.</p>
          )}
          {filtered.map((job) => (
            <div key={job.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="min-w-0">
                <p className="text-sm text-white font-medium truncate">{job.title}</p>
                <p className="text-xs text-slate-400 truncate">{job.company} · {job.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[11px] px-2.5 py-1 rounded-full border ${STATUS_COLOR[job.status]}`}>
                  {job.status}
                </span>
                <button onClick={() => startEdit(job)} className="text-slate-400 hover:text-cyan-300 transition-colors">
                  <Pencil size={15} />
                </button>
                <button onClick={() => deleteJob(job.id)} className="text-slate-400 hover:text-red-400 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
