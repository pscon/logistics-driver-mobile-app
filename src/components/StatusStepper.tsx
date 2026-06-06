import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { JobStatus } from '../types/job';
import { colors, spacing, typography } from '../theme/colors';

interface Step {
  key: JobStatus;
  label: string;
}

const STEPS: Step[] = [
  { key: 'accepted', label: 'Accepted' },
  { key: 'picked_up', label: 'Picked Up' },
  { key: 'delivered', label: 'Delivered' },
];

const STATUS_ORDER: JobStatus[] = ['accepted', 'picked_up', 'delivered'];

interface StatusStepperProps {
  status: JobStatus;
}

function getStepIndex(status: JobStatus): number {
  return STATUS_ORDER.indexOf(status);
}

export function StatusStepper({ status }: StatusStepperProps) {
  const currentIndex = getStepIndex(status);

  return (
    <View style={styles.container}>
      {STEPS.map((step, index) => {
        const isCompleted = currentIndex > index;
        const isActive = currentIndex === index;
        const isUpcoming = currentIndex < index;

        return (
          <View key={step.key} style={styles.stepRow}>
            <View style={styles.stepContent}>
              <View
                style={[
                  styles.circle,
                  isCompleted && styles.circleCompleted,
                  isActive && styles.circleActive,
                  isUpcoming && styles.circleUpcoming,
                ]}
              >
                {isCompleted ? (
                  <Ionicons name="checkmark" size={14} color={colors.surface} />
                ) : (
                  <Text
                    style={[
                      styles.stepNumber,
                      (isActive || isCompleted) && styles.stepNumberActive,
                    ]}
                  >
                    {index + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                  isCompleted && styles.labelCompleted,
                ]}
              >
                {step.label}
              </Text>
            </View>
            {index < STEPS.length - 1 && (
              <View
                style={[
                  styles.connector,
                  currentIndex > index && styles.connectorCompleted,
                ]}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  stepRow: {
    flex: 1,
    alignItems: 'center',
  },
  stepContent: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  circle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  circleActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  circleCompleted: {
    borderColor: colors.success,
    backgroundColor: colors.success,
  },
  circleUpcoming: {
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  stepNumber: {
    color: colors.textSecondary,
    fontSize: typography.small,
    fontWeight: '700',
  },
  stepNumberActive: {
    color: colors.surface,
  },
  label: {
    fontSize: typography.small,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  labelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  labelCompleted: {
    color: colors.success,
    fontWeight: '600',
  },
  connector: {
    position: 'absolute',
    top: 14,
    left: '55%',
    right: '-45%',
    height: 2,
    backgroundColor: colors.border,
    zIndex: -1,
  },
  connectorCompleted: {
    backgroundColor: colors.success,
  },
});
