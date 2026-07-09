import axios from "axios";
import type { Company } from "../types/company";

const API_BASE_URL = "http://localhost:8000";

const authHeaders = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export async function getCompanies(token: string): Promise<Company[]> {
  const response = await axios.get<Company[]>(`${API_BASE_URL}/company/`, authHeaders(token));
  return response.data;
}

export async function getCompany(id: number, token: string): Promise<Company> {
  const response = await axios.get<Company>(`${API_BASE_URL}/company/${id}/`, authHeaders(token));
  return response.data;
}

export async function createCompany(company: Company, token: string): Promise<Company> {
  const response = await axios.post<Company>(`${API_BASE_URL}/company/`, company, authHeaders(token));
  return response.data;
}

export async function updateCompany(
  id: number,
  company: Company,
  token: string
): Promise<Company> {
  const response = await axios.put<Company>(`${API_BASE_URL}/company/${id}/`, company, authHeaders(token));
  return response.data;
}

export async function deleteCompany(id: number, token: string): Promise<void> {
  await axios.delete(`${API_BASE_URL}/company/${id}/`, authHeaders(token));
}