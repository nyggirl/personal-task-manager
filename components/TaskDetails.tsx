// pages/details.tsx
import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Details() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Welcome to the Details Page!</Text>
      <Button
        title="Go Back"
        onPress={() => router.back()}
      />
    </View>
  );
}
