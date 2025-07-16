import Card from "@/components/Card/Card";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
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
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-center mb-2">
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
      <View className="flex-row justify-between mb-3">
        <Text className="text-xs text-gray-500">Project:</Text>
        <Text className="text-xs font-medium text-gray-800">
          {item.project}
        </Text>
      </View>
      <View className="flex-row space-x-2 gap-1 ">
        <TouchableOpacity
          className="  bg-gray-200 p-2 rounded-full "
          onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <MaterialIcons name="edit" color={"gray"} size={15} />
        </TouchableOpacity>
        <TouchableOpacity className="  bg-gray-200 p-2 rounded-full">
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

        {/* Stats Cards */}
        <View className="flex-row flex-wrap justify-between items-center mx-4 p-4 mt-2 gap-2 rounded-lg bg-white shadow-sm">
          <Card
            title={t("task.totalTasks")}
            count="0"
            color={Colors.secondary.bg_yellow}
            icon={<MaterialIcons name="assignment" size={20} color="#D97706" />}
            gradient={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
          />
          <Card
            title={t("task.runningTasks")}
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
            title={t("task.runningTasks")}
            count="0"
            color={Colors.secondary.bg_violet}
            icon={
              <MaterialIcons
                name="pause-circle-outline"
                size={20}
                color="white"
              />
            }
            gradient={[Colors.secondary.violet, Colors.secondary.lightViolet]} // Gradient colors for the card
          />
          <Card
            title={t("task.completeTasks")}
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

        {/* Filter */}
        <View className="px-4">
          <View className="flex-row items-center justify-between mt-4 mb-2">
            <Text className="text-lg font-bold">{t("task.tasks")}</Text>
            <TouchableOpacity
              className="px-3 py-1 rounded-md bg-green-500"
              onPress={() => router.push("/tasks/create")}
            >
              <Text className="text-white text-xs font-semibold">
                Create Task
              </Text>
            </TouchableOpacity>
          </View>
          <View className="border-b border-gray-200 mb-4" />

          <View className="flex-row justify-between mb-3">
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
                  <Text
                    className={`text-xs ${
                      filter === s ? "text-gray-800" : "text-gray-800"
                    }`}
                  >
                    {s}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Task List */}
        <FlatList
          className="flex-1 px-4"
          data={searchFilteredData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No tasks found.
            </Text>
          }
        />
      </SafeAreaView>
    </>
  );
}

const styles = {
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  modalButtonText: {
    marginLeft: 10,
    fontSize: 16,
  },
};
