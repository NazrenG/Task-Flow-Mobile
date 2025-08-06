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
import { useTheme } from "../ThemeContext";
import { Colors } from "../../constants/Colors";

const width = Dimensions.get("window").width;

const EditTaskDateModal = ({ modalVisible, setModalVisible, selectedTask }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const colors = Colors[theme];

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
            backgroundColor: colors.card,
            padding: 24,
            borderRadius: 16,
            gap: 24,
            width: width - 30,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: colors.text,
              fontWeight: "bold",
            }}
          >
            {t("calendar.edittask.editTask")}
          </Text>

          <View style={{ flexDirection: "row", gap: 12 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 8, color: colors.text }}>
                {t("calendar.edittask.taskName")}
              </Text>
              <Text
                style={{
                  marginTop: 8,
                  marginBottom: 4,
                  borderWidth: 1,
                  borderColor: colors.border,
                  padding: 8,
                  borderRadius: 8,
                  color: colors.text,
                }}
              >
                {selectedTask}
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 12,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={{ marginBottom: 8, color: colors.text }}>
                {t("calendar.edittask.startDate")}
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
              <Text style={{ marginBottom: 8, color: colors.text }}>
                {t("calendar.edittask.endDate")}
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

          <View style={{ flexDirection: "row", justifyContent: "flex-end", gap: 16 }}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: "#EF4444",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
                {t("calendar.edittask.cancel")}
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#22C55E",
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>
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
