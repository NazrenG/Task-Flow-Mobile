import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { useTranslation } from "react-i18next";

export default function ProjectStateDropdown() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const options = [
    t("project.complated"),
    t("project.onGoing"),
    t("project.pending"),
  ];

  return (
    <View className="">
      <View className="relative">
        <Pressable
          onPress={() => setOpen(!open)}
          className="border rounded-md p-4 bg-white"
        >
          <Text className="text-gray-600">
            {selected ? selected : "Select priority"}
          </Text>
        </Pressable>

        {open && (
          <View className="absolute top-full left-0 right-0 mt-1 border rounded-md bg-white z-10">
            {options.map((option, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setSelected(option);
                  setOpen(false);
                }}
                className="p-3 border-b last:border-b-0"
              >
                <Text className="text-gray-700">{option}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
