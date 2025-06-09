import { Text } from "react-native";
import { useFonts } from "expo-font";

export default function Title({ children }) {
 
  return (
    <Text
      style={{
        fontSize: 35,
              color: "#5D45FB",
        fontWeight: "bold",
        textAlign: "center",
      }}
    >
      {children}
    </Text>
  );
}
