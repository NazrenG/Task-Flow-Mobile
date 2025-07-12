import { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function TaskModal({ visible, onClose, onSave }) {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("To do");
  const [color, setColor] = useState("#3b82f6");

  const colors = ["#3b82f6", "#10b981", "#facc15", "#f87171", "#8b5cf6"];
  const priorities = ["High", "Medium", "Easy"];
  const statuses = ["To do", "In progress", "Done"];

  return (
    <Modal visible={visible} animationType="slide">
      <View className=" bg-gray-50 p-8 mt-5 m-5">
        {/* Task Name */}
        <Text className="text-base font-semibold mt-4">Task Name</Text>
        <TextInput
          className="border border-gray-200 bg-white rounded-md p-2 mt-1"
          value={taskName}
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
        <Text className="text-base font-semibold mt-4">Start Date</Text>
        <TextInput
          className="border border-gray-200 bg-white rounded-md p-2 mt-1"
          value={startDate}
          onChangeText={setStartDate}
          placeholder="MM/DD/YYYY"
        />

        {/* End Date */}
        <Text className="text-base font-semibold mt-4">End Date</Text>
        <TextInput
          className="border border-gray-200 bg-white rounded-md p-2 mt-1"
          value={endDate}
          onChangeText={setEndDate}
          placeholder="MM/DD/YYYY"
        />

        {/* Priority */}
        <Text className="text-base font-semibold mt-4">Priority</Text>
        <View className="flex-row flex-wrap mt-2 gap-2">
          {priorities.map((p) => (
            <TouchableOpacity
              key={p}
              onPress={() => setPriority(p)}
              className={`px-3 py-1 border rounded-full ${
                priority === p
                  ? "bg-blue-100 border-blue-500"
                  : "bg-white border-gray-300"
              }`}
            >
              <Text>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Status */}
        <Text className="text-base font-semibold mt-4">Status</Text>
        <View className="flex-row flex-wrap mt-2 gap-2">
          {statuses.map((s) => (
            <TouchableOpacity
              key={s}
              onPress={() => setStatus(s)}
              className={`px-3 py-1 border rounded-full ${
                status === s
                  ? "bg-blue-100 border-blue-500"
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
        <View className="flex-row justify-between mt-8">
          <TouchableOpacity
            className="bg-red-500 px-6 py-3 rounded"
            onPress={onClose}
          >
            <Text className="text-white font-semibold">Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-green-500 px-6 py-3 rounded"
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
            <Text className="text-white font-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
