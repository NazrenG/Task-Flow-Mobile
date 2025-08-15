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
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
const width = Dimensions.get("window").width;

const CreateProjectModal = ({ modalVisible, setModalVisible }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [text, setText] = useState("");

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
         <Text className="text-2xl" style={{ color: Colors[theme].text }}>{t("project.createProject")}</Text>

          {/* Project Name & State */}
          <View style={{ flexDirection: "row", gap: 12, width: "100%", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.projectName")}:
              </Text>
              <ProjectInput
                placeholder={t("project.enterProjectName") + "..."}
                style={{ color: Colors[theme].text }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.projectState")}:
              </Text>
              <ProjectStateDropdown />
            </View>
          </View>

          {/* Start & End Dates */}
          <View style={{ flexDirection: "row", gap: 12, width: "100%", justifyContent: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.startDate")}:
              </Text>
              <TextInput
                value={startDate}
                onChangeText={setStartDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={Colors[theme].placeholder}
                style={{
                  color: Colors[theme].text,
                  borderColor: Colors[theme].border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 8,
                }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>
                {t("project.endDate")}:
              </Text>
              <TextInput
                value={endDate}
                onChangeText={setEndDate}
                placeholder="YYYY-MM-DD"
                placeholderTextColor={Colors[theme].placeholder}
                style={{
                  color: Colors[theme].text,
                  borderColor: Colors[theme].border,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 8,
                }}
              />
            </View>
          </View>

          {/* Description */}
          <View style={{ marginTop: 12, width: "100%" }}>
            <Text style={{ color: Colors[theme].text }}>{t("project.description")}:</Text>
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
            <Text style={{ color: Colors[theme].secondaryText, marginTop: 4, fontSize: 12, textAlign: "center" }}>
              {text.length} / 400 {t("project.characters")}
            </Text>
          </View>

          {/* Color Picker */}
          <View style={{ marginTop: 12, width: "100%"}}>
            <Text style={{ color: Colors[theme].text, marginBottom: 4 }}>{t("project.colorPicker")}:</Text>
            <ColorPicker />
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

export default CreateProjectModal;
