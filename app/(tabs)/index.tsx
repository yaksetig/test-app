import { DynamicWidget } from '@dynamic-labs/sdk-react-native';
import { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';

const priceData = [
  { symbol: 'BTC', name: 'Bitcoin', price: 68750, change: 2.3 },
  { symbol: 'ETH', name: 'Ethereum', price: 3120, change: -1.1 },
  { symbol: 'SOL', name: 'Solana', price: 142.33, change: 4.6 },
  { symbol: 'USDC', name: 'USD Coin', price: 1.0, change: 0.01 },
];

export default function PricesScreen() {
  const aggregated = useMemo(() => {
    const totalChange = priceData.reduce((acc, item) => acc + item.change, 0) / priceData.length;
    return totalChange.toFixed(2);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Your wallet</Text>
          <Text style={styles.subtitle}>Stay on top of the market</Text>
        </View>
        <DynamicWidget variant="dropdown" buttonStyle={styles.widgetButton} />
      </View>
      <View style={styles.summaryCard}>
        <Text style={styles.balanceLabel}>24h performance</Text>
        <Text style={styles.balanceValue}>+{aggregated}%</Text>
        <Text style={styles.balanceHint}>Connected via Dynamic</Text>
      </View>
      <ScrollView style={styles.list} contentContainerStyle={{ gap: 12 }}>
        {priceData.map((asset) => (
          <View key={asset.symbol} style={styles.assetRow}>
            <View>
              <Text style={styles.assetSymbol}>{asset.symbol}</Text>
              <Text style={styles.assetName}>{asset.name}</Text>
            </View>
            <View style={styles.assetMetrics}>
              <Text style={styles.assetPrice}>${asset.price.toLocaleString()}</Text>
              <Text style={[styles.assetChange, asset.change >= 0 ? styles.positive : styles.negative]}>
                {asset.change > 0 ? '+' : ''}
                {asset.change}%
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light.background,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.light.text,
  },
  subtitle: {
    color: Colors.light.icon,
    marginTop: 4,
  },
  widgetButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 12,
    paddingVertical: 10,
  },
  summaryCard: {
    backgroundColor: '#ecfdf3',
    borderRadius: 18,
    padding: 16,
    gap: 6,
  },
  balanceLabel: {
    color: Colors.light.icon,
    fontSize: 14,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.light.tint,
  },
  balanceHint: {
    color: '#166534',
  },
  list: {
    flex: 1,
  },
  assetRow: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  assetSymbol: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.light.text,
  },
  assetName: {
    color: Colors.light.icon,
  },
  assetMetrics: {
    alignItems: 'flex-end',
    gap: 4,
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  positive: {
    color: Colors.light.tint,
  },
  negative: {
    color: '#b91c1c',
  },
});
