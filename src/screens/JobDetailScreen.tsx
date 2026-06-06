import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { JobRouteMap } from '../components/JobRouteMap';
import { PriorityBadge } from '../components/PriorityBadge';
import { StatusBadge } from '../components/StatusBadge';
import { StatusStepper } from '../components/StatusStepper';
import { RootStackParamList } from '../navigation/types';
import { useJobsStore } from '../store/jobsStore';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import {
  formatDistance,
  formatDuration,
  formatJobId,
  formatTimestamp,
  getNextStatusAction,
} from '../utils/formatters';

type Props = NativeStackScreenProps<RootStackParamList, 'JobDetail'>;

export function JobDetailScreen({ route }: Props) {
  const { jobId } = route.params;

  const job = useJobsStore((state) => state.getJobById(jobId));
  const actionJobId = useJobsStore((state) => state.actionJobId);
  const error = useJobsStore((state) => state.error);
  const advanceJobStatus = useJobsStore((state) => state.advanceJobStatus);
  const acceptJob = useJobsStore((state) => state.acceptJob);
  const clearError = useJobsStore((state) => state.clearError);

  const nextAction = useMemo(
    () => (job ? getNextStatusAction(job.status) : null),
    [job],
  );

  const isAvailable = job?.status === 'available';
  const isActionLoading = actionJobId === jobId;

  useEffect(() => {
    if (error) {
      Alert.alert('Something went wrong', error, [
        { text: 'OK', onPress: clearError },
      ]);
    }
  }, [clearError, error]);

  if (!job) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Job not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <View style={styles.headerRow}>
          <Text style={styles.jobId}>{formatJobId(job.id)}</Text>
          <PriorityBadge priority={job.priority} />
        </View>
        <StatusBadge status={job.status} />
      </View>

      {job.status !== 'available' ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Progress</Text>
          <StatusStepper status={job.status} />
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Route</Text>
        <JobRouteMap pickup={job.pickup} dropoff={job.dropoff} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pickup</Text>
        <Text style={styles.city}>{job.pickup.city}</Text>
        <Text style={styles.address}>{job.pickup.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drop-off</Text>
        <Text style={styles.city}>{job.dropoff.city}</Text>
        <Text style={styles.address}>{job.dropoff.address}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estimates</Text>
        <View style={styles.metaRow}>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Distance</Text>
            <Text style={styles.metaValue}>{formatDistance(job.estimatedDistanceKm)}</Text>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.metaLabel}>Duration</Text>
            <Text style={styles.metaValue}>{formatDuration(job.estimatedDurationMin)}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Timeline</Text>
        <View style={styles.timelineRow}>
          <Text style={styles.timelineLabel}>Accepted</Text>
          <Text style={styles.timelineValue}>{formatTimestamp(job.acceptedAt)}</Text>
        </View>
        <View style={styles.timelineRow}>
          <Text style={styles.timelineLabel}>Picked up</Text>
          <Text style={styles.timelineValue}>{formatTimestamp(job.pickedUpAt)}</Text>
        </View>
        <View style={styles.timelineRow}>
          <Text style={styles.timelineLabel}>Delivered</Text>
          <Text style={styles.timelineValue}>{formatTimestamp(job.deliveredAt)}</Text>
        </View>
      </View>

      {isAvailable ? (
        <Pressable
          onPress={() => acceptJob(job.id)}
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

      {nextAction ? (
        <Pressable
          onPress={() => advanceJobStatus(job.id)}
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

      {!isAvailable && !nextAction ? (
        <View style={styles.completedBanner}>
          <Text style={styles.completedText}>This delivery is complete.</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  errorText: {
    ...fontStyle('regular'),
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  section: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  jobId: {
    ...fontStyle('bold'),
    fontSize: typography.subtitle,
    color: colors.text,
  },
  sectionTitle: {
    ...fontStyle('bold'),
    fontSize: typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  city: {
    ...fontStyle('bold'),
    fontSize: typography.subtitle,
    color: colors.text,
  },
  address: {
    ...fontStyle('regular'),
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metaCard: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    gap: spacing.xs,
  },
  metaLabel: {
    ...fontStyle('bold'),
    fontSize: typography.small,
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  metaValue: {
    ...fontStyle('bold'),
    fontSize: typography.subtitle,
    color: colors.text,
  },
  timelineRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  timelineLabel: {
    ...fontStyle('regular'),
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  timelineValue: {
    ...fontStyle('medium'),
    fontSize: typography.body,
    color: colors.text,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
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
    backgroundColor: '#ECFDF3',
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  completedText: {
    ...fontStyle('bold'),
    color: colors.success,
    fontSize: typography.body,
  },
});
