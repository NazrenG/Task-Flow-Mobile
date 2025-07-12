import { FontAwesome } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function OtherCard({ text }) {
  return (
    <View className="bg-gray-50 p-3 rounded-lg justify-between flex-row items-center">
      <Text className="text-gray-700">{text}</Text>
      <TouchableOpacity
        onPress={() => console.log("Deleted")}
        className="p-2 bg-red-100 rounded-full"
      >
        <FontAwesome name="close" size={15} color="red" />
      </TouchableOpacity>
    </View>
  );
}
