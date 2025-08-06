import "@/i18n/i18n";
import { useFonts } from "expo-font";
import { Stack } from "expo-router"; 
import "react-native-reanimated";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ThemeProvider } from "../components/ThemeContext"; // doğru path-ə uyğun dəyiş

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
       <ThemeProvider> 
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="quiz/index" />
      <Stack.Screen name="chat/chatDetails" />
      <Stack.Screen name="project/projectPage" />
        <Stack.Screen name="profile/index" />
         <Stack.Screen name="notification" />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
        <Toast />
        </ThemeProvider>
  </GestureHandlerRootView>
);

}
