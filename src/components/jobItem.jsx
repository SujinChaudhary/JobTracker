import { Pencil, Trash2 } from "lucide-react";
import { STATUS_COLOR } from "../data/constants";

export default function JobItem({ job, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
      <div className="min-w-0">
        <p className="text-sm text-white font-medium truncate">{job.title}</p>
        <p className="text-xs text-slate-400 truncate">{job.company} · {job.date}</p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[11px] px-2.5 py-1 rounded-full border ${STATUS_COLOR[job.status]}`}>
          {job.status}
        </span>
        <button onClick={() => onEdit(job)} className="text-slate-400 hover:text-cyan-300 transition-colors">
          <Pencil size={15} />
        </button>
        <button onClick={() => onDelete(job.id)} className="text-slate-400 hover:text-red-400 transition-colors">
          <Trash2 size={15} />
        </button>
      </div>
    </div>
  );
}