import { StyleSheet, Text, View } from 'react-native';

import { JobStatus } from '../types/job';
import { colors, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import { formatStatus } from '../utils/formatters';

interface StatusBadgeProps {
  status: JobStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const backgroundColor =
    status === 'accepted' || status === 'available'
      ? colors.status.accepted
      : status === 'picked_up'
        ? colors.status.picked_up
        : colors.status.delivered;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{formatStatus(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  text: {
    ...fontStyle('bold'),
    color: colors.surface,
    fontSize: typography.small,
  },
});
