import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { JobDetailScreen } from '../screens/JobDetailScreen';
import { colors } from '../theme/colors';
import { TabNavigator } from './TabNavigator';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="JobDetail"
        component={JobDetailScreen}
        options={({ route }) => ({
          title: `Job ${route.params.jobId.replace('job-', '#').toUpperCase()}`,
        })}
      />
    </Stack.Navigator>
  );
}
