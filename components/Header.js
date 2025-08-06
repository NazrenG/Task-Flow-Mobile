import i18n from "@/i18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarDropdown from "../hooks/DropDown";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../components/ThemeContext";
import { Colors } from "../constants/Colors";

export default function Header({ onSearch }) {
  const navigation = useNavigation();
  const { theme, toggleTheme } = useTheme(); // dark / light və dəyişdirmə funksiyası

  const languages = [
    {
      label: "EN",
      value: "en",
      icon: require("@/assets/images/flags/united-kingdom.png"),
    },
    {
      label: "AZ",
      value: "az",
      icon: require("@/assets/images/flags/azerbaijan.png"),
    },
    {
      label: "RU",
      value: "ru",
      icon: require("@/assets/images/flags/russia.png"),
    },
  ];

  const handleLanguageChange = (item) => {
    i18n.changeLanguage(item.value);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ backgroundColor: Colors[theme].background }}
    >
      <View className="px-4 py-2 flex-row items-center justify-between">
        {/* Profile */}
        <TouchableOpacity
          className="w-9 h-9 rounded-3xl mr-3 overflow-hidden"
          onPress={() => navigation.navigate("profile/index")}
        >
          <Image
            source={require("../assets/images/default-user.png")}
            className="w-full h-full"
          />
        </TouchableOpacity>

        {/* Search Input */}
        <View
          className="flex-1 flex-row rounded-xl items-center px-3 mr-2"
          style={{ backgroundColor: Colors[theme].inputBg }}
        >
          <Ionicons name="search" size={20} color={Colors[theme].icon} />
          <TextInput
            className="flex-1 p-2"
            style={{ color: Colors[theme].text }}
            placeholder="Search..."
            placeholderTextColor={Colors[theme].placeholder}
            onChangeText={onSearch}
          />
        </View>

        {/* Language Dropdown */}
        <View className="mr-2 w-20">
          <CalendarDropdown
            data={languages}
            placeholder="lan"
            onChange={handleLanguageChange}
          />
        </View>

        {/* 🌙/☀️ Toggle */}
        <TouchableOpacity onPress={toggleTheme}>
          <Ionicons
            name={theme === "dark" ? "moon" : "sunny"}
            size={24}
            color={Colors[theme].icon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
