// Data layer: the ONLY file in this project allowed to touch localStorage directly.
// Every other layer talks to jobs through this file, never through localStorage itself.

const STORAGE_KEY = "jobs";

export function loadJobs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveJobs(jobs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}