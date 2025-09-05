import { Feather, FontAwesome } from "@expo/vector-icons";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { fetchAcceptRequestNotification,fetchRejectRequestNotification } from "../../utils/notificationUtils";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
export default function RequestCard({
  request,
  user,
  message,
  onAccept,
  onReject,
}) {
  const handleAccept = async () => {
    try {
      await fetchAcceptRequestNotification(request.requestId);  
      onAccept();
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  const { theme } = useTheme();

  const handleReject = async () => {
    try {
      await fetchRejectRequestNotification(request.requestId);  
      onReject();
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

  return (
    <View className="bg-white rounded-xl shadow shadow-slate-300 px-2 py-3 mb-3 flex-row items-center justify-between" style={{ backgroundColor: Colors[theme].card }}>
      <View className="flex-row items-start space-x-3 w-[70%] gap-1">
        <Image source={user.avatar} className="w-10 h-10 rounded-full mt-1" />
        <View className="flex-col">
          <Text className="font-semibold text-gray-800">{user.name}</Text>
          <Text className="text-gray-600 text-sm mt-1" numberOfLines={2}>
            {message}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center space-x-2 gap-1">
        <TouchableOpacity
          onPress={handleAccept}
          className="p-2 bg-light_green rounded-full"
        >
          <Feather name="check" size={15} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleReject}
          className="p-2 bg-red-100 rounded-full"
        >
          <FontAwesome name="close" size={15} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
