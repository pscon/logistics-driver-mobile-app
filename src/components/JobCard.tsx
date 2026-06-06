import { Ionicons } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Job } from '../types/job';
import { colors, radius, spacing, typography } from '../theme/colors';
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
      <View style={styles.header}>
        <Text style={styles.jobId}>{formatJobId(job.id)}</Text>
        <PriorityBadge priority={job.priority} />
      </View>

      {variant === 'myJobs' ? <StatusBadge status={job.status} /> : null}

      <View style={styles.locationBlock}>
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={18} color={colors.primary} />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationCity}>{job.pickup.city}</Text>
            <Text style={styles.locationAddress}>{job.pickup.address}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.locationRow}>
          <Ionicons name="flag-outline" size={18} color={colors.danger} />
          <View style={styles.locationText}>
            <Text style={styles.locationLabel}>Drop-off</Text>
            <Text style={styles.locationCity}>{job.dropoff.city}</Text>
            <Text style={styles.locationAddress}>{job.dropoff.address}</Text>
          </View>
        </View>
      </View>

      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Ionicons name="navigate-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.metaText}>{formatDistance(job.estimatedDistanceKm)}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={16} color={colors.textSecondary} />
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
            <Text style={styles.primaryButtonText}>Accept Job</Text>
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
            <Text style={styles.primaryButtonText}>{nextAction}</Text>
          )}
        </Pressable>
      ) : null}

      {variant === 'myJobs' && job.status === 'delivered' ? (
        <View style={styles.completedBanner}>
          <Ionicons name="checkmark-circle" size={18} color={colors.success} />
          <Text style={styles.completedText}>Delivery completed</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  cardPressed: {
    opacity: 0.95,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobId: {
    fontSize: typography.caption,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  locationBlock: {
    gap: spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  locationText: {
    flex: 1,
    gap: 2,
  },
  locationLabel: {
    fontSize: typography.small,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  locationCity: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.text,
  },
  locationAddress: {
    fontSize: typography.caption,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 26,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  metaText: {
    fontSize: typography.caption,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 46,
  },
  primaryButtonPressed: {
    backgroundColor: colors.primaryDark,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  primaryButtonText: {
    color: colors.surface,
    fontSize: typography.body,
    fontWeight: '700',
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
    color: colors.success,
    fontSize: typography.caption,
    fontWeight: '700',
  },
});
