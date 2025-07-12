import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import Header from "../../components/Header";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";


const { width, height } = Dimensions.get("window");

const selectItem = {
  avatar: require('../../assets/images/default-user.png'),
  username: 'sevgi',
  email: 'sevgi.elesgerova@gmail.com',
  fullName: 'Sevgi Alasgarova',
  phone: '0559717465',
  department: 'Other (please specify)',
  country: 'Azerbaijan',
  gender: '',
  birthday: '',
};

export default function ProfileScreen() {
  const [searchText, setSearchText] = useState("");
  const [backgroundImage] = useState(require('../../assets/images/page.jpg'));
  const [avatar, setAvatar] = useState(selectItem.avatar);
    const { t } = useTranslation();
  

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need permission to access your gallery.");
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
    <SafeAreaView className="flex-1 bg-white">
      <Header onSearch={setSearchText} />

      {/* Back button */}
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
        <MaterialIcons name="arrow-back-ios" size={25} color="black" />
      </TouchableOpacity>

      <View style={{ position: "relative" }}>
        <ImageBackground
          source={backgroundImage}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Settings icon */}
          <TouchableOpacity
            style={styles.settingsIcon}
            onPress={() => router.push("/settings")}
          >
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>

          {/* Header camera icon */}
          <TouchableOpacity style={styles.headerCamera} onPress={pickImage}>
            <Feather name="camera" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        {/* Profile image */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={avatar}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          {/* Profile camera */}
          <TouchableOpacity style={styles.profileCamera} onPress={pickImage}>
            <Feather name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Username and email */}
      <View style={styles.nameSection}>
        <Text style={styles.username}>{selectItem.username}</Text>
        <Text style={styles.email}>{selectItem.email}</Text>
      </View>

      {/* Personal Info */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>{t("profile.info")}</Text>
        {[
          [t("profile.fullname"), selectItem.fullName],
          [t("profile.email"), selectItem.email],
          [t("profile.phone"), selectItem.phone],
          [t("profile.department"), selectItem.department],
          [t("profile.country"), selectItem.country],
          [t("profile.gender"), selectItem.gender || "—"],
          [t("profile.birthDate"), selectItem.birthday || "—"],
        ].map(([label, value], index) => (
          <Text key={index} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{label}: </Text>
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    color: "#000",
  },
  email: {
    fontSize: 16,
    color: "#555",
  },
  infoCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 16,
    marginTop: 24,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  infoItem: {
    fontSize: 16,
    color: "#555",
    marginBottom: 6,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#000",
  },
});
