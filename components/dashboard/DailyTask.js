import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";

const TaskCard = ({ title, time }) => (
  <View className="bg-[#ffa100] p-4 rounded-md w-[140px] mr-4">
    <Text className="text-white text-base font-medium">{title}</Text>
    <Text className="text-gray-200 text-sm">{time}</Text>
  </View>
);

export default function DailyTasks() {
    const { t } = useTranslation();  
  
  return (
    <View className="bg-white mt-4 rounded-lg shadow-md p-3">
      <Text className="text-xl font-semibold text-black mb-4">
        {t("dashboard.dailyTasks")}
      </Text>
 
      <View className="flex-row items-center mb-4">
        <Text className="text-sm text-gray-500 w-[50px]">00:00</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TaskCard title={t("dashboard.noTask")} time="12:00PM - 13:00PM" />
          <TaskCard title={t("dashboard.noTask")} time="14:00PM - 15:00PM" />
          
        </ScrollView>
      </View>

      <View className="flex-row items-center">
        <Text className="text-sm text-gray-500 w-[50px]">01:00</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TaskCard title={t("dashboard.noTask")} time="13:00PM - 14:00PM" />
        </ScrollView>
      </View>
    </View>
  );
}
