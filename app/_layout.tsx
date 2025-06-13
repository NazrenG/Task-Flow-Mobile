import "@/i18n/i18n";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import "react-native-reanimated";


export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="quiz/index" />
      <Stack.Screen name="chat/chatDetails" />
      <Stack.Screen name="profile/index"/>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
