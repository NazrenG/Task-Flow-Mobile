import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  Pressable,
  Text,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";

const width = Dimensions.get("window").width;

const EditTaskDateModal = ({ modalVisible, setModalVisible, selectedTask }) => {
  const { t } = useTranslation();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(null); 

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
          <Text className="text-2xl text-center">{t("calendar.edittask.editTask")}</Text>

          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("calendar.edittask.taskName")}</Text>
              <Text className="mt-2 mb-1 border p-2 rounded-md text-zinc-500">
                {selectedTask}
              </Text>
            </View>
          </View>

          <View className="w-full flex flex-row justify-start gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("calendar.edittask.startDate")}</Text>
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
              <Text className="mb-2">{t("calendar.edittask.endDate")}</Text>
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

          {/* Calendar shown when selecting start or end */}
          {selecting && (
            <Calendar
              onDayPress={(day) => {
                if (selecting === "start") setStartDate(day.dateString);
                if (selecting === "end") setEndDate(day.dateString);
                setSelecting(null);
              }}
              markedDates={{
                ...(startDate && {
                  [startDate]: {
                    selected: true,
                    selectedColor: "#00adf5",
                    marked: true,
                  },
                }),
                ...(endDate && {
                  [endDate]: {
                    selected: true,
                    selectedColor: "#50cebb",
                    marked: true,
                  },
                }),
              }}
              style={{ marginTop: 10 }}
            />
          )}

          <View className="flex flex-row justify-end gap-4 mt-4">
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-red-500 px-6 py-3 rounded-md"
            >
              <Text className="text-white text-center font-semibold">
                {t("calendar.edittask.cancel")}
              </Text>
            </Pressable>
               <Pressable className="bg-green px-6 py-3 rounded-md">
              <Text className="text-white text-center font-semibold">
                 {t("calendar.edittask.submit")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditTaskDateModal;
