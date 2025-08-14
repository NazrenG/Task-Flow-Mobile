import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function OtherCard({ text }) {
   const { theme } = useTheme();
  return (
    <View className="flex flex-row justify-between items-center p-3 rounded-md" style={{ backgroundColor: Colors[theme].background }}>
       <Text style={{ color: Colors[theme].text }}>{text}</Text>
      <TouchableOpacity
        onPress={() => console.log("Deleted")}
        className="p-2 bg-red-100 rounded-full"
      >
        <FontAwesome name="close" size={15} color="red" />
      </TouchableOpacity>
    </View>
  );
}
