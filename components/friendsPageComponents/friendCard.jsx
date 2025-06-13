import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const width = Dimensions.get("window").width;

const FriendCard = () => {
  return (
    <View style={styles.userCard}>
      <Image
        style={{ width: width / 9, height: width / 9 }}
        source={require("../../assets/images/default-user.png")}
      />
      <Text className="font-bold text-base mt-3">Nezrin</Text>
      <View style={styles.userInfo}>
        <Text className="text-gray-500 mt-2">Back-end Developer</Text>

        <View className="flex flex-row gap-2">
          <TouchableOpacity className="bg-darkPurple" style={styles.button}>
            <Text className="text-white">Message</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-bg_violet" style={styles.button}>
            <Text className="text-white">Unfollow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  userCard: {
    // display: "flex",
    // flexDirection: "row",
    alignItems: "center",
    // boxShadow: "offsite",
    // backgroundColor: "red",
    width: width / 3 + 15,
  },
  userInfo: {
    // marginLeft: 20,
    width: width / 3 + 15,
    // marginTop: 10,
    alignItems: "baseline",
    // backgroundColor: "red",
  },
  button: {
    borderRadius: 5,
    marginTop: 14,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
});
