import i18n from "@/i18n/i18n";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import CalendarDropdown from "../../hooks/DropDown";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import LottieView from "lottie-react-native";


export default function UpdatePassword() {
  const router = useRouter();
  const { t } = useTranslation();
  const { width } = Dimensions.get("window");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { theme } = useTheme();

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

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert(
        t("changepassword.errorMessage"),
        t("changepassword.error.emptyFields")
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert(
        t("changepassword.errorMessage"),
        t("changepassword.error.passwordMismatch")
      );
      return;
    }

    Alert.alert(
      t("changepassword.successMessage"),
      t("changepassword.error.passwordUpdated")
    );
    router.back();
  };

  const handleLanguageChange = (item) => {
    i18n.changeLanguage(item.value);
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
        <MaterialIcons
  name="arrow-back-ios"
  size={24}
  color={Colors[theme].icon} // birbaşa rəng ver
/>
        </TouchableOpacity>
        <Text style={[styles.headerText, { color: Colors[theme].icon}]}>
          {t("changepassword.changePassword")}
        </Text>

        <View className="mr-3 w-20">
          <CalendarDropdown
            data={languages}
            placeholder="lan"
            onChange={handleLanguageChange}
          />
        </View>
      </View>
      {/* Form */}
      <View style={styles.formContainer}>
 <LottieView
            source={require("../../assets/animations/Animation - 1751226345030.json")}
            autoPlay
            loop
            style={{
              width: width * 0.9,
              height: width * 0.8,
              marginBottom: 30,
            }}
          />
        <Input
          placeholder={t("changepassword.currentPassword")}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={[
            styles.input,
            {
              backgroundColor: Colors[theme].inputBackground,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            },
          ]}
          placeholderTextColor={Colors[theme].placeholder}
          secureTextEntry
        />
        <Input
          placeholder={t("changepassword.newPassword")}
          value={newPassword}
          onChangeText={setNewPassword}
          style={[
            styles.input,
            {
              backgroundColor: Colors[theme].inputBackground,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            },
          ]}
          placeholderTextColor={Colors[theme].placeholder}
          secureTextEntry
        />
        <Input
          placeholder={t("changepassword.confirmPassword")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={[
            styles.input,
            {
              backgroundColor: Colors[theme].inputBackground,
              color: Colors[theme].text,
              borderColor: Colors[theme].border,
            },
          ]}
          placeholderTextColor={Colors[theme].placeholder}
          secureTextEntry
        />

        <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="bg-dark_violet justify-center items-center rounded-full p-4"
            style={{
              width: width * 0.9, // ekranın 90%-i
              maxWidth: 400,
              marginBottom: 20,
            }}
          >
            <Button text={t("changepassword.save")} />
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "90%",
    maxWidth: 400,
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
});
