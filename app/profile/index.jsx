import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router"; // üst tərəfə əlavə et
import { useState } from 'react';

import {
  Dimensions,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
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
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/images/page.jpg'));
  const navigation = useNavigation();

  return (
    <>
      <Header onSearch={setSearchText} />

      <View style={{ position: "relative" }}>

        <TouchableOpacity
          style={{ position: "absolute", top: 24, left: 20, zIndex: 10 }}
          onPress={() => navigation.navigate('(tabs)')}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        <ImageBackground
          source={backgroundImage}
          style={{
            width: width,
            height: height * 0.3,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
          resizeMode="cover"
        >
          <TouchableOpacity style={{ position: "absolute", top: 24, right: 20, zIndex: 10 }}
            onPress={() => router.push("/settings")}>
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 16,
              right: 20,
              padding: 10,
              borderRadius: 50,
              backgroundColor: "white",
              zIndex: 10,
            }}
          >
            <Feather name="camera" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        <View
          style={{
            position: "absolute",
            bottom: -64,
            left: width / 2 - 64,
            zIndex: 20,
          }}
        >
          <View
            style={{
              width: 128,
              height: 128,
              borderRadius: 64,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
              elevation: 6,
            }}
          >
            <Image
              source={selectItem.avatar}
              style={{
                width: 112,
                height: 112,
                borderRadius: 56,
              }}
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "white",
              padding: 6,
              borderRadius: 999,
              elevation: 3,
            }}
          >
            <Feather name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ marginTop: 80, alignItems: "center" }}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>{selectItem.username}</Text>
        <Text style={{ fontSize: 16, color: "#555" }}>{selectItem.email}</Text>
      </View>

      <View
        style={{
          backgroundColor: "white",
          borderRadius: 20,
          padding: 20,
          marginHorizontal: 16,
          marginTop: 24,
          elevation: 3,
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000", marginBottom: 10 }}>
          Personal Info
        </Text>

        {[
          ["Full Name", selectItem.fullName],
          ["Email", selectItem.email],
          ["Phone Number", selectItem.phone],
          ["Department", selectItem.department],
          ["Country", selectItem.country],
          ["Gender", selectItem.gender || "—"],
          ["Birthday", selectItem.birthday || "—"],
        ].map(([label, value], index) => (
          <Text key={index} style={{ fontSize: 16, color: "#555", marginBottom: 6 }}>
            <Text style={{ fontWeight: "bold", color: "#000" }}>{label}: </Text>
            {value}
          </Text>
        ))}
      </View>
    </>
  );
}
