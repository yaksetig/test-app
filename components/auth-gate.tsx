import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/theme';

const AUTH_STORAGE_KEY = 'dynamic_wallet_authenticated';

export function AuthGate({ children }: { children: ReactNode }) {
  const { user, isAuthenticated, authToken, setShowAuthFlow } = useDynamicContext();
  const [hydrated, setHydrated] = useState(false);
  const [persistedAuth, setPersistedAuth] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(AUTH_STORAGE_KEY)
      .then((value) => {
        setPersistedAuth(value === 'true');
      })
      .finally(() => setHydrated(true));
  }, []);

  useEffect(() => {
    if (user || isAuthenticated || authToken) {
      AsyncStorage.setItem(AUTH_STORAGE_KEY, 'true');
      setPersistedAuth(true);
    }
  }, [user, isAuthenticated, authToken]);

  const authenticated = useMemo(
    () => Boolean(user || isAuthenticated || authToken || persistedAuth),
    [authToken, isAuthenticated, persistedAuth, user],
  );

  if (!hydrated) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.light.tint} />
        <Text style={styles.loadingText}>Loading your wallet...</Text>
      </SafeAreaView>
    );
  }

  if (!authenticated) {
    return <LoginScreen onConnect={() => setShowAuthFlow(true)} />;
  }

  return <>{children}</>;
}

function LoginScreen({ onConnect }: { onConnect: () => void }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>Welcome to Leaf Wallet</Text>
        <Text style={styles.subtitle}>
          Connect with Dynamic to view your balances and activity. Your secure session will be ready the
          next time you open the app.
        </Text>
        <TouchableOpacity style={styles.connectButton} onPress={onConnect}>
          <Text style={styles.connectButtonText}>Connect Wallet</Text>
        </TouchableOpacity>
        <DynamicWidget variant="dropdown" buttonStyle={styles.widgetButton} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 16,
    color: Colors.light.icon,
  },
  heroCard: {
    backgroundColor: '#ecfdf3',
    borderRadius: 24,
    padding: 24,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: '#166534',
    lineHeight: 22,
  },
  connectButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  connectButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  widgetButton: {
    backgroundColor: '#ffffff',
    borderColor: '#a7f3d0',
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 12,
  },
});
