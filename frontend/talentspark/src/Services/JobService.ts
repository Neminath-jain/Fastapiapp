import axios from "axios";
import type { Job } from "../types/job";

const API_BASE_URL = "http://localhost:8000";

const authHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export async function getJobs(token: string): Promise<Job[]> {
  const resp = await axios.get<Job[]>(`${API_BASE_URL}/job`, authHeaders(token));
  return resp.data;
}

export async function createJob(job: Job, token: string): Promise<Job> {
  const resp = await axios.post<Job>(`${API_BASE_URL}/job`, job, authHeaders(token));
  return resp.data;
}

export async function updateJob(id: number, job: Job, token: string): Promise<Job> {
  const resp = await axios.put<Job>(`${API_BASE_URL}/job/${id}`, job, authHeaders(token));
  return resp.data;
}

export async function deleteJob(id: number, token: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/job/${id}`, authHeaders(token));
}