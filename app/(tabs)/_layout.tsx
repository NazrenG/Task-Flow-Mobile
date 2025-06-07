import "../../global.css";

import { Tabs } from "expo-router";
import React from "react";
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "transparent", // White
          borderTopWidth: 0,
          elevation: 0, // Remove shadow on Android
          shadowColor: "transparent", // Remove shadow on iOS
          height: 60, // Adjust height as needed
        },
      }}
    >
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
