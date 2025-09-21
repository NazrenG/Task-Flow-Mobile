// import { useRef, useState } from "react";
// import { useTranslation } from "react-i18next";
// import {
//   Animated,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import FriendCard from "../../components/friendsPageComponents/friendCard";
// import UserCard from "../../components/friendsPageComponents/userCard";
// import Header from "../../components/Header";
// import { Colors } from "../../constants/Colors";

// const width = Dimensions.get("window").width;
// export default function Friends() {
//   const { t } = useTranslation();
//   const [searchText, setSearchText] = useState("");

//   const [activeTab, setActiveTab] = useState(0);
//   const translateX = useRef(new Animated.Value(0)).current;

//   const handleTabPress = (index) => {
//     setActiveTab(index);
//     Animated.spring(translateX, {
//       toValue: (width / 2) * index,
//       useNativeDriver: true,
//     }).start();
//   };

//   return (
//     <View style={{ flex: 1, alignItems: "center" }}>
//       <Header onSearch={setSearchText} />
//       <View style={styles.container}>
//         {/* Tabs */}
//         <View style={styles.tabContainer}>
//           <TouchableOpacity
//             style={styles.tab}
//             onPress={() => handleTabPress(0)}
//           >
//             <Text
//               style={activeTab === 0 ? styles.activeText : styles.inactiveText}
//             >
//               Your Friends
//             </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.tab}
//             onPress={() => handleTabPress(1)}
//           >
//             <Text
//               style={activeTab === 1 ? styles.activeText : styles.inactiveText}
//             >
//               All Users
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Animated underline */}
//         <Animated.View
//           style={[
//             styles.underline,
//             {
//               transform: [{ translateX }],
//             },
//           ]}
//         />

//         {/* Content */}
//         <View style={styles.content}>
//           {activeTab === 0 ? (
//             <View className="flex-row flex-wrap justify-between p-2 gap-[5vw]">
//               <FriendCard></FriendCard> <FriendCard></FriendCard>
//               <FriendCard></FriendCard>
//             </View>
//           ) : (
//             <UserCard></UserCard>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     width: width - 30,
//     height: "auto",
//     borderRadius: 15,
//     margin: 30,
//     backgroundColor: "white",
//   },
//   tabContainer: {
//     flexDirection: "row",
//     width: width - 30,
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     display: "flex",
//   },
//   tab: {
//     flex: 1,
//     alignItems: "center",
//     paddingVertical: 12,
//   },
//   activeText: {
//     fontWeight: "bold",
//     color: "black",
//   },
//   inactiveText: {
//     color: "#777",
//   },
//   underline: {
//     height: 3,
//     width: width / 2 - 30,
//     backgroundColor: Colors.primary.darkPurple,
//     position: "absolute",
//     top: 40,
//     left: 0,
//   },
//   content: {
//     padding: 20,

//     // alignItems: "center",
//   },
//   userCard: {
//     // display: "flex",
//     // flexDirection: "row",
//     alignItems: "center",
//     // boxShadow: "offsite",
//     // backgroundColor: "red",
//     width: width / 3 + 15,
//   },
//   userInfo: {
//     // marginLeft: 20,
//     width: width / 3 + 15,
//     // marginTop: 10,
//     alignItems: "baseline",
//     // backgroundColor: "red",
//   },
//   button: {
//     borderRadius: 5,
//     marginTop: 14,
//     paddingVertical: 5,
//     paddingHorizontal: 6,
//   },
// });
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FriendCard from "../../components/friendsPageComponents/friendCard";
import UserCard from "../../components/friendsPageComponents/userCard";
import Header from "../../components/Header";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { getToken } from "../../secureStore";
import { startSignalRConnection } from "../../SignalR";
import { fetchAllFriends, fetchAllUsers } from "../../utils/friendUtils";
const width = Dimensions.get("window").width;

export default function Friends() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const { theme } = useTheme();

  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: (width / 2) * index,
      useNativeDriver: true,
    }).start();
  };
  const fetchData = async () => {
    try {
      const friendsData = await fetchAllFriends();
      const usersData = await fetchAllUsers();
      setUsers(usersData);
      setFriends(friendsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const hubConnection = async () => {
      const token = getToken("authToken");
      const conn = await startSignalRConnection(URL, token);
      conn.on("UpdateUserActivity", () => {
        fetchData();
      });
    };
    hubConnection();
  }, []);

  return (
    <>
      <Header onSearch={setSearchText} />
      <SafeAreaView
        className="flex-1 items-center"
        style={{ backgroundColor: Colors[theme].background }}
      >
        <View
          className="  mt-4  rounded-xl p-3 mx-3 bg-white"
          style={{ backgroundColor: Colors[theme].card }}
        >
          <View className="flex-row w-full border-b border-gray-300">
            <TouchableOpacity
              className="flex-1 items-center py-3"
              onPress={() => handleTabPress(0)}
            >
              <Text
                className={
                  activeTab === 0 ? "font-bold text-black" : "text-gray-500"
                }
                style={{ color: Colors[theme].text }}
              >
                {t("friend.yourFriends")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 items-center py-3"
              onPress={() => handleTabPress(1)}
            >
              <Text
                className={
                  activeTab === 1 ? "font-bold text-black" : "text-gray-500"
                }
                style={{ color: Colors[theme].text }}
              >
                {t("friend.allUsers")}
              </Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            className="h-[3px] bg-purple-800 absolute top-[50] "
            style={{
              width: width / 2 - 20,
              transform: [{ translateX }],
            }}
          />

          <View className="p-1 mt-4 mb-10" style={{ height: "75vh" }}>
            {activeTab === 0 ? (
              <ScrollView>
                <View className="flex-row flex-wrap justify-start p-1 gap-7 ml-1">
                  {friends.length > 0 ? (
                    friends.map((friend, index) => (
                      <FriendCard
                        key={index}
                        name={friend.friendName}
                        email={friend.friendEmail}
                        image={friend.friendPhoto}
                        isOnline={friend.isOnline}
                      />
                    ))
                  ) : (
                    <LottieView
                      source={require("../../assets/animations/Empty-Search.json")}
                      autoPlay
                      loop
                      style={{ width: 350, height: 170 }}
                    />
                  )}
                </View>
              </ScrollView>
            ) : users.length > 0 ? (
              <ScrollView>
                <View className="flex-row flex-wrap justify-start p-1 gap-4 ml-1">
                  {users.map((user) => (
                    <UserCard key={user.id} id={user.id} user={user} />
                  ))}
                </View>
              </ScrollView>
            ) : (
              <LottieView
                source={require("../../assets/animations/Empty-Search.json")}
                autoPlay
                loop
                style={{ width: 350, height: 170 }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
