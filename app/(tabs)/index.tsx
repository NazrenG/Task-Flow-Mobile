import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <View className=" flex-1 bg-white p-4">
      <View className="mb-4">
        <Text className="text-2xl font-bold text-center text-blue-600">
          Welcome to Dashboard
        </Text>
      </View>

      <View className="flex-row justify-around">
        <View className="items-center bg-customYellow p-4 rounded-xl">
          <Text className="text-lg">🔔</Text>
          <Text className="text-sm">Notifications</Text>
        </View>

        <View className="items-center bg-green-200 p-4 rounded-xl">
          <Text className="text-lg">💬</Text>
          <Text className="text-sm">Messages</Text>
        </View>

        <Link href="/calendar" asChild>
          <TouchableOpacity className="items-center bg-yellow-200 p-4 rounded-xl">
            <Text className="text-lg">📅</Text>
            <Text className="text-sm">Calendar</Text>
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-8">
        <TouchableOpacity className="bg-purple-600 p-4 rounded-xl">
          <Text className="text-white text-center font-bold">
            Create New Textroject
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
