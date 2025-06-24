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
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FriendCard from "../../components/friendsPageComponents/friendCard";
import UserCard from "../../components/friendsPageComponents/userCard";
import Header from "../../components/Header";
const width = Dimensions.get("window").width;

export default function Friends() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: (width / 2) * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="flex-1 items-center">
      <Header onSearch={setSearchText} />
      <View className="flex-1 w-[calc(100%-60px)] rounded-xl mx-[30px] my-[30px] bg-white">
        <View className="flex-row w-full border-b border-gray-300">
          <TouchableOpacity
            className="flex-1 items-center py-3"
            onPress={() => handleTabPress(0)}
          >
            <Text
              className={
                activeTab === 0 ? "font-bold text-black" : "text-gray-500"
              }
            >
              Your Friends
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
            >
              All Users
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          className="h-[3px] bg-purple-800 absolute top-10 left-0"
          style={{
            width: width / 2 - 60,
            transform: [{ translateX }],
          }}
        />

        <View className="p-5">
          {activeTab === 0 ? (
            <View className="flex-row flex-wrap justify-between p-1 gap-4">
              <FriendCard />
              <FriendCard />
              <FriendCard />
            </View>
          ) : (
            <UserCard />
          )}
        </View>
      </View>
    </View>
  );
}
