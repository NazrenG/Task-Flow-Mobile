import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function ReminderCard({ date, message }) {
    const { theme } = useTheme();

  return (
    <View className="flex flex-row justify-between items-center p-3 rounded-md" style={{ backgroundColor: Colors[theme].background }}>
      <View>
        <Text className=" font-medium" style={{ color: Colors[theme].text }}>{date}</Text>
        <Text className="text-gray-600">{message}</Text>
      </View>
      <TouchableOpacity
        onPress={() => console.log("Deleted")}
        className="p-2 bg-red-100 rounded-full"
      >
        <FontAwesome name="close" size={15} color="red" />
      </TouchableOpacity>
    </View>
  );
}
