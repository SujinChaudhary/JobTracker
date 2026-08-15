import { Plus } from "lucide-react";
import { STATUSES } from "../data/constants";

export default function JobForm({ form, setForm, onSubmit, isEditing }) {
  return (
    <form
      onSubmit={onSubmit}
      className="grid sm:grid-cols-2 gap-3 mb-8 rounded-2xl bg-white/5 border border-white/10 p-5"
    >
      <input
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        placeholder="Company name"
        className="InputDataField"
      />
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Job title"
        className="InputDataField"
      />
      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="InputDataField"
      />
      <select
        value={form.status}
        onChange={(e) => setForm({ ...form, status: e.target.value })}
        className="InputDataField"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <button
        type="submit"
        className="sm:col-span-2 flex items-center justify-center gap-1.5 bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 text-sm font-medium py-2 rounded-lg transition-colors"
      >
        <Plus size={15} /> {isEditing ? "Update Application" : "Add Application"}
      </button>
    </form>
  );
}