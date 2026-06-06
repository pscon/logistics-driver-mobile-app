import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { JobLocation } from '../types/job';
import { colors, radius, spacing, typography } from '../theme/colors';

interface MapPlaceholderProps {
  pickup: JobLocation;
  dropoff: JobLocation;
}

export function MapPlaceholder({ pickup, dropoff }: MapPlaceholderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.mapSurface}>
        <View style={styles.routeLine} />
        <View style={[styles.pin, styles.pickupPin]}>
          <Ionicons name="location" size={18} color={colors.primary} />
        </View>
        <View style={[styles.pin, styles.dropoffPin]}>
          <Ionicons name="flag" size={16} color={colors.danger} />
        </View>
        <Text style={styles.mapLabel}>Route preview</Text>
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
          <Ionicons name="flag" size={16} color={colors.danger} />
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
  mapSurface: {
    height: 180,
    borderRadius: radius.md,
    backgroundColor: '#E8EEF5',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  routeLine: {
    position: 'absolute',
    width: 3,
    height: '55%',
    backgroundColor: colors.primary,
    borderRadius: 999,
    transform: [{ rotate: '25deg' }],
    opacity: 0.35,
  },
  pin: {
    position: 'absolute',
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  pickupPin: {
    top: 36,
    left: 48,
  },
  dropoffPin: {
    bottom: 36,
    right: 48,
  },
  mapLabel: {
    position: 'absolute',
    bottom: spacing.sm,
    fontSize: typography.caption,
    color: colors.textSecondary,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
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
    fontSize: typography.caption,
    fontWeight: '700',
    color: colors.text,
  },
  legendSubtitle: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
});
