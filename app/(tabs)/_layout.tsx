import { Colors } from "@/constants/Colors";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";

import { Tabs } from "expo-router";
import React from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";
import "../../global.css";

const AnimatedIcon = ({ name, color, focused }: any) => {
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
            backgroundColor: Colors.secondary.bg_violet,
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

const FloatingButtonIcon = ({ focused }: any) => {
  return (
    <Animatable.View
      animation={focused ? "bounceIn" : "zoomIn"}
      duration={500}
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.secondary.lightViolet,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 30,
        shadowColor: Colors.primary.darkPurple,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 10,
        borderWidth: 2,
        borderColor: "#fff",
      }}
    >
      <AntDesign name="home" size={33} color={Colors.primary.darkViolet} />
    </Animatable.View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          position: "absolute",
        },
        tabBarActiveTintColor: Colors.primary.darkViolet,
        tabBarInactiveTintColor: "#777",
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
