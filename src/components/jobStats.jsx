import { STATUSES } from "../data/constants";

export default function JobStats({ stats }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-6">
      <div className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
        <p className="text-lg font-bold text-white">{stats.total}</p>
        <p className="text-[10px] text-slate-400">Total</p>
      </div>
      {STATUSES.map((s) => (
        <div key={s} className="rounded-xl bg-white/5 border border-white/10 p-3 text-center">
          <p className="text-lg font-bold text-white">{stats[s]}</p>
          <p className="text-[10px] text-slate-400">{s}</p>
        </div>
      ))}
    </div>
  );
}