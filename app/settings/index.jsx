import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CalendarDropdown from "../../hooks/DropDown";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/i18n";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

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

export default function SettingsScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  const profile = {
    name: "Sevgi Elesgerova",
    email: "sevgi.elesgerova@gmail.com",
    avatar: require("../../assets/images/default-user.png"),
  };

  const settingsList = [
    { key: "editProfile", icon: "edit", label: t("settings.editprofile") },
    { key: "changePassword", icon: "key", label: t("settings.changePassword") },
    { key: "notifications", icon: "bell", label: t("settings.notifications") },
    { key: "activityLog", icon: "activity", label: t("settings.activityLog") },
  ];

  const dangerList = [
    { icon: "trash-2", label: t("settings.deleteAccount") },
    { icon: "clock", label: t("settings.cleanHistory") },
    { icon: "log-out", label: t("settings.logout") },
  ];

  const handlePress = (key) => {
    if (key === "changePassword") {
      navigation.navigate("auth/changePassword");
    } else if (key === "editProfile") {
      navigation.navigate("settings/editprofile");
    } else {
      console.log("Pressed:", key);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="rounded-full p-1"
          >
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold text-gray-900">
            {t("settings.name")}
          </Text>
          <View className="mr-3 w-20">
            <CalendarDropdown
              data={languages}
              placeholder="lan"
              onChange={handleLanguageChange}
            />
          </View>
        </View>

        {/* Profile Section */}
        <View className="flex-row items-center bg-gray-100 p-4 rounded-2xl shadow-sm mb-6">
          <Image
            source={profile.avatar}
            style={styles.avatarLarge}
            className="mr-4"
          />
          <View className="flex-1">
            <Text className="text-base font-bold text-gray-900">
              {profile.name}
            </Text>
            <Text className="text-sm text-gray-600 mt-1">{profile.email}</Text>
          </View>
        </View>

        {/* Settings List */}
        <View className="space-y-2">
          {settingsList.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm"
              onPress={() => handlePress(item.key)}
            >
              <View className="flex-row items-center">
                <Feather name={item.icon} size={normalize(20)} color="#444" />
                <Text className="ml-3 text-base text-gray-800">
                  {item.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#bbb"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Danger Zone */}
        <Text className="mt-8 mb-2 text-sm text-gray-500 font-semibold">
          {t("settings.dangerZone")}
        </Text>
        <View className="space-y-2 mb-8">
          {dangerList.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row justify-between items-center bg-red-50 p-4 rounded-xl border border-red-200"
              onPress={() => console.log("Pressed:", item.label)}
            >
              <View className="flex-row items-center">
                <Feather
                  name={item.icon}
                  size={normalize(20)}
                  color="#d9534f"
                />
                <Text className="ml-3 text-base text-red-600 font-medium">
                  {item.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={normalize(20)}
                color="#d9534f"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatarLarge: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
  },
});
