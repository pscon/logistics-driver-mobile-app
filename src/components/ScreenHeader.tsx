import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';
import { AppLogo } from './AppLogo';

interface ScreenHeaderProps {
  title: string;
  subtitle: string;
  statLabel?: string;
  statIcon?: keyof typeof Ionicons.glyphMap;
}

export function ScreenHeader({
  title,
  subtitle,
  statLabel,
  statIcon = 'pulse-outline',
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        <AppLogo size="sm" showLabel />
      </View>

      {statLabel ? (
        <View style={styles.statPill}>
          <Ionicons name={statIcon} size={16} color={colors.primary} />
          <Text style={styles.statText}>{statLabel}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
    backgroundColor: colors.background,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  textBlock: {
    flex: 1,
    gap: spacing.xs,
  },
  title: {
    ...fontStyle('bold'),
    fontSize: typography.title,
    color: colors.text,
    letterSpacing: -0.3,
  },
  subtitle: {
    ...fontStyle('regular'),
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 21,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.sm,
    backgroundColor: colors.primaryMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  statText: {
    ...fontStyle('medium'),
    fontSize: typography.caption,
    color: colors.primaryDark,
  },
});
