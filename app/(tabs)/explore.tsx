import { DynamicWidget } from '@dynamic-labs/sdk-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants/theme';
import { ThemedView } from '@/components/themed-view';

const transactions = [
  { id: '1', title: 'Deposit from exchange', amount: 1200, status: 'Completed', time: 'Today, 10:24' },
  { id: '2', title: 'Sent to 0x90...12A4', amount: -250, status: 'Pending', time: 'Today, 08:02' },
  { id: '3', title: 'NFT purchase', amount: -480, status: 'Completed', time: 'Yesterday, 19:44' },
  { id: '4', title: 'Rewards claim', amount: 36.5, status: 'Completed', time: 'Yesterday, 11:09' },
];

export default function TransactionsScreen() {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Activity</Text>
          <Text style={styles.subtitle}>Track your latest moves</Text>
        </View>
        <DynamicWidget variant="dropdown" buttonStyle={styles.widgetButton} />
      </View>
      <ScrollView style={styles.list} contentContainerStyle={{ gap: 12 }}>
        {transactions.map((tx) => (
          <View key={tx.id} style={styles.transactionCard}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={styles.transactionTitle}>{tx.title}</Text>
              <Text style={styles.transactionMeta}>{tx.time}</Text>
            </View>
            <View style={styles.statusBlock}>
              <Text style={[styles.amount, tx.amount >= 0 ? styles.positive : styles.negative]}>
                {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toLocaleString()}
              </Text>
              <Text style={styles.status}>{tx.status}</Text>
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
  list: {
    flex: 1,
  },
  transactionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  transactionMeta: {
    color: Colors.light.icon,
  },
  statusBlock: {
    alignItems: 'flex-end',
    gap: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  status: {
    color: '#065f46',
    fontWeight: '600',
  },
  positive: {
    color: Colors.light.tint,
  },
  negative: {
    color: '#b91c1c',
  },
});
