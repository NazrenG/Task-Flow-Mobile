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
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import ProjectStateDropdown from "../dropdown/projectStateDropdown";
import ProjectInput from "../Input/ProjectInput";
import ColorPicker from "./colorPicker";

const width = Dimensions.get("window").width;

const EditProjectModal = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
    const [selecting, setSelecting] = useState(null);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [text, setText] = useState("");
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

    const { theme } = useTheme();

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
      style={{ backgroundColor: Colors[theme].card }}
    >
      <Pressable
        onPress={() => setModalVisible(false)}
        className="flex-1 bg-black/50 justify-center items-center"
        
      >
        <Pressable
          onPress={() => {}}
          className="bg-white p-6 rounded-xl items-center gap-6"
          style={[{ width: width - 30 } ,{ backgroundColor: Colors[theme].card }]}
         
        >
          <Text className="text-2xl"  style={{ color: Colors[theme].text }}>{t("project.editProject")}</Text>
          <View className="flex flex-row gap-3">
            <View className="flex-1" style={{ color: Colors[theme].text }}>
              <Text className="mb-2" style={{ color: Colors[theme].text }}>{t("project.projectName")}:</Text>
              <ProjectInput
                placeholder={t("project.enterProjectName") + "..."}
                
              />
            </View>
            <View className="flex-1" >
              <Text className="mb-2" style={{ color: Colors[theme].text }}>{t("project.projectState")}:</Text>
              <ProjectStateDropdown></ProjectStateDropdown>
              {/* <ProjectInput placeholder={"Enter project name..."} /> */}
            </View>
          </View>
          <View className="w-full flex flex-row justify-start gap-3">
            <View className="flex-1">
              <Text className="mb-2">{t("project.startDate")}:</Text>
                <Pressable
                onPress={() => setSelecting("start")}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: colors.text }}>
                  {startDate || "YYYY-MM-DD"}
                </Text>
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="mb-2">{t("project.endDate")}:</Text>
                 <Pressable
                onPress={() => setSelecting("end")}
                style={{
                  borderWidth: 1,
                  borderColor: colors.border,
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 8,
                  marginTop: 8,
                }}
              >
                <Text style={{ color: colors.text }}>
                  {endDate || "YYYY-MM-DD"}
                </Text>
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
                        theme={{
                          backgroundColor: colors.card,
                          calendarBackground: colors.card,
                          dayTextColor: colors.text,
                          monthTextColor: colors.text,
                          textDisabledColor: colors.subtext,
                          arrowColor: colors.primary,
                          selectedDayBackgroundColor: colors.primary,
                          todayTextColor: colors.primary,
                        }}
                        style={{ marginTop: 10, borderRadius: 8 }}
                      />
                    )}
          
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
                 {t("project.cancel")}
              </Text>
            </Pressable>
            <Pressable className="bg-green px-6 py-3 rounded-md">
              <Text className="text-white text-center font-semibold">
                {t("project.submit")}
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default EditProjectModal;
