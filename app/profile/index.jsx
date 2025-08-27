import { Feather, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import Header from "../../components/Header";
import { Colors } from '../../constants/Colors'; 
import { useTheme } from "../../components/ThemeContext";

import { fetchProfileData } from "../../utils/fetchUtils";

const { width, height } = Dimensions.get("window");

export default function ProfileScreen() {
  const { theme } = useTheme();
  const [searchText, setSearchText] = useState("");
  const [backgroundImage] = useState(require("../../assets/images/page.jpg"));
  const [avatar, setAvatar] = useState(
    require("../../assets/images/default-user.png")
  );
  const { t } = useTranslation();
  const [profile, setProfile] = useState({
    fullName: "-",
    email: "-",
    phone: "-",
    department: "-",
    country: "-",
    gender: "-",
    birthday: "-",
    path: require("../../assets/images/default-user.png"),
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchProfileData();
      setProfile(response);
      console.log(JSON.stringify(profile, null, 2));
    };
    fetchData();
  }, []);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need permission to access your gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setAvatar({ uri: selectedUri });
      console.log("Selected image URI:", selectedUri);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <Header onSearch={setSearchText} />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          zIndex: 1,
          borderRadius: 999,
          padding: 6,
        }}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back-ios" size={25} color={Colors[theme].card} />
      </TouchableOpacity>

      <View style={{ position: "relative" }}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => router.push("/settings")}
          >
            <Feather name="settings" size={24} color={Colors[theme].card} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.headerCamera, { backgroundColor: Colors[theme].card }]}
            onPress={pickImage}
          >
            <Feather name="camera" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.profileImageContainer}>
          <View style={[styles.profileImageWrapper , { backgroundColor: Colors[theme].card }]}>
            <Image
              source={profile.image ? profile.image : avatar}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            style={[styles.profileCamera, { backgroundColor: Colors[theme].card }]}
            onPress={pickImage}
          >
            <Feather name="camera" size={20} color={Colors[theme].icon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.nameSection}>
        <Text style={[styles.username , { color: Colors[theme].text }]}>{profile.username}</Text>
        <Text style={[styles.email, { color: Colors[theme].secondaryText }]}>{profile.email}</Text>
      </View>

      <View style={[styles.infoCard, { backgroundColor: Colors[theme].card }]}>
        <Text style={[styles.infoTitle, { color: Colors[theme].text }]}>
          {t("profile.info")}
        </Text>
        {[
          [t("profile.fullname"), profile.fullname],
          [t("profile.email"), profile.email],
          [t("profile.phone"), profile.phone || "—"],
          [t("profile.department"), profile.occupation],
          [t("profile.country"), profile.country || "—"],
          [t("profile.gender"), profile.gender || "—"],
          [t("profile.birthDate"), profile.birthday || "—"],
        ].map(([label, value], index) => (
          <Text key={index} style={[styles.infoItem, { color: Colors[theme].secondaryText }]}>
            <Text style={[styles.infoLabel, { color: Colors[theme].text }]}>{label}: </Text>
            {value}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height * 0.3,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  settingsIcon: {
    position: "absolute",
    top: 24,
    right: 20,
    zIndex: 10,
  },
  headerCamera: {
    position: "absolute",
    bottom: 16,
    right: 20,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  profileImageContainer: {
    position: "absolute",
    bottom: -64,
    left: width / 2 - 64,
    zIndex: 20,
  },
  profileImageWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 6,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  profileCamera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 6,
    borderRadius: 999,
    elevation: 3,
  },
  nameSection: {
    marginTop: 80,
    alignItems: "center",
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    fontSize: 16,
  },
  infoCard: {
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 16,
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: "bold",
  },
});
