// import { useTranslation } from "react-i18next";
// import { ScrollView, Text, View } from "react-native";
// import { useTheme } from "../../components/ThemeContext";
// import { Colors } from "../../constants/Colors";

// const TaskCard = ({ title, time }) => (
//   <View className="bg-[#ffa100] p-4 rounded-md w-[140px] mr-4">
//     <Text className="text-white text-base font-medium">{title}</Text>
//     <Text className="text-gray-200 text-sm">{time}</Text>
//   </View>
// );

// export default function DailyTasks() {
//     const { t } = useTranslation();
//     const { theme } = useTheme();

//   return (
//     <View className=" mt-4 rounded-lg shadow-md p-3"  style={{ backgroundColor: Colors[theme].card }}>
//       <Text className="text-xl font-semibold  mb-4"  style={{ color: Colors[theme].text }}>
//         {t("dashboard.dailyTasks")}
//       </Text>

//       <View className="flex-row items-center mb-4">
//         <Text className="text-sm text-gray-500 w-[50px]">00:00</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <TaskCard title={t("dashboard.noTask")} time="12:00PM - 13:00PM" />
//           <TaskCard title={t("dashboard.noTask")} time="14:00PM - 15:00PM" />

//         </ScrollView>
//       </View>

//       <View className="flex-row items-center">
//         <Text className="text-sm text-gray-500 w-[50px]">01:00</Text>
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           <TaskCard title={t("dashboard.noTask")} time="13:00PM - 14:00PM" />
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { getToken } from "../../secureStore";
import { fetchUserDailyTask,fetchWorkDailyTask } from "@/utils/dashboardUtils";
const TaskCard = ({ title, time, color }) => (
  <View
    className="p-4 rounded-md w-[140px] mr-4"
    style={{ backgroundColor: color || "#ffa500" }}
  >
    <Text className="text-white text-base font-medium">{title}</Text>
    <Text className="text-gray-200 text-sm">{time}</Text>
  </View>
);

export default function DailyTasks() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getToken("authToken");
        const workDailyTask=await fetchWorkDailyTask(token);
        const userDailyTask=await fetchUserDailyTask(token);
        const combined = [
          ...workDailyTask.map((task) => ({ ...task, source: "project" })),
          ...userDailyTask.map((task) => ({ ...task, source: "user" })),
        ];
        setItems(combined);
        // const [projectRes, userRes] = await Promise.all([

        //   fetch("https://85d4e2d27067.ngrok-free.app/api/Work/DailyTask", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }),
        //   fetch("https://85d4e2d27067.ngrok-free.app/api/UserTask/DailyTask", {
        //     headers: {
        //       Authorization: `Bearer ${token}`,
        //     },
        //   }),
        // ]);

        // if (projectRes.ok && userRes.ok) {
        //   const projectTasks = await projectRes.json();
        //   const userTasks = await userRes.json();

        //   const combined = [
        //     ...projectTasks.map((task) => ({ ...task, source: "project" })),
        //     ...userTasks.map((task) => ({ ...task, source: "user" })),
        //   ];

        //   setItems(combined);
       // }
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    };

    fetchTasks();
  }, []);

  const groupedItems = items.reduce((acc, item) => {
    const startHour = new Date(item.startTime).getHours();
    if (!acc[startHour]) acc[startHour] = [];
    acc[startHour].push(item);
    return acc;
  }, {});

  const placeholderTasks = [
    {
      title: t("dashboard.noTask"),
      startTime: new Date(),
      deadline: new Date(),
      color: "#ed8030",
    },
  ];

  const tasksToDisplay =
    items.length > 0
      ? groupedItems
      : {
          0: placeholderTasks,
          1: placeholderTasks,
        };

  return (
    <View
      className="mt-4 rounded-lg shadow-md p-3"
      style={{ backgroundColor: Colors[theme].card }}
    >
      <Text
        className="text-xl font-semibold mb-4"
        style={{ color: Colors[theme].text }}
      >
        {t("dashboard.dailyTasks")}
      </Text>

      {Object.keys(tasksToDisplay).map((hour) => (
        <View key={hour} className="flex-row items-center mb-4">
          <Text className="text-sm text-gray-500 w-[50px]">{hour}:00</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {tasksToDisplay[hour].map((task, idx) => (
              <TaskCard
                key={idx}
                title={task.title || "Title"}
                time={`${new Date(task.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${new Date(task.deadline).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
                color={task.color}
              />
            ))}
          </ScrollView>
        </View>
      ))}
    </View>
  );
}
