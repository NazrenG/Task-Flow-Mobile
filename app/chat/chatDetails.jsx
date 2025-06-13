import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatDetail = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <View className="flex flex-row items-center gap-3 bg-gray-300 pt-[15vw] pb-6 px-5">
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color="gray" />
        </Pressable>
        <Image
          style={{ width: width / 9, height: width / 9 }}
          source={require("../../assets/images/default-user.png")}
        />
        <View>
          <Text className="text-lg font-bold ">Sevgi</Text>
          <Text className="text-gray-700 mt-1">online</Text>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* reciever */}
        <View style={{ width: width, padding: 10, alignItems: "flex-start" }}>
          <View className="flex flex-row gap-3">
            <Image
              style={{ width: width / 10, height: width / 10 }}
              source={require("../../assets/images/default-user.png")}
            />
            <View className="bg-bg_violet p-4" style={{ borderRadius: 10 }}>
              <Text>Hi!</Text>
            </View>
          </View>
        </View>
        {/* sender */}
        <View style={{ width: width, padding: 10, alignItems: "flex-end" }}>
          <View className="flex flex-row-reverse gap-3">
            <Image
              style={{ width: width / 10, height: width / 10 }}
              source={require("../../assets/images/default-user.png")}
            />
            <View className="bg-bg_violet p-4" style={{ borderRadius: 10 }}>
              <Text>hello!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        className="bg-gray-300 py-3 flex flex-row justify-center gap-3"
        style={{ width: width, height: width / 4 }}
      >
        {/* <Text>Enter something:</Text> */}
        <View>
          <TextInput
            style={{ width: width / 2 + 80, borderRadius: 15 }}
            className="bg-gray-200 py-2 px-3 mt-2"
            placeholderTextColor="black"
            placeholder="Type here..."
            value={text}
            onChangeText={setText}
          />
        </View>
        <View>
          <TouchableOpacity
            className="p-3 flex justify-center items-center bg-bg_violet"
            style={{ borderRadius: "100%" }}
          >
            <AntDesign name="link" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            className="p-3 flex justify-center items-center bg-darkPurple"
            style={{ borderRadius: "100%" }}
          >
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {/* <Text>You typed: {text}</Text> */}
      </View>
    </View>
  );
};

export default ChatDetail;
