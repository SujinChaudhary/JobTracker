import { Search } from "lucide-react";
import { STATUSES } from "../data/constants";

export default function JobFilters({ search, setSearch, statusFilter, setStatusFilter }) {
  return (
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
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
}