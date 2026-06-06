import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EmptyState } from '../components/EmptyState';
import { JobCard } from '../components/JobCard';
import { ScreenHeader } from '../components/ScreenHeader';
import { RootStackParamList } from '../navigation/types';
import {
  selectMyJobs,
  useJobsStore,
} from '../store/jobsStore';
import { Job } from '../types/job';
import { colors, spacing } from '../theme/colors';

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

  const statLabel = useMemo(() => {
    const activeCount = myJobs.filter((job) => job.status !== 'delivered').length;
    if (myJobs.length === 0) {
      return 'No active deliveries yet';
    }
    if (activeCount === 0) {
      return `${myJobs.length} completed ${myJobs.length === 1 ? 'delivery' : 'deliveries'}`;
    }
    return `${activeCount} active ${activeCount === 1 ? 'delivery' : 'deliveries'}`;
  }, [myJobs]);

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
      <ScreenHeader
        title="My Jobs"
        subtitle="Track active deliveries and update status"
        statLabel={statLabel}
        statIcon="list-circle-outline"
      />

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
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshJobs}
            tintColor={colors.primary}
          />
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
