import { useState } from "react";
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
];

export default function UserSelectorModal({ visible, onClose }) {
  const [searchText, setSearchText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);

  const filteredUsers = fakeUsers.filter((user) =>
    user.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSubmit = async () => {
    // const selectedUser = fakeUsers.find((u) => u.id === selectedUserId);
    // if (!selectedUser) {
    //   Alert.alert("Please select a user first.");
    //   return;
    // }
    // try {
    //   const response = await fetch("", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ userId: selectedUser.id }),
    //   });
    //   const result = await response.json();
    //   console.log(" User assigned:", result);
    //   Alert.alert("Success", `${selectedUser.name} was assigned!`);
    //   onClose();
    // } catch (err) {
    //   console.error(err);
    //   Alert.alert("Error", "Something went wrong.");
    // }
  };

  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-xl w-11/12 p-6 max-h-[80%]">
          <Text className="text-lg font-semibold mb-4">Select a User</Text>

          <TextInput
            placeholder="Search users..."
            value={searchText}
            onChangeText={setSearchText}
            className="border border-gray-300 rounded-md px-4 py-2 mb-4"
          />

          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedUserId === item.id;

              return (
                <Pressable
                  onPress={() => setSelectedUserId(item.id)}
                  className="flex-row items-center mb-4"
                >
                  <View
                    className={`w-6 h-6 rounded-full border-2 ${
                      isSelected ? "border-blue-500" : "border-gray-400"
                    } items-center justify-center`}
                  >
                    {isSelected && (
                      <View className="w-3 h-3 rounded-full bg-blue-500" />
                    )}
                  </View>
                  <Text className="ml-3 text-base text-gray-800">
                    {item.name}
                  </Text>
                </Pressable>
              );
            }}
          />

          <View className="flex flex-row  gap-1 mt-6">
            <TouchableOpacity
              onPress={() => onClose(false)}
              className="px-4 py-2 bg-red-500 rounded-md"
            >
              <Text className="text-white font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              className="px-4 py-2 bg-green-500 rounded-md"
            >
              <Text className="text-white font-medium">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
