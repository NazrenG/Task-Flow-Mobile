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
import ProjectStateDropdown from "../dropdown/projectStateDropdown";
import ProjectInput from "../Input/ProjectInput";
import ColorPicker from "./colorPicker";

const width = Dimensions.get("window").width;

const CreateProjectModal = ({ modalVisible, setModalVisible }) => {
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
          className="bg-white p-6 rounded-xl items-center gap-6"
          style={{ width: width - 30 }}
        >
          <Text className="text-2xl">{t("project.createProject")}</Text>
          <View className="flex flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("project.projectName")}:</Text>
              <ProjectInput
                placeholder={t("project.enterProjectName") + "..."}
              />
            </View>
            <View className="flex-1">
              <Text className="mb-2">{t("project.projectState")}:</Text>
              <ProjectStateDropdown></ProjectStateDropdown>
              {/* <ProjectInput placeholder={"Enter project name..."} /> */}
            </View>
          </View>
          <View className="w-full flex flex-row justify-start gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("project.startDate")}:</Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                keyboardType="numbers-and-punctuation"
                className="border px-4 py-2 rounded-md mt-2"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-2">{t("project.endDate")}:</Text>
              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                keyboardType="numbers-and-punctuation"
                className="border px-4 py-2 rounded-md mt-2"
              />
            </View>
          </View>
          <View className="w-full justify-start">
            <Text>{t("project.description")}:</Text>
            <TextInput
              value={text}
              onChangeText={(val) => {
                if (val.length <= 400) setText(val);
              }}
              multiline
              numberOfLines={6}
              maxLength={400}
              placeholder={t("project.descriptionData")}
              className="border rounded-xl p-4 text-base text-gray-800 h-40 mt-2"
              textAlignVertical="top"
            />
            <Text className="mt-2 text-sm text-gray-500">
              {text.length} / 400 {t("project.characters")}
            </Text>
          </View>
          <View className="w-full justify-start">
            <Text>{t("project.colorPicker")}:</Text>
            <ColorPicker></ColorPicker>
          </View>
          <View className="flex flex-row justify-start gap-4">
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

export default CreateProjectModal;
