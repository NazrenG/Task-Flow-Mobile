import Entypo from "@expo/vector-icons/Entypo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import TextShortener from "../../constants/TextShortener";
import { fetchUnfollowRequest } from "../../utils/friendUtils";

const width = Dimensions.get("window").width;

const FriendCard = ({ name, email, image, isOnline = true }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: Colors[theme].card,
          shadowColor: Colors[theme].shadow,
        },
      ]}
    >
      {/* Profile Image with Online Status */}
      <View style={styles.imageWrapper}>
        <Image
          style={[styles.userImage, { borderColor: Colors[theme].primary }]}
          source={
            image
              ? { uri: image }
              : require("../../assets/images/default-user.png")
          }
        />

        <View
          style={[
            styles.statusDot,
            { backgroundColor: isOnline ? "green" : "gray" },
          ]}
        />
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={[styles.userName, { color: Colors[theme].text }]}>
          {name}
        </Text>

        <View style={styles.infoRow}>
          <MaterialIcons name="call" size={18} color={Colors[theme].icon} />
          <Text style={[styles.infoText, { color: Colors[theme].text }]}>
            +994 88 888 88
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Entypo name="mail" size={18} color={Colors[theme].icon} />
          <Text style={[styles.infoText, { color: Colors[theme].text }]}>
            {TextShortener(email, 20)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: Colors[theme].primary }]}
          >
            <Entypo name="message" size={18} color="white" />
            <Text style={styles.buttonText}>{t("friend.message")}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[theme].secondary },
            ]}
            onPress={async () => {
              try {
                await fetchUnfollowRequest(name);
                console.log("Unfollowed successfully");
              } catch (error) {
                console.error("Error unfollowing:", error);
              }
            }}
          >
            <MaterialIcons name="person-remove" size={18} color="white" />
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
    borderRadius: 20,
    padding: 16,
    marginVertical: 5,
    width: width - 50,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  imageWrapper: {
    position: "relative",
  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2.5,
    marginRight: 16,
  },
  statusDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
    position: "absolute",
    bottom: 0,
    right: 15,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
  },
  buttonContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 8, // iOS 17+ və RN yeni versiyada dəstəklənir
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 25,
    minWidth: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 8,
  },
});
