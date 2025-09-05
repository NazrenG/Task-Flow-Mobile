import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

export default function ProjectStateDropdown({ selectedState, onStateSelect }) {
  const { t } = useTranslation();
  // const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  const options = [
    t("project.complated"),
    t("project.onGoing"),
    t("project.pending"),
  ];

  return (
    <View>
      <View style={{ position: "relative" }}>
        <Pressable
          onPress={() => setOpen(!open)}
          style={{
            borderWidth: 1,
            borderColor: Colors[theme].border,
            borderRadius: 8,
            padding: 12,
            backgroundColor: Colors[theme].backgroundSecondary,
          }}
        >
          <Text style={{ color: Colors[theme].text }}>
            {selectedState ? selectedState : "Select priority"}
          </Text>
        </Pressable>

        {open && (
          <View
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              marginTop: 4,
              borderWidth: 1,
              borderColor: Colors[theme].border,
              borderRadius: 8,
              backgroundColor: Colors[theme].backgroundSecondary,
              zIndex: 10,
            }}
          >
            {options.map((option, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  onStateSelect(option);
                  setOpen(false);
                }}
                style={{
                  padding: 12,
                  borderBottomWidth: idx === options.length - 1 ? 0 : 1,
                  borderColor: Colors[theme].border,
                }}
              >
                <Text style={{ color: Colors[theme].text }}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
