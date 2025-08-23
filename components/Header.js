import i18n from "@/i18n/i18n";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, TextInput, TouchableOpacity, View } from "react-native";
import CalendarDropdown from "../hooks/DropDown";
import { fetchProfileData } from "../utils/fetchUtils";

const currentLang = i18n.language ? i18n.language.toUpperCase() : "en";

export default function Header({ onSearch }) {
  const navigation = useNavigation();
  const [img, setImg] = useState("");

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

  useEffect(() => {
    const getData = async () => {
      const response = await fetchProfileData();
      setImg(response.image);
    };
    getData();
  }, []);

  return (
    <View className="px-4   bg-[#f8f8f8] flex-row items-center justify-between">
      {/* Profile */}
      <TouchableOpacity
        className="w-9 h-9 rounded-3xl mr-3 overflow-hidden"
        onPress={() => navigation.navigate("profile/index")}
      >
        <Image
          source={img ? img : require("../assets/images/default-user.png")}
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

      <View className="mr-3 w-20">
        <CalendarDropdown
          data={languages}
          placeholder="lan"
          value={currentLang}
          selectedValue={currentLang}
          onChange={handleLanguageChange}
        />
      </View>
    </View>
  );
}
