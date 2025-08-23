import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const width = Dimensions.get("window").width;

const EditTaskDateModal = ({ modalVisible, setModalVisible, selectedTask }) => {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selecting, setSelecting] = useState(null); // hansı tarixi seçirik? start yoxsa end?

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1 bg-black/50 justify-center items-center"
      >
        <Pressable
          onPress={() => {}}
          className="bg-white p-6 rounded-xl gap-6"
          style={{ width: width - 30 }}
        >
          <Text className="text-2xl text-center">Edit Task Time</Text>

          {/* Task name */}
          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2">Task name*:</Text>
              <Text className="mt-2 mb-1 border p-2 rounded-md text-zinc-500">
                {selectedTask}
              </Text>
            </View>
          </View>

          {/* Start & End date */}
          <View className="w-full flex flex-row justify-start gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("project.startDate")}:</Text>
              <Pressable
                onPress={() => setSelecting("start")}
                className="border px-4 py-2 rounded-md mt-2"
              >
                <Text className="text-zinc-700">
                  {startDate || "YYYY-MM-DD"}
                </Text>
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="mb-2">{t("project.endDate")}:</Text>
              <Pressable
                onPress={() => setSelecting("end")}
                className="border px-4 py-2 rounded-md mt-2"
              >
                <Text className="text-zinc-700">
                  {endDate || "YYYY-MM-DD"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Calendar */}
          {selecting && (
            <Calendar
              onDayPress={(day) => {
                if (selecting === "start") setStartDate(day.dateString);
                if (selecting === "end") setEndDate(day.dateString);
                setSelecting(null); // seçim bitəndə bağlansın
              }}
              markedDates={{
                ...(startDate && {
                  [startDate]: {
                    selected: true,
                    selectedColor: "#3b82f6",
                  },
                }),
                ...(endDate && {
                  [endDate]: {
                    selected: true,
                    selectedColor: "#10b981",
                  },
                }),
              }}
              style={{ marginTop: 10, borderRadius: 8 }}
            />
          )}

          {/* Buttons */}
          <View className="flex flex-row justify-end gap-4 mt-4">
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-red-500 px-6 py-3 rounded-md"
            >
              <Text className="text-white text-center font-semibold">
                Cancel
              </Text>
            </Pressable>
            <Pressable className="bg-green px-6 py-3 rounded-md">
              <Text className="text-white text-center font-semibold">
                Submit
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditTaskDateModal;
