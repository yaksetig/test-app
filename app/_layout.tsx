import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { DynamicContextProvider, WebView } from '@dynamic-labs/react-native-extension';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthGate } from '@/components/auth-gate';
import { dynamicClient } from '@/lib/dynamicClient';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <WebView />
      <DynamicContextProvider dynamicClient={dynamicClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <AuthGate>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
            </Stack>
            <StatusBar style="auto" />
          </AuthGate>
        </ThemeProvider>
      </DynamicContextProvider>
    </>
  );
}
