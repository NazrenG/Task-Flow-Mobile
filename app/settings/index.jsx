import i18n from "@/i18n/i18n";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  PixelRatio,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalendarDropdown from "../../hooks/DropDown";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

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
  const router = useRouter();
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const profile = {
    name: "Sevgi Elesgerova",
    email: "sevgi.elesgerova@gmail.com",
    avatar: require("../../assets/images/default-user.png"),
  };

  const settingsList = [
    { key: "editProfile", icon: "edit", label: t("settings.editprofile") },
    { key: "changePassword", icon: "key", label: t("settings.changePassword") },
    { key: "notification", icon: "bell", label: t("settings.notifications") },
    { key: "activityLog", icon: "activity", label: t("settings.activityLog") },
    { key: "darkMode", icon: "moon", label: t("settings.darkMode") },
  ];

  const dangerList = [
    { icon: "trash-2", label: t("settings.deleteAccount") },
    { icon: "clock", label: t("settings.cleanHistory") },
    { icon: "log-out", label: t("settings.logout") },
  ];

  const handlePress = (key) => {
    if (key === "changePassword") {
      router.push("settings/updatePassword");
    } else if (key === "editProfile") {
      router.push("/settings/editprofile");
    } else if (key === "notification") {
      router.push("/notification");
    } else {
      console.log("Pressed:", key);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="rounded-full p-1">
            <MaterialIcons name="arrow-back-ios" size={25} color={Colors[theme].text} />
          </TouchableOpacity>
          <Text style={{ color: Colors[theme].text }} className="text-lg font-semibold">
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
        <View
          className="flex-row items-center p-4 rounded-2xl shadow-sm mb-6"
          style={{ backgroundColor: Colors[theme].card }}
        >
          <Image
            source={profile.avatar}
            style={styles.avatarLarge}
            className="mr-4"
          />
          <View className="flex-1">
            <Text style={{ color: Colors[theme].text }} className="text-base font-bold">
              {profile.name}
            </Text>
            <Text style={{ color: Colors[theme].secondaryText }} className="text-sm mt-1">
              {profile.email}
            </Text>
          </View>
        </View>

        {/* Settings List */}
        <View className="space-y-2">
          {settingsList.map((item, index) => {
            if (item.key === "darkMode") {
              return (
                <View
                  key={index}
                  className="flex-row justify-between items-center p-4 rounded-xl shadow-sm"
                  style={{ backgroundColor: Colors[theme].card }}
                >
                  <View className="flex-row items-center">
                    <Feather name={item.icon} size={normalize(20)} color={Colors[theme].icon} />
                    <Text style={{ color: Colors[theme].text }} className="ml-3 text-base">
                      {item.label}
                    </Text>
                  </View>
                  <Switch
                    value={theme === "dark"}
                    onValueChange={toggleTheme}
                    trackColor={{ false: "#ccc", true: "#6852ff" }}
                    thumbColor="#fff"
                  />
                </View>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                className="flex-row justify-between items-center p-4 rounded-xl shadow-sm"
                style={{ backgroundColor: Colors[theme].card }}
                onPress={() => handlePress(item.key)}
              >
                <View className="flex-row items-center">
                  <Feather name={item.icon} size={normalize(20)} color={Colors[theme].icon} />
                  <Text style={{ color: Colors[theme].text }} className="ml-3 text-base">
                    {item.label}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={normalize(20)} color={Colors[theme].icon} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Danger Zone */}
        <Text style={{ color: Colors[theme].secondaryText }} className="mt-8 mb-2 text-sm font-semibold">
          {t("settings.dangerZone")}
        </Text>
        <View className="space-y-2 mb-8">
          {dangerList.map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row justify-between items-center p-4 rounded-xl border"
              style={{
                backgroundColor: Colors[theme].dangerBg,
                borderColor: Colors[theme].dangerBorder,
              }}
              onPress={() => console.log("Pressed:", item.label)}
            >
              <View className="flex-row items-center">
                <Feather name={item.icon} size={normalize(20)} color={Colors[theme].dangerText} />
                <Text className="ml-3 text-base font-medium" style={{ color: Colors[theme].dangerText }}>
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={normalize(20)} color={Colors[theme].dangerText} />
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
