import { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View, Pressable, Dimensions } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

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
  const { theme } = useTheme();

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
      {/* Modal background */}
      <Pressable
        onPress={() => setModalVisible(false)}
        style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" }}
      >
        {/* Modal content */}
        <Pressable
          onPress={() => {}}
          style={{
            width: width - 30,
            backgroundColor: Colors[theme].card,
            padding: 20,
            borderRadius: 15
          }}
        >
          {/* Task Name */}
          <Text style={{ color: Colors[theme].text, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
            {t("task.cratetedTask.taskName")}
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
            value={taskName}
            onChangeText={setTaskName}
            placeholder={t("task.cratetedTask.enterTaskName")}
            placeholderTextColor={Colors[theme].placeholder}
          />

          {/* Description */}
          <Text style={{ color: Colors[theme].text, fontSize: 16, fontWeight: "600", marginTop: 16 }}>
            {t("task.cratetedTask.description")}
          </Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: Colors[theme].border,
              backgroundColor: Colors[theme].inputBg,
              color: Colors[theme].text,
              borderRadius: 8,
              padding: 8,
              marginTop: 4,
              height: 96,
              textAlignVertical: "top"
            }}
            value={description}
            onChangeText={setDescription}
            placeholder={t("task.cratetedTask.enterdescription")}
            placeholderTextColor={Colors[theme].placeholder}
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
            </View>  */}