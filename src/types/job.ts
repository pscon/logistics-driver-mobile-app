export type JobPriority = 'standard' | 'express' | 'same-day';

export type JobStatus = 'available' | 'accepted' | 'picked_up' | 'delivered';

export interface JobCoordinates {
  latitude: number;
  longitude: number;
}

export interface JobLocation {
  city: string;
  address: string;
  coordinates: JobCoordinates;
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
