import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthGate } from '@/components/auth-gate';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <DynamicContextProvider
      environmentId="ff73df27-26fa-4834-9f9b-471e4794ec39"
      settings={{ walletConnectors: { enableEtherspot: false } }}>
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
  );
}
