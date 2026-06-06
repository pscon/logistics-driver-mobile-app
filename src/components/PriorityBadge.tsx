import { StyleSheet, Text, View } from 'react-native';

import { JobPriority } from '../types/job';
import { colors, radius, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import { formatPriority } from '../utils/formatters';

interface PriorityBadgeProps {
  priority: JobPriority;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: colors.priority[priority] }]}>
      <Text style={styles.text}>{formatPriority(priority)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  text: {
    ...fontStyle('bold'),
    color: colors.surface,
    fontSize: typography.small,
    textTransform: 'uppercase',
  },
});
