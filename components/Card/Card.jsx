// components/TaskCard.js
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const { width } = Dimensions.get("window");

export default function Card({ title, count, color, icon, gradient }) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: color }]}
      activeOpacity={0.8}
    >
      <View style={styles.cardContent}>
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={gradient}
            style={{
              width: 30,
              height: 30,
              borderRadius: 9999,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {icon}
          </LinearGradient>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardCount}>{count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 2 - 32,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
  cardCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 4,
  },
});
