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

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FriendCard from "../../components/friendsPageComponents/friendCard";
import UserCard from "../../components/friendsPageComponents/userCard";
import Header from "../../components/Header";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

const width = Dimensions.get("window").width;

export default function Friends() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: (width / 2) * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Header onSearch={setSearchText} />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors[theme].background,
        }}
      >
        <View
          style={{
            marginTop: 16,
            borderRadius: 12,
            padding: 12,
            marginHorizontal: 12,
            width: width - 24,
            backgroundColor: Colors[theme].card,
          }}
        >
          {/* Tabs */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: Colors[theme].border || "#ccc",
            }}
          >
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center", paddingVertical: 12 }}
              onPress={() => handleTabPress(0)}
            >
              <Text
                style={{
                  fontWeight: activeTab === 0 ? "bold" : "normal",
                  color:
                    activeTab === 0
                      ? Colors[theme].text
                      : Colors[theme].textSecondary,
                }}
              >
                {t("friend.yourFriends")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1, alignItems: "center", paddingVertical: 12 }}
              onPress={() => handleTabPress(1)}
            >
              <Text
                style={{
                  fontWeight: activeTab === 1 ? "bold" : "normal",
                  color:
                    activeTab === 1
                      ? Colors[theme].text
                      : Colors[theme].textSecondary,
                }}
              >
                {t("friend.allUsers")}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Animated underline */}
          <Animated.View
            style={{
              height: 3,
              backgroundColor: Colors[theme].primary || Colors.primary.darkPurple,
              position: "absolute",
              top: 50,
              left: 0,
              width: width / 2 - 20,
              transform: [{ translateX }],
            }}
          />

          {/* Content */}
          <View style={{ padding: 20 }}>
            {activeTab === 0 ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 16, justifyContent: "space-between" }}>
                <FriendCard />
                <FriendCard />
                <FriendCard />
              </View>
            ) : (
              <UserCard />
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
