import { create } from 'zustand';

import {
  acceptJob as acceptJobApi,
  fetchAvailableJobs,
  fetchJobById,
  fetchMyJobs,
  updateJobStatus as updateJobStatusApi,
} from '../services/jobsApi';
import { Job, JobStatus } from '../types/job';
import { getNextStatus } from '../utils/formatters';

interface JobsState {
  jobs: Job[];
  isLoading: boolean;
  isRefreshing: boolean;
  actionJobId: string | null;
  error: string | null;
  loadJobs: () => Promise<void>;
  refreshJobs: () => Promise<void>;
  acceptJob: (jobId: string) => Promise<void>;
  advanceJobStatus: (jobId: string) => Promise<void>;
  getJobById: (jobId: string) => Job | undefined;
  clearError: () => void;
}

const mergeJob = (jobs: Job[], updatedJob: Job): Job[] =>
  jobs.map((job) => (job.id === updatedJob.id ? updatedJob : job));

export const useJobsStore = create<JobsState>((set, get) => ({
  jobs: [],
  isLoading: false,
  isRefreshing: false,
  actionJobId: null,
  error: null,

  loadJobs: async () => {
    set({ isLoading: true, error: null });

    try {
      const [availableJobs, myJobs] = await Promise.all([
        fetchAvailableJobs(),
        fetchMyJobs(),
      ]);

      const jobMap = new Map<string, Job>();
      [...availableJobs, ...myJobs].forEach((job) => {
        jobMap.set(job.id, job);
      });

      set({ jobs: Array.from(jobMap.values()), isLoading: false });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to load jobs',
      });
    }
  },

  refreshJobs: async () => {
    set({ isRefreshing: true, error: null });

    try {
      const [availableJobs, myJobs] = await Promise.all([
        fetchAvailableJobs(),
        fetchMyJobs(),
      ]);

      const jobMap = new Map<string, Job>();
      [...availableJobs, ...myJobs].forEach((job) => {
        jobMap.set(job.id, job);
      });

      set({ jobs: Array.from(jobMap.values()), isRefreshing: false });
    } catch (error) {
      set({
        isRefreshing: false,
        error: error instanceof Error ? error.message : 'Failed to refresh jobs',
      });
    }
  },

  acceptJob: async (jobId: string) => {
    const existingJob = get().jobs.find((job) => job.id === jobId);

    if (!existingJob) {
      set({ error: 'Job not found' });
      return;
    }

    if (existingJob.status !== 'available') {
      set({ error: 'Job is no longer available' });
      return;
    }

    set({ actionJobId: jobId, error: null });

    try {
      const updatedJob = await acceptJobApi(jobId);
      set((state) => ({
        jobs: mergeJob(state.jobs, updatedJob),
        actionJobId: null,
      }));
    } catch (error) {
      set({
        actionJobId: null,
        error: error instanceof Error ? error.message : 'Failed to accept job',
      });
    }
  },

  advanceJobStatus: async (jobId: string) => {
    const existingJob = get().jobs.find((job) => job.id === jobId);

    if (!existingJob) {
      set({ error: 'Job not found' });
      return;
    }

    const nextStatus = getNextStatus(existingJob.status);

    if (!nextStatus) {
      set({ error: 'Invalid status transition' });
      return;
    }

    set({ actionJobId: jobId, error: null });

    try {
      const updatedJob = await updateJobStatusApi(jobId, nextStatus);
      set((state) => ({
        jobs: mergeJob(state.jobs, updatedJob),
        actionJobId: null,
      }));
    } catch (error) {
      set({
        actionJobId: null,
        error:
          error instanceof Error ? error.message : 'Failed to update job status',
      });
    }
  },

  getJobById: (jobId: string) => get().jobs.find((job) => job.id === jobId),

  clearError: () => set({ error: null }),
}));

export async function hydrateJobById(jobId: string): Promise<Job | null> {
  return fetchJobById(jobId);
}

export function selectAvailableJobs(jobs: Job[]): Job[] {
  return jobs.filter((job) => job.status === 'available');
}

export function selectMyJobs(jobs: Job[]): Job[] {
  return jobs.filter(
    (job) =>
      job.status === 'accepted' ||
      job.status === 'picked_up' ||
      job.status === 'delivered',
  );
}

export type { JobStatus };
