import { JobPriority, JobStatus } from '../types/job';

export function formatDistance(km: number): string {
  return `${km.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatPriority(priority: JobPriority): string {
  switch (priority) {
    case 'standard':
      return 'Standard';
    case 'express':
      return 'Express';
    case 'same-day':
      return 'Same-day';
  }
}

export function formatStatus(status: JobStatus): string {
  switch (status) {
    case 'available':
      return 'Available';
    case 'accepted':
      return 'Accepted';
    case 'picked_up':
      return 'Picked Up';
    case 'delivered':
      return 'Delivered';
  }
}

export function formatJobId(jobId: string): string {
  return jobId.replace('job-', '#').toUpperCase();
}

export function formatTimestamp(isoString?: string): string {
  if (!isoString) {
    return '—';
  }

  return new Date(isoString).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function getNextStatusAction(status: JobStatus): string | null {
  switch (status) {
    case 'accepted':
      return 'Confirm Pickup';
    case 'picked_up':
      return 'Confirm Delivery';
    default:
      return null;
  }
}

export function getNextStatus(status: JobStatus): JobStatus | null {
  switch (status) {
    case 'accepted':
      return 'picked_up';
    case 'picked_up':
      return 'delivered';
    default:
      return null;
  }
}
