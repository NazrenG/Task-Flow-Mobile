import { Ionicons } from "@expo/vector-icons";
import { addDays, addMonths, format, startOfWeek, subMonths } from "date-fns";
import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditTaskDateModal from "../../components/calendarPage/editTaskDateModal";
import Header from "../../components/Header";

// Saat blokları
const HOURS = Array.from({ length: 12 }, (_, i) => 8 + i);

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [searchText, setSearchText] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Marketing team meeting",
      start: 8,
      end: 8.66,
      color: "#FDE68A",
    },
    {
      id: 2,
      title: "Make plans to create new products",
      start: 9,
      end: 10,
      color: "#C4B5FD",
    },
    {
      id: 3,
      title: "Coffee breaks and snacks",
      start: 10,
      end: 10.5,
      color: "#A5F3FC",
    },
    {
      id: 4,
      title: "Company policy meeting",
      start: 10.66,
      end: 12.25,
      color: "#FBCFE8",
    },
    {
      id: 5,
      title: "Have lunch",
      start: 12.5,
      end: 13.5,
      color: "#FDE68A",
    },
  ];

  // Seçilen haftanın başlangıcı
  const startOfSelectedWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Header onSearch={setSearchText} />
      {/* Header */}
      <View className="flex-row justify-between items-center p-4">
        <TouchableOpacity
          onPress={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2"
        >
          <Ionicons name="chevron-back" size={24} color="gray" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-purple-600">
          {format(currentDate, "MMMM yyyy")}
        </Text>
        <TouchableOpacity
          onPress={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2"
        >
          <Ionicons name="chevron-forward" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Week Selector */}
      <View className="flex-row justify-between px-2 mb-2">
        <TouchableOpacity
          onPress={() => setSelectedDate(addDays(startOfSelectedWeek, -7))}
          className="p-2"
        >
          <Ionicons name="chevron-back" size={20} color="gray" />
        </TouchableOpacity>

        <View className="flex-row space-x-2 flex-1 justify-around">
          {Array.from({ length: 7 }).map((_, i) => {
            const day = addDays(startOfSelectedWeek, i);
            const isToday =
              format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
            const isSelected =
              format(day, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
            return (
              <TouchableOpacity
                key={i}
                onPress={() => setSelectedDate(day)}
                className="items-center"
              >
                <Text className="text-xs text-gray-500">
                  {format(day, "EEE")}
                </Text>
                <View
                  className={`w-8 h-8 rounded-full justify-center items-center ${
                    isSelected
                      ? "bg-purple-600"
                      : isToday
                      ? "bg-purple-200"
                      : ""
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      isSelected ? "text-white font-bold" : "text-gray-700"
                    }`}
                  >
                    {format(day, "d")}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => setSelectedDate(addDays(startOfSelectedWeek, 7))}
          className="p-2"
        >
          <Ionicons name="chevron-forward" size={20} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="h-px bg-gray-200 mb-2" />

      {/* Daily Schedule */}
      <ScrollView>
        {HOURS.map((hour) => (
          <View key={hour} className="flex-row border-b border-gray-100 h-20">
            {/* Hour label */}
            <View className="w-14 items-end pr-2 pt-2">
              <Text className="text-xs text-gray-500">
                {hour.toString().padStart(2, "0")}:00
              </Text>
            </View>

            {/* Tasks */}
            <View className="flex-1 relative">
              {tasks
                .filter((t) => t.start >= hour && t.start < hour + 1)
                .map((task) => {
                  const topOffset = (task.start - hour) * 80;
                  const height = (task.end - task.start) * 80;
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedTask(task.title);
                        setModalVisible(true);
                      }}
                      key={task.id}
                      className="absolute left-0 right-4 rounded-lg px-2 py-1"
                      style={{
                        top: topOffset,
                        height,
                        backgroundColor: task.color,
                      }}
                    >
                      <Text className="text-xs font-medium text-gray-800">
                        {task.title}
                      </Text>
                      <Text className="text-xs text-gray-600">
                        {`${task.start}:00 - ${task.end}:00`}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        ))}
        <EditTaskDateModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedTask={selectedTask}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
