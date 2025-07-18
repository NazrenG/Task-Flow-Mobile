import Card from "@/components/Card/Card";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Colors } from "../../constants/Colors";
import TaskModal from "./TaskModal";
import { useTranslation } from "react-i18next";


const mockData = [
  {
    id: "1",
    title: "New task",
    priority: "medium",
    createdAt: "19-06-2025",
    deadline: "07-08-2025",
    project: "No Team",
    status: "to do",
  },
  {
    id: "2",
    title: "Long task title example to see wrapping",
    priority: "medium",
    createdAt: "08-07-2025",
    deadline: "08-07-2025",
    project: "No Team",
    status: "in progress",
  },
  {
    id: "3",
    title: "zazazaza",
    priority: "easy",
    createdAt: "08-07-2025",
    deadline: "09-07-2025",
    project: "No Team",
    status: "completed",
  },
];

const statusFilters = ["to do", "in progress", "completed", "All"];

const getStatusBgColor = (status, filter) => {
  if (filter === status) {
    switch (status) {
      case "to do":
        return "bg-bg_blue";
      case "in progress":
        return "bg-bg_yellow";
      case "completed":
        return "bg-bg_green";
      default:
        return "bg-gray-300";
    }
  } else {
    return "bg-gray-200";
  }
};

export default function TaskListMobile() {
  const [filter, setFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();  

  const filteredData =
    filter === "All"
      ? mockData
      : mockData.filter((item) => item.status === filter);

  const searchFilteredData = filteredData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const priorityColor = (priority) => {
    switch (priority) {
      case "medium":
        return "text-orange-500";
      case "easy":
        return "text-green-500";
      case "hard":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const deadlineColor = (deadline) => {
    return deadline === "08-07-2025" || deadline === "09-07-2025"
      ? "text-red-500"
      : "text-gray-700";
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-2 shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-center mb-1">
        <Text className="text-base font-semibold text-gray-900 flex-1">
          {item.title}
        </Text>
        <Text
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            item.status === "completed"
              ? "bg-bg_green text-gray-800"
              : item.status === "in progress"
              ? "bg-bg_yellow text-gray-800"
              : item.status === "to do"
              ? "bg-bg_blue text-gray-800"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {item.status}
        </Text>
      </View>

      <View className="flex-row justify-between mb-1">
        <Text className="text-xs text-gray-500">Priority:</Text>
        <Text className={`text-xs font-medium ${priorityColor(item.priority)}`}>
          {item.priority}
        </Text>
      </View>

      <View className="flex-row justify-between mb-1">
        <Text className="text-xs text-gray-500">Deadline:</Text>
        <Text className={`text-xs font-medium ${deadlineColor(item.deadline)}`}>
          {item.deadline}
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-xs text-gray-500">Project:</Text>
        <Text className="text-xs font-medium text-gray-800">
          {item.project}
        </Text>
      </View>

      <View className="flex-row space-x-2 gap-1">
        <TouchableOpacity
          className="bg-gray-200 p-2 rounded-full"
          onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="edit" color={"gray"} size={15} />
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-200 p-2 rounded-full">
          <MaterialIcons name="delete" color={"gray"} size={15} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <TaskModal
        visible={isModalVisible}
        task={selectedItem}
        onClose={() => setModalVisible(false)}
        onSave={(updatedTask) => {
          console.log("Kaydedilen task:", updatedTask);
          setModalVisible(false);
        }}
      />

      <SafeAreaView className="flex-1 bg-gray-50">
        <Header onSearch={setSearchText} />

        <View className="items-center px-4 py-2">
          <View className="flex-row flex-wrap justify-between items-center w-full rounded-lg bg-white shadow-sm p-4 mx-4 gap-2 mb-2">
            <Card
              title="Total Task"
              count="0"
              color={Colors.secondary.bg_yellow}
              icon={
                <MaterialIcons name="assignment" size={20} color="#D97706" />
              }
              gradient={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
            />
            <Card
              title="Running Task"
              count="2"
              color={Colors.secondary.bg_green}
              icon={
                <MaterialIcons
                  name="play-circle-outline"
                  size={20}
                  color="#059669"
                />
              }
              gradient={[Colors.secondary.green, Colors.secondary.lightGreen]}
            />
            <Card
              title="On Hold Task"
              count="0"
              color={Colors.secondary.bg_violet}
              icon={
                <MaterialIcons
                  name="pause-circle-outline"
                  size={20}
                  color="white"
                />
              }
              gradient={[
                Colors.secondary.violet,
                Colors.secondary.lightViolet,
              ]}
            />
            <Card
              title="Complete Task"
              count="0"
              color={Colors.secondary.bg_blue}
              icon={
                <MaterialIcons
                  name="check-circle-outline"
                  size={20}
                  color="#0E7490"
                />
              }
              gradient={["#A5F3FC", "#22D3EE"]}
            />
          </View>

          <Pressable
            className="flex flex-row justify-center bg-navyBlue rounded-xl items-center gap-1  p-3 mt-2 "
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="plus" size={15} color="white" />
            <Text className="text-white font-bold text-base">Create Task</Text>
          </Pressable>
        </View>

        <View className="px-4 mt-2">
          <Text className="text-lg font-bold">Tasks</Text>
          <View className="border-b border-gray-200 my-2" />

          <View className="flex-row justify-between mb-2">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={20} color="black" />
            </TouchableOpacity>

            <View className="flex-row flex-wrap justify-end flex-1 ml-4">
              {statusFilters.map((s) => (
                <TouchableOpacity
                  key={s}
                  onPress={() => setFilter(s)}
                  className={`px-3 py-1 mr-2 mb-2 rounded-full ${getStatusBgColor(
                    s,
                    filter
                  )}`}
                >
                  <Text className="text-xs text-gray-800">{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <FlatList
          className="px-4"
          data={searchFilteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-4">
              No tasks found.
            </Text>
          }
        />
      </SafeAreaView>
    </>
  );
}
