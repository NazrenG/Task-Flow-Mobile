import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, Text, View } from "react-native";
import Header from "../../components/Header";

export default function Message() {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const goToChat = () => {
    navigation.navigate("chat/chatDetails");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Header onSearch={setSearchText} />
      <View
        style={{ flex: 1, width: width - 40, height: "auto", borderRadius: 11 }}
        className="bg-white mt-4 py-4 px-6"
      >
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 15,
          }}
        >
          <Text className="text-4xl">Messages</Text>
        </View>
        <Pressable onPress={goToChat}>
          <View className="flex flex-column p-3">
            <View className="flex flex-row">
              <Image
                style={{ width: width / 8, height: width / 8 }}
                source={require("../../assets/images/default-user.png")}
              />
              <View className="ml-5">
                <Text className="text-lg font-bold mb-2">Sevgi</Text>
                <Text className="text-gray-700">hello!</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "rgb(220, 220, 220)",
                width: "85%", // shorter line
                alignSelf: "flex-end", // move to the right
                marginTop: 8, // space between image and line
              }}
            />
          </View>
        </Pressable>
        {/* space */}
        <Pressable onPress={goToChat}>
          <View className="flex flex-column p-3">
            <View className="flex flex-row">
              <Image
                style={{ width: width / 8, height: width / 8 }}
                source={require("../../assets/images/default-user.png")}
              />
              <View className="ml-5">
                <Text className="text-lg font-bold mb-2">Sevgi</Text>
                <Text className="text-gray-700">hello!</Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: "rgb(220, 220, 220)",
                width: "85%", // shorter line
                alignSelf: "flex-end", // move to the right
                marginTop: 8, // space between image and line
              }}
            />
          </View>
        </Pressable>
        {/* <Text style={{ fontSize: 24 }}>{t("language")}</Text> */}
      </View>
    </View>
  );
}
