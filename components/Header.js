import i18n from "@/i18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import CalendarDropdown from "../hooks/DropDown";



export default function Header({ onSearch }) {

  const navigation = useNavigation();
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
    <View className="px-4   bg-[#f8f8f8] flex-row items-center justify-between">
          {/* Profile */}
      <TouchableOpacity  className="w-9 h-9 rounded-3xl mr-3 overflow-hidden" onPress={() => navigation.navigate("profile/index")}> 
        <Image
          source={require("../assets/images/default-user.png")}
          className="w-full h-full"
        />
      </TouchableOpacity>
      {/* Search Input */}
      <View className="flex-1 flex-row bg-[#e0e0e0] rounded-xl items-center px-3 mr-2">
        <Ionicons name="search" size={20} color="#555" />
        <TextInput
          className="flex-1 p-2 color-black"
          placeholder="Search..."
          placeholderTextColor="#aaa"
          onChangeText={onSearch}
        />
      </View>

      {/* Language Dropdown */}
      <View className="mr-3 w-20">
        <CalendarDropdown
          data={languages}
          placeholder="lan"
          onChange={handleLanguageChange}
        />
      </View>
    </View>
  );
}
