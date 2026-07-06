export interface Job {
  id: number;
  title: string;
  description?: string;
  company_id?: number;
  location?: string;
  salary?: string;
}