import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  PixelRatio,
} from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const scale = width / 375;

function normalize(size) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export default function SettingsScreen() {
  const navigation = useNavigation();

  const profile = {
    name: "Sevgi Elesgerova",
    email: "sevgi.elesgerova@gmail.com",
    avatar: require("../../assets/images/default-user.png"),
  };

  const settingsList = [
    { icon: "edit", label: "Edit Profile" },
    { icon: "key", label: "Change Password" }, // bu düyməyə klik edəndə səhifəyə yönləndiriləcək
    { icon: "bell", label: "Notifications" },
    { icon: "activity", label: "Activity Log" },
  ];

  const dangerList = [
    { icon: "trash-2", label: "Delete Account" },
    { icon: "clock", label: "Clear History" },
    { icon: "log-out", label: "Log Out" },
  ];

  const handlePress = (label) => {
    if (label === "Change Password") {
      navigation.navigate("auth/changePassword"); // bu route Stack.Navigator-da olmalıdır
    } else {
      console.log("Pressed:", label);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="rounded-full p-1"
        >
          <MaterialIcons name="arrow-back-ios" size={25} color="black" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">Settings</Text>
        <View style={{ width: normalize(26) }} />
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
            onPress={() => handlePress(item.label)}
          >
            <View className="flex-row items-center">
              <Feather name={item.icon} size={normalize(20)} color="#444" />
              <Text className="ml-3 text-base text-gray-800">
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={normalize(20)} color="#bbb" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Danger Zone */}
      <Text className="mt-8 mb-2 text-sm text-gray-500 font-semibold">
        Danger Zone
      </Text>
      <View className="space-y-2 mb-8">
        {dangerList.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row justify-between items-center bg-red-50 p-4 rounded-xl border border-red-200"
            onPress={() => handlePress(item.label)}
          >
            <View className="flex-row items-center">
              <Feather name={item.icon} size={normalize(20)} color="#d9534f" />
              <Text className="ml-3 text-base text-red-600 font-medium">
                {item.label}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={normalize(20)} color="#d9534f" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatarLarge: {
    width: normalize(64),
    height: normalize(64),
    borderRadius: normalize(32),
  },
});
