import { View, Text, ScrollView } from "react-native";

const TaskCard = ({ title, time }) => (
  <View className="bg-[#ffa100] p-4 rounded-md w-[140px] mr-4">
    <Text className="text-white text-base font-medium">{title}</Text>
    <Text className="text-gray-200 text-sm">{time}</Text>
  </View>
);

export default function DailyTasks() {
  return (
    <View className="bg-white mt-4 rounded-lg shadow-md p-3">
      <Text className="text-xl font-semibold text-black mb-4">
        Daily Tasks
      </Text>
 
      <View className="flex-row items-center mb-4">
        <Text className="text-sm text-gray-500 w-[50px]">00:00</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TaskCard title="No Task For An Hour" time="12:00PM - 13:00PM" />
          <TaskCard title="No Task" time="12:00PM - 13:00PM" />
          
        </ScrollView>
      </View>

      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 w-[50px]">01:00</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TaskCard title="No Task For An Hour" time="13:00PM - 14:00PM" />
        </ScrollView>
      </View>
    </View>
  );
}
