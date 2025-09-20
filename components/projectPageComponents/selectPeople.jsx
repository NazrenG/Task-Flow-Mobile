import { useEffect, useState } from "react";
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
import {
  fetchAllUsersAndMembers,
  fetchUpdateTeammemberList,
} from "../../utils/fetchUtils";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../components/ThemeContext";

// const fakeUsers = [
//   { id: "1", name: "Alice Smith" },
//   { id: "2", name: "Bob Johnson" },
//   { id: "3", name: "Charlie Davis" },
//   { id: "4", name: "Diana Evans" },
//   { id: "5", name: "Eliot Rogers" },
//   { id: "6", name: "Farid Salman" },
//   { id: "7", name: "Gulnar N." },
// ];

export default function UserSelectorModal({ visible, onClose, projectID }) {
  const [searchText, setSearchText] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const { t } = useTranslation();
  const [userList, setUserList] = useState([]);
  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );
  const { theme } = useTheme();

  const toggleSelection = (id) => {
    setSelectedUserIds((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    const selectedUsers = userList.filter((u) =>
      selectedUserIds.includes(u.id)
    );
    console.log("Selected users:", selectedUsers);
    const response = await fetchUpdateTeammemberList(projectID, selectedUsers);
    console.log("in handlesubmit: " + JSON.stringify(response));
    onClose(false);
  };

  useEffect(() => {
    const getData = async () => {
      console.log("project id: " + projectID);
      if (!projectID) return;
      const response = await fetchAllUsersAndMembers(projectID);
      console.log(
        "in useeffect all users and members: " + JSON.stringify(response)
      );
      setUserList(response ? response : []);
    };
    if (visible) getData();
  }, [visible, projectID]);

  return (
    <Modal animationType="fade" transparent visible={visible} >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-xl w-11/12 p-6 max-h-[80%]" style={{backgroundColor: Colors[theme].card
        } }>
          <Text className="text-lg font-semibold mb-4" style={{color: Colors[theme].text}}>
            {t("project.selectUsers")}
          </Text>

          <TextInput
            placeholder="Search users..."
            placeholderTextColor={{ color: Colors[theme].text }} // 🔹 Əsas dəyişiklik

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
                    className={`w-6 h-6 rounded-md border-2 mr-2 items-center justify-center
    ${
      isSelected && item.isRequested
        ? "border-gray-400 bg-white"
        : isSelected
        ? "border-blue-500 bg-blue-500"
        : item.isRequested
        ? "border-red-500 bg-red-900"
        : item.isSelected
        ? "border-green-500 bg-green-500"
        : "border-gray-400 bg-white"
    }
  `}
                  >
                    {item.isSelected && (
                      <Text className="text-black text-xs font-bold">✓</Text>
                    )}
                  </View>
                  <View className="flex">
                    <Text className="text-base text-gray-800">{item.name}</Text>
                    <Text className="text-base text-gray-600">
                      {item.email}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />

          <View className="flex-row justify-end gap-2 mt-6">
            <TouchableOpacity
              onPress={() => {
                setSelectedUserIds([]);
                onClose(false);
              }}
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
