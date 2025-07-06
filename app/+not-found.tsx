import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import LottieView from "lottie-react-native";


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">This screen does not exist.</ThemedText>
        <LottieView
                         source={require("../assets/animations/animation_error.json")}
                         autoPlay
                         loop
                          style={{ width: 400, height: 300 }} // Animasiya ölçüsü
                       />
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparant', // Arxa fon rəngi
    justifyContent: 'center',
    alignItems: 'center',
  },

  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
