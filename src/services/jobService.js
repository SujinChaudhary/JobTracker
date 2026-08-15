// Service layer: pure business logic. No React, no localStorage, no UI.
// Every function here takes data in, returns new data out. Fully testable
// on its own, with plain JavaScript, no browser or React needed.

export function addJob(jobs, formData) {
  return [...jobs, { ...formData, id: Date.now() }];
}

export function updateJob(jobs, id, formData) {
  return jobs.map((job) => (job.id === id ? { ...formData, id } : job));
}

export function deleteJob(jobs, id) {
  return jobs.filter((job) => job.id !== id);
}

export function filterJobs(jobs, { search, status }) {
  return jobs.filter((job) => {
    const matchesSearch = (job.company + job.title)
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus = status === "All" || job.status === status;
    return matchesSearch && matchesStatus;
  });
}

export function getStats(jobs, statuses) {
  const stats = { total: jobs.length };
  statuses.forEach((status) => {
    stats[status] = jobs.filter((job) => job.status === status).length;
  });
  return stats;
}

export function isValidJobForm(formData) {
  return Boolean(formData.company && formData.title && formData.date);
}