import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
const width = Dimensions.get("window").width;

const UserCard = () => {
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
          <TouchableOpacity className="bg-green" style={styles.button}>
            <Text className="text-white">Follow</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  userCard: {
    alignItems: "center",
    width: width / 3 + 15,
  },
  userInfo: {
    width: width / 3 + 15,
    alignItems: "baseline",
  },
  button: {
    borderRadius: 5,
    marginTop: 14,
    paddingVertical: 5,
    paddingHorizontal: 6,
  },
});
