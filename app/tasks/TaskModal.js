import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, Pressable, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
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
import { fetchCreateTask, fetchUpdateTask } from "../../utils/taskUtils";

const width = Dimensions.get("window").width;

export default function TaskModal({ visible, onClose, onSave, task }) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [title, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("high");
  const [status, setStatus] = useState("to do");
  const [color, setColor] = useState("#3b82f6");
  const { t } = useTranslation();
  const { theme } = useTheme();

  const colors = ["#3b82f6", "#10b981", "#facc15", "#f87171", "#8b5cf6"];
  const priorities = ["high", "medium", "easy"];
  const statuses = ["to do", "in progress", "done"];
  const isEditMode = task && task.id;

  function formatDate(input) {
    if (!input) return null;
    const [day, month, year] = input.split("/"); // "16/08/2025"
    return `${year}-${month}-${day}T00:00:00.000Z`;
  }

  if (isEditMode) {
    console.log("open");
  } else {
    console.log("closeeee");
  }
 
  useEffect(() => {
    setModalVisible(visible);
    if (task) {
      setTaskName(task.title || "");
      setDescription(task.description || "");
      setStartDate(
        task.startDate
          ? task.startDate.split("T")[0].split("-").reverse().join("/")
          : ""
      );
      setEndDate(
        task.deadline && task.deadline !== "0001-01-01T00:00:00"
          ? task.deadline.split("T")[0].split("-").reverse().join("/")
          : ""
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
    startDate: formatDate(startDate),
    deadline: formatDate(endDate),
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
      {/* Modal background */}
      <Pressable
        onPress={() => setModalVisible(false)}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
      >
        {/* Modal content */}
        <Pressable
          onPress={() => {}}
          className="bg-white p-6 rounded-xl"
          style={{ width: width - 30 }}
        >
          {/* Task Name */}
          <Text className="text-base font-semibold mt-4">Task Name</Text>
          <TextInput
            className="border border-gray-200 bg-white rounded-md p-2 mt-1"
            value={title}
            onChangeText={setTaskName}
            placeholder="Enter task name"
          />

          {/* Description */}
          <Text className="text-base font-semibold mt-4">Description</Text>
          <TextInput
            className="border border-gray-200 bg-white rounded-md p-2 mt-1 h-24 text-start"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter description"
            multiline
          />

          {/* Start Date */}
          <Text style={{ color: Colors[theme].text, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
            {t("task.cratetedTask.startDate")}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors[theme].border,
              backgroundColor: Colors[theme].inputBg,
              color: Colors[theme].text,
              borderRadius: 8,
              padding: 8,
              marginTop: 4
            }}
            value={startDate}
            onChangeText={setStartDate}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={Colors[theme].placeholder}
          />

          {/* End Date */}
          <Text style={{ color: Colors[theme].text, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
            {t("task.cratetedTask.endDate")}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors[theme].border,
              backgroundColor: Colors[theme].inputBg,
              color: Colors[theme].text,
              borderRadius: 8,
              padding: 8,
              marginTop: 4
            }}
            value={endDate}
            onChangeText={setEndDate}
            placeholder="MM/DD/YYYY"
            placeholderTextColor={Colors[theme].placeholder}
          />

          {/* Priority */}
               <Text className="text-base font-semibold mt-4" style={{ color: Colors[theme].text }}>{t("task.cratetedTask.priority")}</Text>
            <View className="flex-row flex-wrap mt-2 gap-2">
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  className={`px-3 py-1 border rounded-full ${ 
                    priority=== p && p=== t("task.cratetedTask.high")
                      ? "bg-red-100 border-red-500"
                      : priority === p && p === t("task.cratetedTask.medium")
                      ? "bg-bg_yellow border-yellow"
                      : priority === p && p === t("task.cratetedTask.easy")
                      ? "bg-bg_green border-green"
                      : "bg-white border-gray-300"
                  }  
                  
                  `}
                >
                  <Text>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

          {/* Status */}
         <Text className="text-base font-semibold mt-4" style={{ color: Colors[theme].text }}>{t("task.cratetedTask.status")}</Text>
            <View className="flex-row flex-wrap mt-2 gap-2">
              {statuses.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  className={`px-3 py-1 border rounded-full ${
                    status === s && s === "To do"
                      ? "bg-bg_blue border-blue-500"
                      : status === s && s === "In progress"
                      ? "bg-bg_yellow border-yellow"
                      : status === s && s === "Done"
                      ? "bg-bg_green border-green"
                      : "bg-white border-gray-300"}`}
                >
                  <Text>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
  

          {/* Color */}
          <Text style={{ color: Colors[theme].text, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
            {t("task.cratetedTask.color")}
          </Text>
          <View style={{ flexDirection: "row", marginTop: 8, gap: 8 }}>
            {colors.map((c) => (
              <TouchableOpacity
                key={c}
                onPress={() => setColor(c)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: c,
                  borderWidth: color === c ? 2 : 0,
                  borderColor: Colors[theme].text
                }}
              />
            ))}
          </View>

          {/* Buttons */}
          <View className="flex-row justify-end gap-1 mt-8">
              <TouchableOpacity
                key={p}
                onPress={() => setPriority(p)}
                className={`px-3 py-1 border rounded-full ${
                  priority === p && p === "high"
                    ? "bg-red-100 border-red-500"
                    : priority === p && p === "medium"
                    ? "bg-bg_yellow border-yellow"
                    : priority === p && p === "easy"
                    ? "bg-bg_green border-green"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text>{p}</Text>
              </TouchableOpacity>
            
          </View>

          {/* Status */}
          <Text className="text-base font-semibold mt-4">Status</Text>
          <View className="flex-row flex-wrap mt-2 gap-2">
            {statuses.map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => setStatus(s)}
                className={`px-3 py-1 border rounded-full ${
                  status === s && s === "to do"
                    ? "bg-bg_blue border-blue-500"
                    : status === s && s === "in progress"
                    ? "bg-bg_yellow border-yellow"
                    : status === s && s === "done"
                    ? "bg-bg_green border-green"
                    : "bg-white border-gray-300"
                }`}
              >
                <Text>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Color */}
          <Text className="text-base font-semibold mt-4">Color</Text>
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
              <Text className="text-white font-semibold">{`${
                task?.id ? "Update" : t("task.cratetedTask.save")
              }`}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}



{/*
    //prioritet
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.priority")}</Text>
            <View className="flex-row flex-wrap mt-2 gap-2">
              {priorities.map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPriority(p)}
                  className={`px-3 py-1 border rounded-full ${ 
                    priority=== p && p=== t("task.cratetedTask.high")
                      ? "bg-red-100 border-red-500"
                      : priority === p && p === t("task.cratetedTask.medium")
                      ? "bg-bg_yellow border-yellow"
                      : priority === p && p === t("task.cratetedTask.easy")
                      ? "bg-bg_green border-green"
                      : "bg-white border-gray-300"
                  }  
                  
                  `}
                >
                  <Text>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>
  
  //status
    <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.status")}</Text>
            <View className="flex-row flex-wrap mt-2 gap-2">
              {statuses.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setStatus(s)}
                  className={`px-3 py-1 border rounded-full ${
                    status === s && s === "To do"
                      ? "bg-bg_blue border-blue-500"
                      : status === s && s === "In progress"
                      ? "bg-bg_yellow border-yellow"
                      : status === s && s === "Done"
                      ? "bg-bg_green border-green"
                      : "bg-white border-gray-300"}`}
                >
                  <Text>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  <View className="flex-row justify-end gap-1 mt-8">
              <TouchableOpacity
                className="bg-red-500 px-6 py-3 rounded"
                onPress={onClose}
              >
                <Text className="text-white font-semibold">{t("task.cratetedTask.close")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-green px-6 py-3 rounded"
                onPress={() =>
                  onSave({
                    taskName,
                    description,
                    startDate,
                    endDate,
                    priority,
                    status,
                    color,
                  })
                }
              >
                <Text className="text-white font-semibold">{t("task.cratetedTask.save")}</Text>
              </TouchableOpacity>
                    </View>  */
}