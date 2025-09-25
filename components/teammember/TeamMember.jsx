import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

const dummyMembers = [
  {
    id: "1",
    name: "John Doe",
    occupation: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "2",
    name: "Emily Smith",
    occupation: "UI/UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "3",
    name: "Michael Brown",
    occupation: "Backend Developer",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];

const TeamMembers = () => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View
      className="w-full p-3 rounded-xl shadow-sm mb-3"
      style={{ backgroundColor: colors.card }}
    >
      <Text className="font-bold text-lg mb-2" style={{ color: colors.text }}>
        Team Members
      </Text>
      <FlatList
  data={dummyMembers}
  keyExtractor={(item) => item.id}
  scrollEnabled={false}   
  renderItem={({ item }) => (
    <View className="flex-row items-center mb-3">
      <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full mr-3" />
      <View>
        <Text className="font-semibold text-base">{item.name}</Text>
        <Text className="text-sm text-gray-500">{item.occupation}</Text>
      </View>
    </View>
  )}
/>
    </View>
  );
};

export default TeamMembers;