import { mockJobs } from '../data/mockJobs';
import { Job, JobStatus } from '../types/job';

const LATENCY_MS = 300;

let jobsDatabase: Job[] = mockJobs.map((job) => ({ ...job }));

const delay = (ms: number = LATENCY_MS) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const cloneJobs = (): Job[] => jobsDatabase.map((job) => ({ ...job }));

export const resetJobsDatabase = (): void => {
  jobsDatabase = mockJobs.map((job) => ({ ...job }));
};

export async function fetchAvailableJobs(): Promise<Job[]> {
  await delay();
  return cloneJobs().filter((job) => job.status === 'available');
}

export async function fetchMyJobs(): Promise<Job[]> {
  await delay();
  return cloneJobs().filter((job) =>
    job.status === 'accepted' || job.status === 'picked_up' || job.status === 'delivered',
  );
}

export async function fetchJobById(jobId: string): Promise<Job | null> {
  await delay();
  const job = jobsDatabase.find((item) => item.id === jobId);
  return job ? { ...job } : null;
}

export async function acceptJob(jobId: string): Promise<Job> {
  await delay();
  const index = jobsDatabase.findIndex((job) => job.id === jobId);

  if (index === -1) {
    throw new Error('Job not found');
  }

  const job = jobsDatabase[index];

  if (job.status !== 'available') {
    throw new Error('Job is no longer available');
  }

  const updatedJob: Job = {
    ...job,
    status: 'accepted',
    acceptedAt: new Date().toISOString(),
  };

  jobsDatabase[index] = updatedJob;
  return { ...updatedJob };
}

export async function updateJobStatus(jobId: string, status: JobStatus): Promise<Job> {
  await delay();
  const index = jobsDatabase.findIndex((job) => job.id === jobId);

  if (index === -1) {
    throw new Error('Job not found');
  }

  const job = jobsDatabase[index];
  const now = new Date().toISOString();

  if (status === 'picked_up' && job.status !== 'accepted') {
    throw new Error('Job must be accepted before pickup');
  }

  if (status === 'delivered' && job.status !== 'picked_up') {
    throw new Error('Job must be picked up before delivery');
  }

  const updatedJob: Job = {
    ...job,
    status,
    pickedUpAt: status === 'picked_up' ? now : job.pickedUpAt,
    deliveredAt: status === 'delivered' ? now : job.deliveredAt,
  };

  jobsDatabase[index] = updatedJob;
  return { ...updatedJob };
}
