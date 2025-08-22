import Card from "@/components/Card/Card";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
import {
  fetchCompletedTaskCount,
  fetchDeleteTask,
  fetchGetAllTasks,
  fetchOnHoldTaskCount,
  fetchRunningTaskCount,
  fetchTotalTaskCount,
  fetchUpdateTask,
} from "../../utils/taskUtils";
import TaskModal from "./TaskModal";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../components/ThemeContext";

const statusFilters = ["to do", "in progress", "done", "All"];

const getStatusBgColor = (status, filter) => {
  if (filter === status) {
    switch (status) {
      case "to do":
        return "bg-bg_blue";
      case "in progress":
        return "bg-bg_yellow";
      case "done":
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
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [totalTaskCount, setTotalTaskCount] = useState("");
  const [runningTaskCount, setRunningTaskCount] = useState("");
  const [onHoldTaskCount, setOnHoldTaskCount] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState("");
  const [tasks, setTasks] = useState([]);

  //delete task function
  const deleteTask = async (taskId) => {
    try {
      await fetchDeleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      fetchTaskCounts();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (taskId, task) => {
    try {
      await fetchUpdateTask(taskId, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskId ? { ...t, ...task } : t))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  useEffect(() => {
    fetchTaskCounts();
  }, []);
  const fetchTaskCounts = async () => {
    const total = await fetchTotalTaskCount();
    const running = await fetchRunningTaskCount();
    const onHold = await fetchOnHoldTaskCount();
    const completed = await fetchCompletedTaskCount();
    const allTasks = await fetchGetAllTasks();
    setTasks(allTasks);
    setTotalTaskCount(total);
    setRunningTaskCount(running);
    setOnHoldTaskCount(onHold);
    setCompletedTaskCount(completed);
  };

  const filteredData =
    filter === "All" ? tasks : tasks.filter((item) => item.status === filter);

  const searchFilteredData = filteredData.filter((item) =>
    (item.title ?? "").toLowerCase().includes(searchText.toLowerCase())
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
    <View className=" rounded-xl p-4 mb-2 shadow-sm border border-gray-200" style={{ backgroundColor: Colors[theme].card }}>
      <View className="flex-row justify-between items-center mb-1">
        <Text
          className="text-base font-semibold text-gray-900 flex-1"
          style={{ color: item.color || "black" || Colors[theme].text } }
     
        >
          {item.title}
        </Text>
        <Text
          className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            item.status === "done"
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

      <View className="flex-row justify-between mb-1" style={{ color: Colors[theme].text }}>
        <Text className="text-xs " style={{ color: Colors[theme].text }}>{t("task.priority")}:</Text>
        <Text className={`text-xs font-medium ${priorityColor(item.priority)}`}>
          {item.priority}
        </Text>
      </View>

      <View className="flex-row justify-between mb-1">
        <Text className="text-xs " style={{ color: Colors[theme].text }}>{t("task.deadline")}:</Text>
        <Text className={`text-xs font-medium ${deadlineColor(item.deadline)}`}>
          {item.deadline}
        </Text>
      </View>

      <View className="flex-row justify-between mb-2">
        <Text className="text-xs " style={{ color: Colors[theme].text }}>{t("task.project")}:</Text>
        <Text className="text-xs font-medium " style={{ color: Colors[theme].text }}>
          {item.project}
        </Text>
      </View>

      <View className="flex-row space-x-2 gap-1">
        <TouchableOpacity
          className="bg-gray-200 p-2 rounded-full" style={{ backgroundColor: Colors.secondary.bg_green }}
          onPress={() => {
            setSelectedItem(item);
            setModalVisible(true);
          }}
        >
          <MaterialIcons
            name="edit"
            color={Colors.secondary.green}
            size={15}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-200 p-2 rounded-full" style={{ backgroundColor: Colors.secondary.light_red }}
          onPress={() => deleteTask(item.id)}
        >
          <MaterialIcons
            name="delete"
            color={"red"}
            size={15}
          />
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
          updateTask(updatedTask.id, updatedTask);
          console.log("Added or updated task:", updatedTask);
          setModalVisible(false);
        }}
      />

      <SafeAreaView className="flex-1 bg-gray-50">
        <Header onSearch={setSearchText} />

        <View className="items-center px-4 py-2">
          <View className="flex-row flex-wrap justify-between items-center w-full rounded-lg bg-white shadow-sm p-4 mx-4 gap-2 mb-2">
            <Card
              title="Total Task"
              count={totalTaskCount}
              color={Colors.secondary.bg_yellow}
              icon={
                <MaterialIcons name="assignment" size={20} color="#D97706" />
              }
              gradient={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
            />
            <Card
              title="Running Task"
              count={runningTaskCount}
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
              count={onHoldTaskCount}
              color={Colors.secondary.bg_violet}
              icon={
                <MaterialIcons
                  name="pause-circle-outline"
                  size={20}
                  color="white"
                />
              }
              gradient={[Colors.secondary.violet, Colors.secondary.lightViolet]}
            />
            <Card
              title="Complete Task"
              count={completedTaskCount}
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
            <Text className="text-white font-bold text-base">{t("task.createtask")}</Text>
          </Pressable>
        </View>

        <View className="px-4 " style={{ backgroundColor: Colors[theme].background }}>
            <Text className="text-lg font-bold" style={{ color: Colors[theme].text }}>{t("task.tasks")}</Text>

          <View className="border-b border-gray-200 my-2" />

          <View className="flex-row justify-between mb-2" style={{ backgroundColor: Colors[theme].background }}>
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name="arrow-back-ios" size={20} color={Colors[theme].text} />
            </TouchableOpacity>

            <View className="flex-row flex-wrap justify-end flex-1 ml-4" style={{ backgroundColor: Colors[theme].background }}>
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
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          style={{ backgroundColor: Colors[theme].background }}
          ListEmptyComponent={
            <LottieView
              source={require("../../assets/animations/EmptyArray.json")}
              autoPlay
              loop
              style={{ width: 350, height: 170 }}
            />
          }
        />
      </SafeAreaView>
    </>
  );
}
