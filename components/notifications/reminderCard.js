import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function ReminderCard({  date, message }) {
  return (
    <View 
      className="flex-row justify-between items-center bg-gray-50 p-3 rounded-lg"
    >
      <View>
        <Text className="text-gray-800 font-medium">{date}</Text>
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
