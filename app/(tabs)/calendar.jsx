import { Ionicons } from "@expo/vector-icons";
import { addDays, addMonths, format, startOfWeek, subMonths } from "date-fns";
import { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import EditTaskDateModal from "../../components/calendarPage/editTaskDateModal";
import Header from "../../components/Header";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { fetchWorkUserTasks,fetchUserTasks } from "../../utils/calendarUtils";

const HOURS = Array.from({ length: 12 }, (_, i) => 8 + i);

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState("");
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);

  const { theme } = useTheme();
  const colors = Colors[theme];

 
const fetchTasks = async () => {
  try {
    const workTasks = await fetchWorkUserTasks();
    const userTasks = await fetchUserTasks();

  const mapTask = (task, source) => {
 const parseHour = (dateString) => {
  if (!dateString) return null;
  const d = new Date(dateString);
  const hour = d.getHours() + d.getMinutes() / 60;
  return hour === 0 ? 8 : hour; 
};


  return {
    id: task.id,
    title: task.title,
    startDate: new Date(task.startDate),
    endDate: new Date(task.deadline),
    start: parseHour(task.startDate),
    end: parseHour(task.deadline),
    color: task.color || (source === "project" ? "#007bff" : "#28a745"),
    extendedProps: { source },
  };
};


    const combinedTasks = [
      ...workTasks.map((t) => mapTask(t, "project")),
      ...userTasks.map((t) => mapTask(t, "user")),
    ];

    setTasks(combinedTasks);
  } catch (error) {
    console.log("Error fetching tasks:", error);
  }
};


  useEffect(() => {
    fetchTasks();
  }, []);

  const startOfSelectedWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });

  return (
    <>
      <Header onSearch={setSearchText} />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => setCurrentDate(subMonths(currentDate, 1))}
          >
            <Ionicons name="chevron-back" size={24} color={colors.icon} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.titleText,
            }}
          >
            {format(currentDate, "MMMM yyyy")}
          </Text>
          <TouchableOpacity
            onPress={() => setCurrentDate(addMonths(currentDate, 1))}
          >
            <Ionicons name="chevron-forward" size={24} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Week Selector */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setSelectedDate(addDays(startOfSelectedWeek, -7))}
          >
            <Ionicons name="chevron-back" size={20} color={colors.icon} />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              flex: 1,
            }}
          >
            {Array.from({ length: 7 }).map((_, i) => {
              const day = addDays(startOfSelectedWeek, i);
              const isToday =
                format(day, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
              const isSelected =
                format(day, "yyyy-MM-dd") ===
                format(selectedDate, "yyyy-MM-dd");

              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => setSelectedDate(day)}
                  style={{ alignItems: "center" }}
                >
                  <Text style={{ fontSize: 12, color: colors.labelText }}>
                    {format(day, "EEE")}
                  </Text>
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: isSelected
                        ? colors.primary
                        : isToday
                        ? colors.primaryTransparent
                        : "transparent",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: isSelected ? "bold" : "normal",
                        color: isSelected ? "#fff" : colors.text,
                      }}
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
          >
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View
          style={{ height: 1, backgroundColor: colors.border, marginBottom: 8 }}
        />

        {/* Daily Schedule */}
        <ScrollView>
          {HOURS.map((hour) => (
            <View
              key={hour}
              style={{
                flexDirection: "row",
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                height: 80,
              }}
            >
              {/* Hour label */}
              <View
                style={{
                  width: 56,
                  alignItems: "flex-end",
                  paddingRight: 8,
                  paddingTop: 8,
                }}
              >
                <Text style={{ fontSize: 12, color: colors.labelText }}>
                  {hour.toString().padStart(2, "0")}:00
                </Text>
              </View>

              {/* Tasks */}
              <View style={{ flex: 1, position: "relative" }}>
                {tasks
  .filter((t) => {
   
    return format(t.startDate, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
  })
  .filter((t) => Math.floor(t.start) >= hour && Math.floor(t.start) < hour + 1)
  .map((task) => {
    const topOffset = (task.start - hour) * 80;
    const height = (task.end - task.start) * 80 || 40; 
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTask(task.title);
          setModalVisible(true);
        }}
        key={task.id}
        style={{
          position: "absolute",
          left: 0,
          right: 16,
          top: topOffset,
          height,
          backgroundColor: task.color,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: "600", color: "#1f2937" }}>
          {task.title}
        </Text>
        <Text style={{ fontSize: 12, color: "#4b5563" }}>
          {format(task.startDate, "HH:mm")} - {format(task.endDate, "HH:mm")}
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
    </>
  );
}
