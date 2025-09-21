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

import { Calendar } from "react-native-calendars";
import { fetchCreateProject } from "../../utils/projectUtils";
import ProjectStateDropdown from "../dropdown/projectStateDropdown";
import ProjectInput from "../Input/ProjectInput";
import ColorPicker from "./colorPicker";

const width = Dimensions.get("window").width;

const CreateProjectModal = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [selectedColor, setColorSelected] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selecting, setSelecting] = useState(null);
  const [projectName, setProjectName] = useState("");
  const [selectedState, setSelectedState] = useState(null);

  const [text, setText] = useState("");
  const handleCreate = async () => {
    // console.log("in create handler");
    const project = {
      title: projectName,
      description: text,
      startDate: startDate ? new Date(startDate).toISOString() : null,
      endDate: endDate ? new Date(endDate).toISOString() : null,
      status: selectedState,
      isCompleted: false,
      color: selectedColor,
    };
    console.log(project);
    const response = await fetchCreateProject(project);
    if (response) {
      console.log("peojwct created");
      setModalVisible(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <Pressable
        onPress={() => setModalVisible(false)}
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          onPress={() => {}}
          style={{
            width: width - 30,
            backgroundColor: Colors[theme].card,
            padding: 20,
            borderRadius: 16,
            gap: 16,
            alignItems: "center", // Center all child items horizontally           <Text className="text-2xl">{t("project.createProject")}</Text>
          }}
        >
          {/* Title */}
          <Text className="text-2xl" style={{ color: Colors[theme].text }}>
            {t("project.createProject")}
          </Text>

          {/* Project Name & State */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.projectName")}:
              </Text>
              <ProjectInput
                placeholder={t("project.enterProjectName") + "..."}
                onChangeText={setProjectName}
                style={{ color: Colors[theme].text }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.projectState")}:
              </Text>
              <ProjectStateDropdown
                selectedState={selectedState}
                onStateSelect={setSelectedState}
              />
            </View>
          </View>

          {/* Start & End Dates */}
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              width: "100%",
              justifyContent: "center",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.startDate")}:
              </Text>
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
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.endDate")}:
              </Text>
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

          {/* Description */}
          <View style={{ marginTop: 12, width: "100%" }}>
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
            <Text style={{ color: Colors[theme].text }}>
              {t("project.description")}:
            </Text>
            <TextInput
              value={text}
              onChangeText={(val) => {
                if (val.length <= 400) setText(val);
              }}
              multiline
              numberOfLines={6}
              maxLength={400}
              placeholder={t("project.descriptionData")}
              placeholderTextColor={Colors[theme].placeholder}
              style={{
                color: Colors[theme].text,
                borderColor: Colors[theme].border,
                borderWidth: 1,
                borderRadius: 12,
                padding: 12,
                height: 120,
                marginTop: 4,
                textAlignVertical: "top",
              }}
            />
            <Text
              style={{
                color: Colors[theme].secondaryText,
                marginTop: 4,
                fontSize: 12,
                textAlign: "center",
              }}
            >
              {text.length} / 400 {t("project.characters")}
            </Text>
          </View>

          {/* Color Picker */}
          <View style={{ marginTop: 12, width: "100%" }}>
            <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
              {t("project.colorPicker")}:
            </Text>
            <ColorPicker
              onColorSelected={setColorSelected}
              selectedColor={selectedColor}
            />
          </View>

          {/* Buttons */}
          <View className="flex flex-row justify-center gap-4 mt-4 w-full">
            <Pressable
              onPress={() => setModalVisible(false)}
              className="bg-red-500 px-6 py-3 rounded-md"
            >
              <Text className="text-white text-center font-semibold">
                {t("project.cancel")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => handleCreate()}
              className="bg-green px-6 py-3 rounded-md"
            >
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

export default CreateProjectModal;
