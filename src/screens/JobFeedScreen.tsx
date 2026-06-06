import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { JobCard } from '../components/JobCard';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { RootStackParamList } from '../navigation/types';
import {
  selectAvailableJobs,
  useJobsStore,
} from '../store/jobsStore';
import { Job } from '../types/job';
import { colors, spacing, typography } from '../theme/colors';

export function JobFeedScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const jobs = useJobsStore((state) => state.jobs);
  const isLoading = useJobsStore((state) => state.isLoading);
  const isRefreshing = useJobsStore((state) => state.isRefreshing);
  const actionJobId = useJobsStore((state) => state.actionJobId);
  const error = useJobsStore((state) => state.error);
  const loadJobs = useJobsStore((state) => state.loadJobs);
  const refreshJobs = useJobsStore((state) => state.refreshJobs);
  const acceptJob = useJobsStore((state) => state.acceptJob);
  const clearError = useJobsStore((state) => state.clearError);

  const availableJobs = selectAvailableJobs(jobs);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  useEffect(() => {
    if (error) {
      Alert.alert('Something went wrong', error, [
        { text: 'OK', onPress: clearError },
      ]);
    }
  }, [clearError, error]);

  const handleOpenDetail = useCallback(
    (job: Job) => {
      navigation.navigate('JobDetail', { jobId: job.id });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Job }) => (
      <JobCard
        job={item}
        variant="feed"
        isActionLoading={actionJobId === item.id}
        onPress={() => handleOpenDetail(item)}
        onAccept={() => acceptJob(item.id)}
      />
    ),
    [acceptJob, actionJobId, handleOpenDetail],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Jobs</Text>
        <Text style={styles.subtitle}>
          Accept a delivery to move it to My Jobs
        </Text>
      </View>

      <FlatList
        data={availableJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          availableJobs.length === 0 && styles.listContentEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshJobs} />
        }
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              icon="briefcase-outline"
              title="No available jobs"
              message="Pull down to refresh the job feed."
            />
          ) : null
        }
      />

      <LoadingOverlay visible={isLoading && jobs.length === 0} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.xs,
  },
  title: {
    fontSize: typography.title,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
  separator: {
    height: spacing.md,
  },
});
