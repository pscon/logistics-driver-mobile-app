import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Job } from '../types/job';
import { colors, radius, shadows, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import {
  formatDistance,
  formatDuration,
  formatJobId,
  getNextStatusAction,
} from '../utils/formatters';
import { PriorityBadge } from './PriorityBadge';
import { StatusBadge } from './StatusBadge';

interface JobCardProps {
  job: Job;
  variant: 'feed' | 'myJobs';
  isActionLoading?: boolean;
  onPress: () => void;
  onAccept?: () => void;
  onAdvanceStatus?: () => void;
}

function LocationRow({
  type,
  city,
  address,
}: {
  type: 'pickup' | 'dropoff';
  city: string;
  address: string;
}) {
  const isPickup = type === 'pickup';

  return (
    <View style={styles.locationRow}>
      <View
        style={[
          styles.locationIconWrap,
          isPickup ? styles.pickupIconWrap : styles.dropoffIconWrap,
        ]}
      >
        <Ionicons
          name={isPickup ? 'location' : 'flag'}
          size={16}
          color={isPickup ? colors.primary : colors.textSecondary}
        />
      </View>
      <View style={styles.locationText}>
        <Text style={styles.locationLabel}>{isPickup ? 'Pickup' : 'Drop-off'}</Text>
        <Text style={styles.locationCity}>{city}</Text>
        <Text style={styles.locationAddress}>{address}</Text>
      </View>
    </View>
  );
}

export function JobCard({
  job,
  variant,
  isActionLoading = false,
  onPress,
  onAccept,
  onAdvanceStatus,
}: JobCardProps) {
  const nextAction = getNextStatusAction(job.status);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardBody}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.jobId}>{formatJobId(job.id)}</Text>
            {variant === 'myJobs' ? <StatusBadge status={job.status} /> : null}
          </View>
          <PriorityBadge priority={job.priority} />
        </View>

        <View style={styles.routeContent}>
          <LocationRow
            type="pickup"
            city={job.pickup.city}
            address={job.pickup.address}
          />
          <LocationRow
            type="dropoff"
            city={job.dropoff.city}
            address={job.dropoff.address}
          />
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="navigate-outline" size={15} color={colors.primary} />
            <Text style={styles.metaText}>{formatDistance(job.estimatedDistanceKm)}</Text>
          </View>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={15} color={colors.primary} />
            <Text style={styles.metaText}>{formatDuration(job.estimatedDurationMin)}</Text>
          </View>
        </View>

        {variant === 'feed' && onAccept ? (
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onAccept();
            }}
            disabled={isActionLoading}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
              isActionLoading && styles.buttonDisabled,
            ]}
          >
            {isActionLoading ? (
              <ActivityIndicator color={colors.surface} />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>Accept Job</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.surface} />
              </>
            )}
          </Pressable>
        ) : null}

        {variant === 'myJobs' && nextAction && onAdvanceStatus ? (
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              onAdvanceStatus();
            }}
            disabled={isActionLoading}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.primaryButtonPressed,
              isActionLoading && styles.buttonDisabled,
            ]}
          >
            {isActionLoading ? (
              <ActivityIndicator color={colors.surface} />
            ) : (
              <>
                <Text style={styles.primaryButtonText}>{nextAction}</Text>
                <Ionicons name="arrow-forward" size={18} color={colors.surface} />
              </>
            )}
          </Pressable>
        ) : null}

        {variant === 'myJobs' && job.status === 'delivered' ? (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <Text style={styles.completedText}>Delivery completed</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  cardPressed: {
    opacity: 0.97,
    transform: [{ scale: 0.995 }],
  },
  cardBody: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerLeft: {
    flex: 1,
    gap: spacing.sm,
  },
  jobId: {
    ...fontStyle('bold'),
    fontSize: typography.caption,
    color: colors.textSecondary,
    letterSpacing: 0.4,
  },
  routeContent: {
    gap: spacing.md,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  locationIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickupIconWrap: {
    backgroundColor: colors.primaryMuted,
  },
  dropoffIconWrap: {
    backgroundColor: colors.background,
  },
  locationText: {
    flex: 1,
    gap: 2,
    paddingTop: 2,
  },
  locationLabel: {
    ...fontStyle('medium'),
    fontSize: typography.small,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  locationCity: {
    ...fontStyle('bold'),
    fontSize: typography.body,
    color: colors.text,
  },
  locationAddress: {
    ...fontStyle('regular'),
    fontSize: typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  metaChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
  },
  metaText: {
    ...fontStyle('medium'),
    fontSize: typography.caption,
    color: colors.primaryDark,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 48,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    ...fontStyle('bold'),
    color: colors.surface,
    fontSize: typography.body,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: '#ECFDF3',
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
  },
  completedText: {
    ...fontStyle('bold'),
    color: colors.success,
    fontSize: typography.caption,
  },
});
