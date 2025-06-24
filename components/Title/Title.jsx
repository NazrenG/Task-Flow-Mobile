import { Text } from "react-native";
import { useFonts } from "expo-font";
import { Colors } from "../../constants/Colors";

export default function Title({ children }) {
 
  return (
    <Text
      style={{
        fontSize: 35,
              color: Colors.primary.darkViolet,
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
}
