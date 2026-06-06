import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing, typography } from '../theme/colors';
import { fontStyle } from '../theme/fonts';

type AppLogoSize = 'sm' | 'md';

interface AppLogoProps {
  size?: AppLogoSize;
  showLabel?: boolean;
}

const SIZES = {
  sm: { box: 40, icon: 20, radius: 12, label: typography.small },
  md: { box: 48, icon: 24, radius: 14, label: typography.caption },
};

export function AppLogo({ size = 'sm', showLabel = false }: AppLogoProps) {
  const dimensions = SIZES[size];

  return (
    <View style={styles.wrap}>
      <View
        style={[
          styles.logoBox,
          {
            width: dimensions.box,
            height: dimensions.box,
            borderRadius: dimensions.radius,
          },
        ]}
      >
        <Ionicons name="car-sport" size={dimensions.icon} color={colors.primary} />
      </View>
      {showLabel ? (
        <Text style={[styles.label, { fontSize: dimensions.label }]}>Driver</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  logoBox: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  label: {
    ...fontStyle('bold'),
    color: colors.primary,
    letterSpacing: 0.3,
  },
});
