import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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
    onClose(); // close modal
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-xl w-11/12 p-6 max-h-[80%]">
          <Text className="text-lg font-semibold mb-4">
            {t("project.selectUsers")}
          </Text>

          <TextInput
            placeholder="Search users..."
            value={searchText}
            onChangeText={setSearchText}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 200 }} // fix overflow
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
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-400"
                    }`}
                  >
                    {isSelected && (
                      <Text className="text-white text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <Text className="text-base text-gray-800">{item.name}</Text>
                </Pressable>
              );
            }}
          />

          <View className="flex-row justify-end gap-2 mt-6">
            <TouchableOpacity
              onPress={() => onClose(false)}
              className="px-4 py-2 bg-red-500 rounded-md"
            >
              <Text className="text-white font-medium">
                {t("project.cancel")}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleSubmit()}
              className="px-4 py-2 bg-green rounded-md"
            >
              <Text className="text-white font-medium">
                {t("project.submit")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
