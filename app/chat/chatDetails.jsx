import { useTheme } from "@/components/ThemeContext";
import { Colors } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
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
import { fetchAllMessages } from "../../utils/chatUtils";

const ChatDetail = () => {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [text, setText] = useState("");
  const route = useRoute();
  const { email } = route.params;
  const { theme } = useTheme();
  const [messageList, setMessageList] = useState([]);
  const [friend, setFriend] = useState([]);

  const handleSendBtn = async () => {};

  useEffect(() => {
    const getDatas = async () => {
      const response = await fetchAllMessages(email);
      setMessageList(response.list);
      setFriend(response.friend);
    };
    getDatas();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      {/* Header */}
      <View
        className="flex flex-row items-center gap-3 pt-[15vw] pb-6 px-5"
        style={{ backgroundColor: Colors[theme].inputBg }}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={20} color={Colors[theme].icon} />
        </Pressable>
        <Image
          style={{ width: width / 9, height: width / 9 }}
          source={
            friend.image
              ? friend.image
              : require("../../assets/images/default-user.png")
          }
        />
        <View>
          <Text
            className="text-lg font-bold"
            style={{ color: Colors[theme].text }}
          >
            {friend.fullname}
          </Text>
          <Text style={{ color: Colors[theme].placeholder, marginTop: 4 }}>
            {friend.inOnline ? "Online" : "Offline"}
          </Text>
        </View>
      </View>

      {/* Messages */}
      <ScrollView
        style={{ flex: 1 }}
        keyboardShouldPersistTaps="handled" // buranı əlavə etdim
      >
        {messageList.length > 0 ? (
          messageList.map((msg, index) =>
            msg.isSender ? (
              <View
                key={index}
                style={{ width: width, padding: 10, alignItems: "flex-end" }}
              >
                <View className="flex flex-row-reverse gap-3">
                  <Image
                    style={{ width: width / 10, height: width / 10 }}
                    source={
                      msg.image
                        ? msg.image
                        : require("../../assets/images/default-user.png")
                    }
                  />
                  <View
                    style={{
                      backgroundColor: Colors.secondary.bg_violet,
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <Text style={{ color: Colors.light.text }}>{msg.text}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View
                key={index}
                style={{ width: width, padding: 10, alignItems: "flex-start" }}
              >
                <View className="flex flex-row gap-3">
                  <Image
                    style={{ width: width / 9, height: width / 9 }}
                    source={
                      msg.image
                        ? msg.image
                        : require("../../assets/images/default-user.png")
                    }
                  />
                  <View
                    style={{
                      backgroundColor: Colors.secondary.bg_violet,
                      borderRadius: 10,
                      padding: 12,
                    }}
                  >
                    <Text style={{ color: Colors.light.text }}>{msg.text}</Text>
                  </View>
                </View>
              </View>
            )
          )
        ) : (
          <View style={{ alignItems: "center", marginTop: 40 }}>
            <LottieView
              source={require("../../assets/animations/Hello.json")}
              autoPlay
              loop
              style={{ width: 300, height: 300 }}
            />
            <Text style={{ fontSize: 18, marginTop: 10, fontWeight: "500" }}>
              Say Hi!
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Footer */}
      <View
        className="py-3 flex flex-row justify-center gap-3"
        style={{
          backgroundColor: Colors[theme].inputBg,
          width: width,
          height: width / 4,
        }}
      >
        <View>
          <TextInput
            style={{
              width: width / 2 + 80,
              borderRadius: 15,
              backgroundColor: Colors[theme].background,
              color: Colors[theme].text,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginTop: 8,
            }}
            placeholderTextColor={Colors[theme].placeholder}
            placeholder="Type here..."
            value={text}
            onChangeText={setText}
          />
        </View>

        <View>
          <TouchableOpacity
            className="p-3 flex justify-center items-center"
            style={{
              borderRadius: 100,
              backgroundColor: Colors.secondary.bg_violet,
            }}
          >
            <AntDesign name="link" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            className="p-3 flex justify-center items-center"
            style={{
              borderRadius: 100,
              backgroundColor: Colors.primary.darkPurple,
            }}
          >
            <MaterialCommunityIcons name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatDetail;
