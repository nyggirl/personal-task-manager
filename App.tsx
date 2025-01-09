import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Expo Router will handle navigation */}
    </SafeAreaProvider>
  );
}
