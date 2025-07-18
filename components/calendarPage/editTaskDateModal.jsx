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

const width = Dimensions.get("window").width;

const EditTaskDateModal = ({ modalVisible, setModalVisible, selectedTask }) => {
  console.log(selectedTask);
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const options = [
    t("project.pending"),
    t("project.onGoing"),
    t("project.complated"),
  ];

  console.log("in create modal");
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
          className="bg-white p-6 rounded-xl  gap-6"
          style={{ width: width - 30 }}
        >
          <Text className="text-2xl text-center">Edit Task Time</Text>
          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2">Task name*:</Text>

              <Text className="mt-2 mb-1 border p-2 rounded-md text-zinc-500">
                {selectedTask}
              </Text>
            </View>
          </View>
          <View className="w-full flex flex-row justify-start gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("project.startDate")}:</Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={"#999"}
                keyboardType="numbers-and-punctuation"
                className="border px-4 py-2 rounded-md mt-2"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-2">{t("project.endDate")}:</Text>
              <View>
                <TextInput
                  value={endDate}
                  onChangeText={setEndDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor={"#999"}
                  keyboardType="numbers-and-punctuation"
                  className="border px-4 py-2 rounded-md mt-2"
                />
              </View>
            </View>
          </View>

          <View className="flex flex-row justify-end gap-4">
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
