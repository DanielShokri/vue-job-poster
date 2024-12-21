import { defineStore } from 'pinia';

type Job = {
    application_deadline: string;
    company: string;
    contact: string;
    created_at: string;
    description: string;
    employment_type: string;
    id: string;
    is_remote_work: number; // Assuming this is a numeric value representing boolean (0 or 1)
    job_category: string;
    location: string;
    number_of_opening: number;
    qualifications: string[]; // This is an array of strings
    salary_from: number;
    salary_to: number;
    title: string;
    updated_at: string;
};

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [] as Job[],
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    getJobById: (state) => (id: string) => {
      return state.jobs.find((job) => job.id === id);
    },
  },
  actions: {
   setJobsData(jobs: Job[]) {
     this.isLoading = false;
     this.error = null;
     this.jobs = jobs;
   }
  },
});
