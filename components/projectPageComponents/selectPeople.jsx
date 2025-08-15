import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../components/ThemeContext";

const fakeUsers = [
  { id: "1", name: "Alice Smith" },
  { id: "2", name: "Bob Johnson" },
  { id: "3", name: "Charlie Davis" },
  { id: "4", name: "Diana Evans" },
  { id: "5", name: "Eliot Rogers" },
  { id: "6", name: "Farid Salman" },
  { id: "7", name: "Gulnar N." },
];

export default function UserSelectorModal({ visible, onClose }) {
  const [searchText, setSearchText] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { t } = useTranslation();
  const { theme } = useTheme();

  const filteredUsers = fakeUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const selectedUsers = fakeUsers.filter((u) =>
      selectedUserIds.includes(u.id)
    );
    console.log("Selected users:", selectedUsers);
    onClose();
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: Colors[theme].overlay }}
      >
        <View
          className="rounded-xl w-11/12 p-6 max-h-[80%]"
          style={{ backgroundColor: Colors[theme].card }}
        >
          <Text
            className="text-lg font-semibold mb-4"
            style={{ color: Colors[theme].text }}
          >
            {t("project.selectUsers")}
          </Text>

          <TextInput
            placeholder="Search users..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor={Colors[theme].placeholder}
            style={{
              borderColor: Colors[theme].border,
              borderWidth: 1,
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 8,
              marginBottom: 16,
              color: Colors[theme].text,
            }}
          />

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 200 }}
            renderItem={({ item }) => {
              const isSelected = selectedUserIds.includes(item.id);
              return (
                <Pressable
                  onPress={() => toggleSelection(item.id)}
                  className="flex-row items-center mb-4"
                >
                  <View
                    className={`w-6 h-6 rounded-md border-2 mr-2 items-center justify-center ${
                      isSelected
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text
                    style={{ color: Colors[theme].text }}
                    className="text-base"
                  >
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />

          {/* Buttons */}
          <View className="flex-row justify-end gap-2 mt-6">
            <Pressable
              onPress={() => onClose(false)}
              className="px-4 py-2 bg-red-500 rounded-md"
            >
              <Text className="text-white font-medium">
                {t("project.cancel")}
              </Text>
            </Pressable>
            <Pressable
              onPress={handleSubmit}
              className="px-4 py-2 bg-green rounded-md"
            >
              <Text className="text-white font-medium">
                {t("project.submit")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
