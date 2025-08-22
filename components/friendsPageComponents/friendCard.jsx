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
      <Image
        style={[styles.userImage ,{ borderColor: Colors[theme].primary }]}
        source={
          image
            ? { uri: image }
            : require("../../assets/images/default-user.png")
        }
      />
      <Text style={[styles.userName, { color: Colors[theme].text }]}>{name}</Text>
      <View style={styles.userInfo}>
        <View style={styles.infoRow}>
              <MaterialIcons name="call" size={15} color={Colors[theme].text} />
          <Text style={[styles.infoText, { color: Colors[theme].mutedText }]}>88 8 8 8</Text>
        </View>
        <View style={styles.infoRow}>
          <Entypo name="mail" size={15}  color={Colors[theme].text} />
          <Text style={{ color: Colors[theme].mutedText }}>{TextShortener(email, 16)}</Text>
        </View>

        {/* Actions */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: Colors[theme].primary },
            ]}
          >
            <Text style={styles.buttonText}>{t("friend.message")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.unfollowButton ,{ backgroundColor: Colors[theme].secondary }]} onPress={async () => {
            try {
              await fetchUnfollowRequest(name);
              console.log("Unfollowed successfully");
            } catch (error) {
              console.error("Error unfollowing:", error);
            }
          }}>
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
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
    width: "90%",          // daha geniş və adaptiv
    maxWidth: width / 2.5, // limit qoyuruq ki, çox böyüməsin
    marginBottom: 14,
    alignSelf: "center",   // ortada olsun
  },
  userImage: {
    width: width / 7,
    height: width / 7,
    borderRadius: width / 14,
    borderWidth: 2,
    marginBottom: 10,
  },
  userName: {
    fontWeight: "600",
    fontSize: 18,
    marginBottom: 8,
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
    opacity: 0.8,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
});
