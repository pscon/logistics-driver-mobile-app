import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';

import { JobLocation } from '../types/job';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import { getRouteCoordinates, getRouteRegion } from '../utils/mapUtils';

interface JobRouteMapProps {
  pickup: JobLocation;
  dropoff: JobLocation;
}

export function JobRouteMap({ pickup, dropoff }: JobRouteMapProps) {
  const region = getRouteRegion(pickup.coordinates, dropoff.coordinates);
  const routeCoordinates = getRouteCoordinates(pickup, dropoff);

  return (
    <View style={styles.container}>
      <View style={styles.mapWrap}>
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={region}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          toolbarEnabled={false}
          loadingEnabled
        >
          <Polyline
            coordinates={routeCoordinates}
            strokeColor={colors.primary}
            strokeWidth={3}
          />
          <Marker
            coordinate={pickup.coordinates}
            title="Pickup"
            description={`${pickup.city} · ${pickup.address}`}
            pinColor={colors.primary}
          />
          <Marker
            coordinate={dropoff.coordinates}
            title="Drop-off"
            description={`${dropoff.city} · ${dropoff.address}`}
            pinColor="#DC2626"
          />
        </MapView>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <Ionicons name="location" size={16} color={colors.primary} />
          <View style={styles.legendText}>
            <Text style={styles.legendTitle}>Pickup</Text>
            <Text style={styles.legendSubtitle}>
              {pickup.city} · {pickup.address}
            </Text>
          </View>
        </View>
        <View style={styles.legendItem}>
          <Ionicons name="flag" size={16} color={colors.textSecondary} />
          <View style={styles.legendText}>
            <Text style={styles.legendTitle}>Drop-off</Text>
            <Text style={styles.legendSubtitle}>
              {dropoff.city} · {dropoff.address}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  mapWrap: {
    height: 220,
    borderRadius: radius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
  legend: {
    gap: spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  legendText: {
    flex: 1,
    gap: 2,
  },
  legendTitle: {
    ...fontStyle('bold'),
    fontSize: typography.caption,
    color: colors.text,
  },
  legendSubtitle: {
    ...fontStyle('regular'),
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
});
