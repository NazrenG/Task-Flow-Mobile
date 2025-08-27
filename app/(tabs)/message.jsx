// app/(tabs)/message.jsx
{
  /* <View
              style={{
                height: 1,
                backgroundColor: "rgb(220, 220, 220)",
                width: "85%",
                alignSelf: "flex-end",
                marginTop: 8,
              }}
              /> */
}

// import AntDesign from "@expo/vector-icons/AntDesign";
// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import { useNavigation } from "@react-navigation/native";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Dimensions,
//   Image,
//   Linking,
//   Modal,
//   Pressable,
//   SafeAreaView,
//   Text,
//   View
// } from "react-native";
// import Header from "../../components/Header";

// export default function Message() {
//   const navigation = useNavigation();
//   const width = Dimensions.get("window").width;
//   const [modalVisible, setModalVisible] = useState(false);
//   const { t } = useTranslation();
//   const [searchText, setSearchText] = useState("");
//   const goToChat = () => {
//     navigation.navigate("chat/chatDetails");
//   };

//   return (
//     <>
//           <Header onSearch={setSearchText} />
//     <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

//       <View
//         style={{ flex: 1, width: width - 40, height: "auto", borderRadius: 11 }}
//         className="bg-white mt-4 py-4 px-6"
//       >
//         <View
//           style={{
//             borderBottomColor: "black",
//             borderBottomWidth: 1,
//             paddingBottom: 10,
//             marginBottom: 15,
//           }}
//         >
//             <Text className="text-2xl font-semibold text-black">{t("chat.message")}</Text>
//         </View>

//         {/* space */}
//         <View>
//           <View className="flex flex-column p-3">
//             <View className="flex flex-row justify-between">
//               <Pressable onPress={() => setModalVisible(true)}>
//                 <Image
//                   style={{
//                     width: width / 9,
//                     height: width / 9,
//                   }}
//                   source={require("../../assets/images/default-user.png")}
//                 />
//               </Pressable>
//               <Pressable
//                 onPress={goToChat}
//                 className="ml-3"
//                 style={{
//                   width: width / 2 - 17,
//                   alignItems: "baseline",
//                 }}
//               >
//                 <Text className="text-lg font-bold mb-2">Zehra</Text>
//                 <Text className="text-gray-700">hello!</Text>
//               </Pressable>
//               <View className="flex felx-column gap-3 items-end">
//                 <Pressable
//                   onPress={() => {
//                     ///
//                   }}
//                 >
//                   <Entypo name="dots-three-vertical" size={20} color="black" />
//                 </Pressable>
//                 <Text className="text-gray-400">6/12/2025</Text>
//               </View>
//             </View>
//             <View
//               style={{
//                 height: 1,
//                 backgroundColor: "rgb(220, 220, 220)",
//                 width: "85%",
//                 alignSelf: "flex-end",
//                 marginTop: 8,
//               }}
//               />
//           </View>
//         </View>
//         {/* <Text style={{ fontSize: 24 }}>{t("language")}</Text> */}
//       </View>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <Pressable
//           onPress={() => setModalVisible(false)}
//           className="flex-1 bg-black/50 justify-center items-center"
//           >
//           <Pressable
//             onPress={() => {}}
//             className="bg-white p-6 rounded-xl w-3/4 items-center gap-6"
//             >
//             <Image
//               style={{
//                 width: width / 2,
//                 height: width / 2,
//               }}
//               source={require("../../assets/images/default-user.png")}
//               />
//             <View className="flex flex-row justify-around w-full ">
//               <Pressable
//                 onPress={() => Linking.openURL("mailto:example@email.com")}
//                 >
//                 <Entypo name="mail" size={24} color="black" />
//               </Pressable>
//               <View className="w-px h-7 bg-black" />
//               <Pressable onPress={() => Linking.openURL("tel:+123456789")}>
//                 <MaterialIcons name="call" size={24} color="black" />
//               </Pressable>
//               <View className="w-px h-7 bg-black" />
//               <Pressable
//                 onPress={() => {
//                   navigation.navigate("chat/chatDetails");
//                   setModalVisible(false);
//                 }}
//                 >
//                 <AntDesign name="message1" size={24} color="black" />
//               </Pressable>
//             </View>
//           </Pressable>
//         </Pressable>
//       </Modal>
//     </SafeAreaView>
//                 </>
//   );
// }
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  Linking,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { fetchChatList } from "../../utils/fetchUtils";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function Message() {
  const navigation = useNavigation();
  const width = Dimensions.get("window").width;
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const { theme } = useTheme();

  const goToChat = () => {
    navigation.navigate("chat/chatDetails");
  };

  useEffect(() => {
    const getData = async () => {
      console.log("in useeffect message");
      const response = await fetchChatList();
      console.log("response chat: " + JSON.stringify(response));
      const list = response.list;
      setChatList(list);
    };
    getData();
  }, []);

  return (
    <>
      <Header onSearch={setSearchText} />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Colors[theme].background,
        }}
      >
        <View
          style={{
            flex: 1,
            width: width - 40,
            borderRadius: 11,
            backgroundColor: Colors[theme].card,
            marginTop: 16,
            paddingVertical: 16,
            paddingHorizontal: 24,
          }}
          className="bg-white mt-4 py-4 px-6"
        >
          <View
            style={{
              borderBottomColor: Colors[theme].text,
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 15,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "600",
                color: Colors[theme].text,
              }}
            >
              {t("chat.message")}
            </Text>
          </View>

          {/* space */}
          {chatList && chatList.length > 0 ? (
            chatList.map((chat, index) => (
              <View key={index}>
                <View className="flex flex-column p-3">
                  <View className="flex flex-row justify-between">
                    <Pressable
                      onPress={() => {
                        setSelectedChat(chat);
                        setModalVisible(true);
                      }}
                    >
                      <Image
                        style={{
                          width: width / 9,
                          height: width / 9,
                        }}
                        source={require("../../assets/images/default-user.png")}
                      />
                    </Pressable>
                    <Pressable
                      onPress={goToChat}
                      className="ml-3"
                      style={{
                        width: width / 2 - 17,
                        alignItems: "baseline",
                      }}
                    >
                      <Text className="text-lg font-bold mb-2">
                        {chat.friendFullname}
                      </Text>
                      <Text className="text-gray-700"></Text>
                    </Pressable>
                    <View className="flex felx-col gap-3 items-end">
                      <Pressable
                        onPress={() => {
                          ///
                        }}
                      >
                        <Entypo
                          name="dots-three-vertical"
                          size={20}
                          color="black"
                        />
                      </Pressable>
                      <Text className="text-gray-400">6/12/2025</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "rgb(220, 220, 220)",
                      width: "85%",
                      alignSelf: "flex-end",
                      marginTop: 8,
                    }}
                  />
                </View>
              </View>
            ))
          ) : (
            <>
              <LottieView
                source={require("../../assets/animations/Empty-Search.json")}
                autoPlay
                loop
                style={{ width: 350, height: 170 }}
              />
            </>
          )}

          {/* <Text style={{ fontSize: 24 }}>{t("language")}</Text> */}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <Pressable
            onPress={() => setModalVisible(false)}
            className="flex-1 bg-black/50 justify-center items-center"
          >
            <Pressable
              onPress={() => {}}
              className="bg-white p-6 rounded-xl w-3/4 items-center gap-6"
            >
              <Image
                style={{
                  width: width / 2,
                  height: width / 2,
                }}
                source={
                  selectedChat?.friendImg
                    ? selectedChat.friendImg
                    : require("../../assets/images/default-user.png")
                }
              />
              <View className="flex flex-row justify-around w-full ">
                <Pressable
                  onPress={() => Linking.openURL("mailto:example@email.com")}
                >
                  <Entypo name="mail" size={24} color="black" />
                </Pressable>
                <View className="w-px h-7 bg-black" />
                <Pressable onPress={() => Linking.openURL("tel:+123456789")}>
                  <MaterialIcons name="call" size={24} color="black" />
                </Pressable>
                <View className="w-px h-7 bg-black" />
                <Pressable
                  onPress={() => {
                    navigation.navigate("chat/chatDetails");
                    setModalVisible(false);
                  }}
                >
                  <AntDesign name="message1" size={24} color="black" />
                </Pressable>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </SafeAreaView>
    </>
  );
}
