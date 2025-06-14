import { AntDesign } from "@expo/vector-icons";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CalendarDropdown({
  data,
  onChange,
  placeholder = "Seçin...",
  selectedValue = "",
}) {
  const [expanded, setExpanded] = useState(false);
  const [top, setTop] = useState(0); // tezden bax
  const [value, setValue] = useState(selectedValue);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (item) => {
      onChange(item);
      setValue(item.label);
      setExpanded(false);
    },
    [onChange]
  );

  const onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    const topOffset = layout.y;
    const height = layout.height;
    const offset = Platform.OS === "android" ? -32 : 13;
    setTop(topOffset + height + offset);
  };

  return (
    <View onLayout={onLayout}>
      <TouchableOpacity
        className="h-12  flex-row justify-center items-center w-full align-baseline px-3 gap-2"
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text className="text-sm opacity-80">{value || placeholder}</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} size={13} />
      </TouchableOpacity>

      {expanded && (
        <Modal visible={expanded} transparent animationType="fade">
          <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
            <View className="flex-row bg-transparent">
              <View className="absolute right-[5px] top-20 bg-white p-1 rounded-md shadow-sm shadow-gray-600  elevation-md ">
                <FlatList
                  keyExtractor={(item) => item.value}
                  data={data}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="flex-row items-center
                       h-5 px-3"
                      onPress={() => handleSelect(item)}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={item.icon}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                      />
                      <Text>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View className="h-[1px] bg-gray-300" />
                  )}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
}
