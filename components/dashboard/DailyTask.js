import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";


const TaskCard = ({ title, time }) => (
  <View className="bg-[#ffa100] p-4 rounded-md w-[140px] mr-4">
    <Text className="text-white text-base font-medium">{title}</Text>
    <Text className="text-gray-200 text-sm">{time}</Text>
  </View>
);

export default function DailyTasks() {
    const { t } = useTranslation();  
    const { theme } = useTheme();

  return (
    <View className=" mt-4 rounded-lg shadow-md p-3"  style={{ backgroundColor: Colors[theme].card }}>
      <Text className="text-xl font-semibold  mb-4"  style={{ color: Colors[theme].text }}>
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
