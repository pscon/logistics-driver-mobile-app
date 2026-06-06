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
import { RootStackParamList } from '../navigation/types';
import {
  selectMyJobs,
  useJobsStore,
} from '../store/jobsStore';
import { Job } from '../types/job';
import { colors, spacing, typography } from '../theme/colors';

export function MyJobsScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const jobs = useJobsStore((state) => state.jobs);
  const isRefreshing = useJobsStore((state) => state.isRefreshing);
  const actionJobId = useJobsStore((state) => state.actionJobId);
  const error = useJobsStore((state) => state.error);
  const refreshJobs = useJobsStore((state) => state.refreshJobs);
  const advanceJobStatus = useJobsStore((state) => state.advanceJobStatus);
  const clearError = useJobsStore((state) => state.clearError);

  const myJobs = selectMyJobs(jobs);

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
        variant="myJobs"
        isActionLoading={actionJobId === item.id}
        onPress={() => handleOpenDetail(item)}
        onAdvanceStatus={() => advanceJobStatus(item.id)}
      />
    ),
    [actionJobId, advanceJobStatus, handleOpenDetail],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <Text style={styles.subtitle}>
          Track active deliveries and update status
        </Text>
      </View>

      <FlatList
        data={myJobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={[
          styles.listContent,
          myJobs.length === 0 && styles.listContentEmpty,
        ]}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshJobs} />
        }
        ListEmptyComponent={
          <EmptyState
            icon="list-circle-outline"
            title="No active jobs yet"
            message="Accepted deliveries will appear here."
          />
        }
      />
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
