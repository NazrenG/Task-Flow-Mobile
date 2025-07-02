import { Feather, MaterialIcons } from '@expo/vector-icons';
import { router } from "expo-router";
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import Header from "../../components/Header";

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

  return (
    <>
      <Header onSearch={setSearchText} />

      {/* Back button - absolute on top layer */}
      <TouchableOpacity
  style={{
    position: "absolute",
    top: 100, // əvvəl 60 idi, indi daha aşağı
    left: 20,
    zIndex: 1,
    color: "black",
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
          <TouchableOpacity style={styles.headerCamera}>
            <Feather name="camera" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        {/* Profile image */}
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={selectItem.avatar}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>

          {/* Profile camera */}
          <TouchableOpacity style={styles.profileCamera}>
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
        <Text style={styles.infoTitle}>Personal Info</Text>
        {[
          ["Full Name", selectItem.fullName],
          ["Email", selectItem.email],
          ["Phone Number", selectItem.phone],
          ["Department", selectItem.department],
          ["Country", selectItem.country],
          ["Gender", selectItem.gender || "—"],
          ["Birthday", selectItem.birthday || "—"],
        ].map(([label, value], index) => (
          <Text key={index} style={styles.infoItem}>
            <Text style={styles.infoLabel}>{label}: </Text>
            {value}
          </Text>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 60, // status bar hündürlüyünə uyğun
    left: 20,
    zIndex: 999,
    backgroundColor: "#ffffffcc",
    borderRadius: 999,
    padding: 4,
  },
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
