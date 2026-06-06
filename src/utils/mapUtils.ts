import { JobCoordinates, JobLocation } from '../types/job';

export function getRouteRegion(pickup: JobCoordinates, dropoff: JobCoordinates) {
  const minLat = Math.min(pickup.latitude, dropoff.latitude);
  const maxLat = Math.max(pickup.latitude, dropoff.latitude);
  const minLng = Math.min(pickup.longitude, dropoff.longitude);
  const maxLng = Math.max(pickup.longitude, dropoff.longitude);

  const latitudeDelta = Math.max((maxLat - minLat) * 1.6, 0.08);
  const longitudeDelta = Math.max((maxLng - minLng) * 1.6, 0.08);

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta,
    longitudeDelta,
  };
}

export function getRouteCoordinates(pickup: JobLocation, dropoff: JobLocation) {
  return [pickup.coordinates, dropoff.coordinates];
}
