import { useEffect, useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { fetchCreateTask, fetchUpdateTask } from "../../utils/taskUtils";
const width = Dimensions.get("window").width;

export default function TaskModal({ visible, onClose, onSave, task }) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [title, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(null);

  const [priority, setPriority] = useState("high");
  const [status, setStatus] = useState("to do");
  const [color, setColor] = useState("#3b82f6");

    const { theme } = useTheme();
  
  const colors = ["#3b82f6", "#10b981", "#facc15", "#f87171", "#8b5cf6"];
  const priorities = ["high", "medium", "easy"];
  const statuses = ["to do", "in progress", "done"];
  const isEditMode = task && task.id;

  useEffect(() => {
    setModalVisible(visible);
    if (task) {
      setTaskName(task.title || "");
      setDescription(task.description || "");
      setStartDate(task.startDate ? task.startDate.split("T")[0] : null);
      setEndDate(
        task.deadline && task.deadline !== "0001-01-01T00:00:00"
          ? task.deadline.split("T")[0]
          : null
      );
      setPriority(task.priority || "high");
      setStatus(task.status || "to do");
      setColor(task.color || "#3b82f6");
    }
  }, [visible, task]);

  const taskData = {
    id: task?.id,
    title,
    description,
    startDate: startDate ? `${startDate}T00:00:00.000Z` : null,
    deadline: endDate ? `${endDate}T00:00:00.000Z` : null,
    priority,
    status,
    color,
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setModalVisible(false)}
    
    >
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1 bg-black/50 justify-center items-center"
        
      >
        <Pressable
          onPress={() => {}}
          className="bg-white p-6 rounded-xl"
          style={[{ width: width - 30 },{backgroundColor: Colors[theme].card}]}
        >
          {/* Task Name */}
          <Text className="text-base font-semibold mt-4" style={{color: Colors[theme].text}}>Task Name</Text>
          <TextInput
            className="border border-gray-200 bg-white rounded-md p-2 mt-1"
            style={{backgroundColor: Colors[theme].card}}
            value={title}
            onChangeText={setTaskName}
            placeholder="Enter task name"
              placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"} // Dark/Light mode

          />

          {/* Description */}
          <Text className="text-base font-semibold mt-4" style={{color: Colors[theme].text}}>Description</Text>
          <TextInput
            className="border border-gray-200 bg-white rounded-md p-2 mt-1 h-24 text-start"
                        style={{backgroundColor: Colors[theme].card}}
  placeholderTextColor={theme === "dark" ? "#9ca3af" : "#6b7280"} // Dark/Light mode

            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />

          {/* Start & End Date */}
          <View className="flex-row gap-2 mt-4">
            <View className="flex-1">
              <Text className="text-base font-semibold" style={{color: Colors[theme].text}}>Start Date</Text>
              <Pressable
                onPress={() => setSelecting("start")}
                className="border border-gray-200 bg-white rounded-md p-2 mt-1"
                style={{backgroundColor: Colors[theme].card}}
              >
                <Text style={{color: Colors[theme].text}}>{startDate || "YYYY-MM-DD"}</Text>
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="text-base font-semibold" style={{color: Colors[theme].text}}>End Date</Text>
              <Pressable
                onPress={() => setSelecting("end")}
                className="border border-gray-200 bg-white rounded-md p-2 mt-1"
                style={{backgroundColor: Colors[theme].card}}
              >
                <Text style={{color: Colors[theme].text}}>{endDate || "YYYY-MM-DD"}</Text>
              </Pressable>
            </View>
          </View>

          {selecting && (
  <Calendar
    onDayPress={(day) => {
      if (selecting === "start") setStartDate(day.dateString);
      if (selecting === "end") setEndDate(day.dateString);
      setSelecting(null);
    }}
    markedDates={{
      ...(startDate && {
        [startDate]: { selected: true, selectedColor: "#3b82f6" },
      }),
      ...(endDate && {
        [endDate]: { selected: true, selectedColor: "#10b981" },
      }),
    }}
    style={{ marginTop: 10, borderRadius: 8 }}
    theme={{
      backgroundColor: Colors[theme].card,      // Dark/Light arxa plan
      calendarBackground: Colors[theme].card,   // Calendar fon
      textSectionTitleColor: Colors[theme].text,
      dayTextColor: Colors[theme].text,
      monthTextColor: Colors[theme].text,
      selectedDayBackgroundColor: "#3b82f6",
      selectedDayTextColor: "#ffffff",
      todayTextColor: "#f59e0b",
      arrowColor: Colors[theme].text,
      textDisabledColor: theme === "dark" ? "#6b7280" : "#d1d5db",
      dotColor: "#10b981",
      selectedDotColor: "#ffffff",
    }}
  />
)}


                {/* Priority */}
<Text className="text-base font-semibold mt-4" style={{ color: Colors[theme].text }}>
  Priority
</Text>
<View className="flex-row flex-wrap mt-2 gap-2">
  {priorities.map((p) => {
    let bgColor = Colors[theme].card; // default background
    let borderColor = Colors[theme].border; // default border

    if (priority === p) {
      if (p === "high") {
        bgColor = theme === "dark" ? "#b91c1c" : "#fee2e2"; // tünd qırmızı / açıq qırmızı
        borderColor = "#f87171";
      } else if (p === "medium") {
        bgColor = theme === "dark" ? "#78350f" : "#fef3c7"; // tünd sarı / açıq sarı
        borderColor = "#facc15";
      } else if (p === "easy") {
        bgColor = theme === "dark" ? "#166534" : "#dcfce7"; // tünd yaşıl / açıq yaşıl
        borderColor = "#10b981";
      }
    }

    return (
      <TouchableOpacity
        key={p}
        onPress={() => setPriority(p)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 9999,
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <Text style={{ color: Colors[theme].text }}>{p}</Text>
      </TouchableOpacity>
    );
  })}
</View>

{/* Status */}
<Text className="text-base font-semibold mt-4" style={{ color: Colors[theme].text }}>
  Status
</Text>
<View className="flex-row flex-wrap mt-2 gap-2">
  {statuses.map((s) => {
    let bgColor = Colors[theme].card; 
    let borderColor = Colors[theme].border;

    if (status === s) {
      if (s === "to do") {
        bgColor = theme === "dark" ? "#1e3a8a" : "#dbeafe"; // tünd mavi / açıq mavi
        borderColor = "#3b82f6";
      } else if (s === "in progress") {
        bgColor = theme === "dark" ? "#78350f" : "#fef3c7"; // tünd narıncı / açıq sarı
        borderColor = "#facc15";
      } else if (s === "done") {
        bgColor = theme === "dark" ? "#166534" : "#dcfce7"; // tünd yaşıl / açıq yaşıl
        borderColor = "#10b981";
      }
    }

    return (
      <TouchableOpacity
        key={s}
        onPress={() => setStatus(s)}
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 9999,
          backgroundColor: bgColor,
          borderWidth: 1,
          borderColor: borderColor,
        }}
      >
        <Text style={{ color: Colors[theme].text }}>{s}</Text>
      </TouchableOpacity>
    );
  })}
</View>


          {/* Color */}
          <Text className="text-base font-semibold mt-4" style={{color: Colors[theme].text}}>Color</Text>
          <View className="flex-row mt-2 gap-2">
            {colors.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(c)}
                className={`w-8 h-8 rounded ${
                  color === c ? "border-2 border-black" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </View>

          {/* Buttons */}
          <View className="flex-row justify-end gap-1 mt-8">
            <TouchableOpacity
              className="bg-red-500 px-6 py-3 rounded"
              onPress={onClose}
            >
              <Text className="text-white font-semibold">Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-green px-6 py-3 rounded"
              onPress={async () => {
                try {
                  let response;
                  if (task?.id && task) {
                    response = await fetchUpdateTask(task.id, taskData);
                    console.log("Task updated successfully:", response);
                  } else {
                    response = await fetchCreateTask(taskData);
                    console.log("Task created successfully:", response);
                  }
                  onSave(taskData);
                  setModalVisible(false);
                } catch (error) {
                  console.error("Error saving task:", error);
                }
              }}
            >
              <Text className="text-white font-semibold">
                {task?.id ? "Update" : "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
