import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TextShortener from "../../constants/TextShortener";
import { fetchUnfollowRequest } from "../../utils/friendUtils";

const width = Dimensions.get("window").width;

const FriendCard = ({ name, email, image }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.userImage}
        source={
          image
            ? { uri: image }
            : require("../../assets/images/default-user.png")
        }
      />

      <View style={styles.userInfo}>
        <Text style={styles.userName}>{name}</Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="call" size={16} color="#6b7280" />
          <Text style={styles.infoText}>+994 88 888 88</Text>
        </View>
        <View style={styles.infoRow}>
          <Entypo name="mail" size={16} color="#6b7280" />
          <Text style={styles.infoText}>{TextShortener(email, 20)}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.messageButton]}>
            <Entypo name="message" size={16} color="white" />
            <Text style={styles.buttonText}>{t("friend.message")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.unfollowButton]}
            onPress={async () => {
              try {
                await fetchUnfollowRequest(name);
                console.log("Unfollowed successfully");
              } catch (error) {
                console.error("Error unfollowing:", error);
              }
            }}
          >
            <MaterialIcons name="person-remove" size={16} color="white" />
            <Text style={styles.buttonText}>{t("friend.unfollow")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FriendCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 18,
    padding: 16,
    marginVertical: 10,
    width: width - 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#7c3aed",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    color: "#6b7280",
    marginLeft: 6,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 12,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 10,
  },
  messageButton: {
    backgroundColor: "#8b5cf6",
  },
  unfollowButton: {
    backgroundColor: "#a855f7",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
