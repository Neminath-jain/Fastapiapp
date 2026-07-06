import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import Footer from "./components/Footer";
import Login from "./pages/login";
import ChatPage from "./pages/chat";
import {
  getCompanies,
  updateCompany,
  deleteCompany,
  createCompany,
} from "./Services/CompanyService";
import { getJobs, createJob, updateJob, deleteJob } from "./Services/JobService";
import type { Company } from "./types/company";
import type { Job } from "./types/job";

function App() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);

  async function fetchCompanies() {
    if (!token) return;
    setLoading(true);
    try {
      const companies = await getCompanies(token);
      setCompanies(companies);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }

  async function fetchJobs() {
    if (!token) return;
    try {
      const data = await getJobs(token);
      setJobs(data);
    } catch (err: unknown) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchCompanies();
    fetchJobs();
  }, [token]);

  async function handleEdit(company: Company) {
    try {
      const updatedCompany = await updateCompany(company.id, company, token!);
      setCompanies(companies.map((item) => (item.id === updatedCompany.id ? updatedCompany : item)));
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteCompany(id, token!);
      setCompanies(companies.filter((company) => company.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async function handleAdd(company: Company) {
    try {
      const newCompany = await createCompany(company, token!);
      setCompanies([...companies, newCompany]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async function handleJobAdd(job: Job) {
    try {
      const newJob = await createJob(job, token!);
      setJobs([...jobs, newJob]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async function handleJobEdit(job: Job) {
    try {
      const updated = await updateJob(job.id, job, token!);
      setJobs(jobs.map((j) => (j.id === updated.id ? updated : j)));
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  async function handleJobDelete(id: number) {
    try {
      await deleteJob(id, token!);
      setJobs(jobs.filter((j) => j.id !== id));
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }

  const handleLogin = (newToken: string) => {
    setToken(newToken);
    setError(null);
  };

  const handleLogout = () => {
    setToken(null);
    setCompanies([]);
    setJobs([]);
    setError(null);
  };

  if (!token) {
    return <Login onLogin={handleLogin} />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <NavBar />
      <button onClick={handleLogout}>Logout</button>
      <br />
      <CompanyCard companies={companies} onedit={handleEdit} ondelete={handleDelete} onadd={handleAdd} />
      <ChatPage />
      <JobCard jobs={jobs} onAdd={handleJobAdd} onEdit={handleJobEdit} onDelete={handleJobDelete} />
      <Footer />
    </>
  );
}

export default App;