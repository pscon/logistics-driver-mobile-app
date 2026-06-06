import { Job } from '../types/job';

export const mockJobs: Job[] = [
  {
    id: 'job-001',
    pickup: {
      city: 'San Francisco',
      address: '450 Mission St, Suite 200',
      coordinates: { latitude: 37.7897, longitude: -122.3972 },
    },
    dropoff: {
      city: 'Oakland',
      address: '1200 Broadway, Floor 3',
      coordinates: { latitude: 37.8044, longitude: -122.2712 },
    },
    priority: 'express',
    estimatedDistanceKm: 18.4,
    estimatedDurationMin: 35,
    status: 'available',
  },
  {
    id: 'job-002',
    pickup: {
      city: 'San Jose',
      address: '88 S 4th St',
      coordinates: { latitude: 37.335, longitude: -121.8877 },
    },
    dropoff: {
      city: 'Palo Alto',
      address: '340 University Ave',
      coordinates: { latitude: 37.4452, longitude: -122.1637 },
    },
    priority: 'standard',
    estimatedDistanceKm: 24.1,
    estimatedDurationMin: 42,
    status: 'available',
  },
  {
    id: 'job-003',
    pickup: {
      city: 'Berkeley',
      address: '2120 Oxford St',
      coordinates: { latitude: 37.8716, longitude: -122.2664 },
    },
    dropoff: {
      city: 'Richmond',
      address: '5800 Cutting Blvd',
      coordinates: { latitude: 37.9358, longitude: -122.3478 },
    },
    priority: 'same-day',
    estimatedDistanceKm: 12.7,
    estimatedDurationMin: 28,
    status: 'available',
  },
  {
    id: 'job-004',
    pickup: {
      city: 'Sacramento',
      address: '980 9th St',
      coordinates: { latitude: 38.5816, longitude: -121.4944 },
    },
    dropoff: {
      city: 'Davis',
      address: '501 G St',
      coordinates: { latitude: 38.5449, longitude: -121.7405 },
    },
    priority: 'standard',
    estimatedDistanceKm: 22.3,
    estimatedDurationMin: 38,
    status: 'available',
  },
  {
    id: 'job-005',
    pickup: {
      city: 'Fremont',
      address: '3900 Civic Center Dr',
      coordinates: { latitude: 37.5485, longitude: -121.9886 },
    },
    dropoff: {
      city: 'Hayward',
      address: '777 B St',
      coordinates: { latitude: 37.674, longitude: -122.081 },
    },
    priority: 'express',
    estimatedDistanceKm: 15.9,
    estimatedDurationMin: 30,
    status: 'available',
  },
  {
    id: 'job-006',
    pickup: {
      city: 'Santa Clara',
      address: '1500 Warburton Ave',
      coordinates: { latitude: 37.352, longitude: -121.9552 },
    },
    dropoff: {
      city: 'Sunnyvale',
      address: '200 W Evelyn Ave',
      coordinates: { latitude: 37.3785, longitude: -122.0308 },
    },
    priority: 'same-day',
    estimatedDistanceKm: 8.2,
    estimatedDurationMin: 18,
    status: 'available',
  },
  {
    id: 'job-007',
    pickup: {
      city: 'Walnut Creek',
      address: '1646 N California Blvd',
      coordinates: { latitude: 37.9106, longitude: -122.0668 },
    },
    dropoff: {
      city: 'Concord',
      address: '1950 Parkside Dr',
      coordinates: { latitude: 37.978, longitude: -122.0311 },
    },
    priority: 'standard',
    estimatedDistanceKm: 11.5,
    estimatedDurationMin: 22,
    status: 'available',
  },
  {
    id: 'job-008',
    pickup: {
      city: 'San Mateo',
      address: '400 Concar Dr',
      coordinates: { latitude: 37.563, longitude: -122.3255 },
    },
    dropoff: {
      city: 'Redwood City',
      address: '2600 Bridgepointe Pkwy',
      coordinates: { latitude: 37.542, longitude: -122.298 },
    },
    priority: 'express',
    estimatedDistanceKm: 14.6,
    estimatedDurationMin: 27,
    status: 'available',
  },
  {
    id: 'job-009',
    pickup: {
      city: 'Mountain View',
      address: '800 West El Camino Real',
      coordinates: { latitude: 37.3861, longitude: -122.0839 },
    },
    dropoff: {
      city: 'Los Altos',
      address: '200 Main St',
      coordinates: { latitude: 37.3791, longitude: -122.1147 },
    },
    priority: 'standard',
    estimatedDistanceKm: 6.8,
    estimatedDurationMin: 15,
    status: 'available',
  },
  {
    id: 'job-010',
    pickup: {
      city: 'Milpitas',
      address: '1601 S Main St',
      coordinates: { latitude: 37.428, longitude: -121.9066 },
    },
    dropoff: {
      city: 'San Jose',
      address: '170 S Market St',
      coordinates: { latitude: 37.3327, longitude: -121.8907 },
    },
    priority: 'same-day',
    estimatedDistanceKm: 9.4,
    estimatedDurationMin: 20,
    status: 'available',
  },
];
