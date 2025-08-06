import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View ,Pressable,Dimensions} from "react-native";
import { useTranslation } from "react-i18next";

const width = Dimensions.get("window").width;

export default function TaskModal({ visible, onClose, onSave }) {
  const [modalVisible, setModalVisible] = useState(visible);
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("To do");
  const [color, setColor] = useState("#3b82f6");
  const { t } = useTranslation();  

  const colors = ["#3b82f6", "#10b981", "#facc15", "#f87171", "#8b5cf6"];
  const priorities = ["High", "Medium", "Easy"];
  const statuses = ["To do", "In progress", "Done"];

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
          style={{ width: width - 30 }}
        > 
            {/* Task Name */}
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.taskName")}</Text>
            <TextInput
              className="border border-gray-200 bg-white rounded-md p-2 mt-1"
              value={taskName}
              onChangeText={setTaskName}
              placeholder={t("task.cratetedTask.enterTaskName")}
            />

            {/* Description */}
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.description")}</Text>
            <TextInput
              className="border border-gray-200 bg-white rounded-md p-2 mt-1 h-24 text-start"
              value={description}
              onChangeText={setDescription}
              placeholder={t("task.cratetedTask.enterdescription")}
              multiline
            />

            {/* Start Date */}
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.startDate")}</Text>
            <TextInput
              className="border border-gray-200 bg-white rounded-md p-2 mt-1"
              value={startDate}
              onChangeText={setStartDate}
              placeholder="MM/DD/YYYY"
            />

            {/* End Date */}
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.endDate")}</Text>
            <TextInput
              className="border border-gray-200 bg-white rounded-md p-2 mt-1"
              value={endDate}
              onChangeText={setEndDate}
              placeholder="MM/DD/YYYY"
            />

            {/* Priority */}
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

            {/* Status */}
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

            {/* Color */}
            <Text className="text-base font-semibold mt-4">{t("task.cratetedTask.color")}</Text>
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
            </View> 
        </Pressable>
      </Pressable>
    </Modal>
  );
}
