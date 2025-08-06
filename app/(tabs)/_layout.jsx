import { Colors } from "@/constants/Colors";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import { useTheme } from "@/components/ThemeContext";
import "../../global.css";

const AnimatedIcon = ({ name, color, focused }) => {
  const { theme } = useTheme();

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      {focused && (
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={{
            position: "absolute",
            top: -10,
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: Colors[theme].tabActiveBg,
            zIndex: -1,
          }}
        />
      )}
      <Animatable.View
        animation={focused ? "zoomIn" : undefined}
        duration={500}
        style={{ transform: [{ scale: focused ? 1.2 : 1 }], marginBottom: -10 }}
      >
        <FontAwesome5 name={name} size={22} color={color} />
      </Animatable.View>
    </View>
  );
};

const FloatingButtonIcon = (focused ) => {
  const { theme } = useTheme();

  return (
    <Animatable.View
      animation={focused ? "bounceIn" : "zoomIn"}
      duration={500}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors[theme].tabButtonBg,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        shadowColor: Colors[theme].shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 2,
        borderColor: "#fff",
      }}
    >
      <AntDesign name="home" size={33} color={Colors[theme].tabButtonIcon} />
    </Animatable.View>
  );
};

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: Colors[theme].tabBar,
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          position: "absolute",
        },
        tabBarActiveTintColor: Colors[theme].tabActive,
        tabBarInactiveTintColor: Colors[theme].tabInactive,
      }}
    >
      <Tabs.Screen
        name="friends"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="user-friends" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="comments" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => <FloatingButtonIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="bell" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <AnimatedIcon name="calendar-alt" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
