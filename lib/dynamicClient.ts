import { createClient } from '@dynamic-labs/client';
import { ReactNativeExtension } from '@dynamic-labs/react-native-extension';
// Optional web support:
// import { WebExtension } from '@dynamic-labs/web-extension';

export const dynamicClient = createClient({
  environmentId: process.env.EXPO_PUBLIC_DYNAMIC_ENVIRONMENT_ID!,
})
  // .extend(WebExtension()) // optional
  .extend(ReactNativeExtension());
