import type { Job } from './job';
interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobs: Job[];
}
export type { Company };