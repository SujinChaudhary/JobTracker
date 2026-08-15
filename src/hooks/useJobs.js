import { useState, useEffect } from "react";
import { loadJobs, saveJobs } from "../data/jobStorage";
import * as jobService from "../services/jobService";
import { STATUSES } from "../data/constants";

// Hook layer: the bridge between React and the service layer.
// Components never call jobService or jobStorage directly, they call this hook.

export function useJobs() {
  const [jobs, setJobs] = useState(() => loadJobs());

  useEffect(() => {
    saveJobs(jobs);
  }, [jobs]);

  const add = (formData) => setJobs((prev) => jobService.addJob(prev, formData));
  const update = (id, formData) => setJobs((prev) => jobService.updateJob(prev, id, formData));
  const remove = (id) => setJobs((prev) => jobService.deleteJob(prev, id));
  const stats = jobService.getStats(jobs, STATUSES);

  return { jobs, add, update, remove, stats };
}