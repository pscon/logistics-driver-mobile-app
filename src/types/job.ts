export type JobPriority = 'standard' | 'express' | 'same-day';

export type JobStatus = 'available' | 'accepted' | 'picked_up' | 'delivered';

export interface JobLocation {
  city: string;
  address: string;
}

export interface Job {
  id: string;
  pickup: JobLocation;
  dropoff: JobLocation;
  priority: JobPriority;
  estimatedDistanceKm: number;
  estimatedDurationMin: number;
  status: JobStatus;
  acceptedAt?: string;
  pickedUpAt?: string;
  deliveredAt?: string;
}

export const ACTIVE_JOB_STATUSES: JobStatus[] = ['accepted', 'picked_up', 'delivered'];

export const STATUS_TRANSITIONS: Record<JobStatus, JobStatus | null> = {
  available: 'accepted',
  accepted: 'picked_up',
  picked_up: 'delivered',
  delivered: null,
};
