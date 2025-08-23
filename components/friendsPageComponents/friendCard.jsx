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

const FriendCard = ({ name, email, image }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: Colors[theme].card,
          borderColor: Colors[theme].border,
        },
      ]}
    >
      {/* Avatar */}
      <View style={styles.avatarWrapper}>
        <Image
          style={[styles.userImage, { borderColor: Colors[theme].primary }]}
          source={
            image
              ? { uri: image }
              : require("../../assets/images/default-user.png")
          }
        />
      </View>

      {/* Name */}
      <Text style={[styles.userName, { color: Colors[theme].text }]}>
        {name}
      </Text>

      {/* Info */}
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
          <MaterialIcons name="call" size={16} color={Colors[theme].primary} />
          <Text
            style={[styles.infoText, { color: Colors[theme].mutedText }]}
          >
            88 8 8 8
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Entypo name="mail" size={16} color={Colors[theme].primary} />
          <Text style={{ color: Colors[theme].mutedText }}>
            {TextShortener(email, 18)}
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[theme].primary },
            ]}
          >
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
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    alignItems: "center",
    width: "90%",
    maxWidth: width / 2.3,
    marginBottom: 18,
    alignSelf: "center",
  },
  avatarWrapper: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.05)",
    marginBottom: 10,
  },
  userImage: {
    width: width / 6.5,
    height: width / 6.5,
    borderRadius: width / 13,
    borderWidth: 2,
  },
  userName: {
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 6,
  },
  userInfo: {
    width: "100%",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    opacity: 0.85,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  button: {
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 14,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "600",
  },
});
