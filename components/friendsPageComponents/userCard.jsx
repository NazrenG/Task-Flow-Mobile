// import Entypo from "@expo/vector-icons/Entypo";
// import MaterialIcons from "@expo/vector-icons/MaterialIcons";
// import {
//   Dimensions,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import TextShortener from "../../constants/TextShortener.js";
// const width = Dimensions.get("window").width;

// const FriendCard = () => {
//   return (
//     <View
//       style={styles.userCard}
//       className="bg-white p-[5vw] rounded-md border border-gray-200 shadow-sm"
//     >
//       <Image
//         style={{ width: width / 9, height: width / 9 }}
//         source={require("../../assets/images/default-user.png")}
//       />
//       <Text className="font-bold text-base mt-3">Nezrin</Text>
//       <View style={styles.userInfo}>
//         <View className="flex flex-row justify-center items-center gap-1">
//           <MaterialIcons name="call" size={15} color="black" />
//           <Text className="text-gray-500 mt-2">055 999 88 77</Text>
//         </View>
//         <View className="flex flex-row justify-center items-center gap-1">
//           <Entypo name="mail" size={15} color="black" />
//           {/* <TextShortener data={"quliyeva@gmail.com"} count={16} /> */}
//         </View>

//         <View className="flex flex-row gap-2">
//           <TouchableOpacity className="bg-darkPurple" style={styles.button}>
//             <Text className="text-white">Message</Text>
//           </TouchableOpacity>
//           <TouchableOpacity className="bg-bg_violet" style={styles.button}>
//             <Text className="text-white">Unfollow</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default FriendCard;

// const styles = StyleSheet.create({
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
//     alignItems: "center",
//     // backgroundColor: "red",
//   },
//   button: {
//     borderRadius: 5,
//     marginTop: 14,
//     paddingVertical: 5,
//     paddingHorizontal: 6,
//   },
// });
import Entypo from "@expo/vector-icons/Entypo";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextShortener from "../../constants/TextShortener";
import { fetchFriendRequests } from "../../utils/friendUtils";

const width = Dimensions.get("window").width;

const UserCard = ({ name, email, image }) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [isSendFollowRequest, setIsSendFollowRequest] = useState(false);

  const handleFollow = async () => {
    try {
      const friendData = {
        ReceiverEmail: email,
        Text: `Friend request received at ${Date.now()}`,
        IsAccepted: false,
        NotificationType: "FriendRequest",
      };

      await fetchFriendRequests(friendData);
      setIsSendFollowRequest(true);
      console.log("Follow request sent successfully");
    } catch (error) {
      console.error("Error sending follow request:", error);
    }
  };

  return (
    <View style={[styles.userCard, styles.cardContainer]}>
      <Image
        style={styles.userImage}
        source={
          image
            ? { uri: image }
            : require("../../assets/images/default-user.png")
        }
      />
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
          <Entypo name="mail" size={15} color="black" />
          <Text>{TextShortener(email, 12)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={isSendFollowRequest}
            style={[
              styles.button,
              { backgroundColor: isSendFollowRequest ? "gray" : "#10B981" },
            ]}
            onPress={handleFollow}
          >
            <Text style={styles.buttonText}>{t("friend.follow")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewProfileButton}
            onPress={() => navigation.navigate("userdetails/index")}
          >
            <Text style={styles.viewProfileText}>
              {t("friend.viewProfile")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    width: width - 235,
  },
  userCard: {
    alignItems: "center",
    width: width / 3 + 10,
  },
  userImage: {
    width: width / 9,
    height: width / 9,
    borderRadius: width / 18,
  },
  userName: {
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 12,
  },
  userInfo: {
    width: width / 3 + 15,
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
  },
  infoText: {
    color: "#6b7280",
    marginLeft: 4,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
  },
  viewProfileButton: {
    backgroundColor: "#a5e8d8",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 6,
    borderColor: "#cfded9",
  },
  viewProfileText: {
    color: "#333",
    fontWeight: "500",
    fontSize: 11,
  },
});
