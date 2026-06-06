import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_700Bold,
  useFonts,
} from '@expo-google-fonts/dm-sans';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './src/navigation/RootNavigator';
import { SplashScreenView } from './src/screens/SplashScreen';
import { useJobsStore } from './src/store/jobsStore';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

const MIN_SPLASH_MS = 2200;

export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const mainOpacity = useRef(new Animated.Value(0)).current;
  const loadJobs = useJobsStore((state) => state.loadJobs);

  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      return;
    }

    let isMounted = true;

    async function prepare() {
      const startedAt = Date.now();

      try {
        await loadJobs();
      } catch {
        // Splash should still dismiss even if initial load fails.
      }

      const elapsed = Date.now() - startedAt;
      const remaining = Math.max(0, MIN_SPLASH_MS - elapsed);

      if (remaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, remaining));
      }

      if (!isMounted) {
        return;
      }

      await SplashScreen.hideAsync();
      setIsAppReady(true);

      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(mainOpacity, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished && isMounted) {
          setShowSplash(false);
        }
      });
    }

    prepare();

    return () => {
      isMounted = false;
    };
  }, [fontsLoaded, loadJobs, mainOpacity, splashOpacity]);

  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  return (
    <SafeAreaProvider>
      <View style={styles.root} onLayout={onLayoutRootView}>
        {isAppReady ? (
          <Animated.View style={[styles.main, { opacity: mainOpacity }]}>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="dark" />
            </NavigationContainer>
          </Animated.View>
        ) : null}

        {showSplash ? (
          <Animated.View
            style={[styles.splashOverlay, { opacity: splashOpacity }]}
            pointerEvents={isAppReady ? 'none' : 'auto'}
          >
            <SplashScreenView />
            <StatusBar style="light" />
          </Animated.View>
        ) : null}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  main: {
    flex: 1,
  },
  splashOverlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 10,
  },
});
