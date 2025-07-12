import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";

import { router } from "expo-router";

const { width } = Dimensions.get("window");
const numColumns = 7;
const cellSize = width / numColumns;

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function getTaskVisibleRange(task, baseDate) {
  const startMonth = startOfMonth(baseDate);
  const endMonth = endOfMonth(baseDate);

  if (task.endDate < startMonth || task.startDate > endMonth) {
    return null;
  }

  const visibleStart =
    task.startDate > startMonth ? task.startDate : startMonth;
  const visibleEnd = task.endDate < endMonth ? task.endDate : endMonth;

  const startDay = visibleStart.getDate();
  const endDay = visibleEnd.getDate();

  return { startDay, endDay };
}

export default function App() {
  const [monthOffset, setMonthOffset] = useState(0);
  const [searchText, setSearchText] = useState("");
  const today = new Date();
  const baseDate = new Date(
    today.getFullYear(),
    today.getMonth() + monthOffset,
    1
  );
  const numDays = endOfMonth(baseDate).getDate();

  const days = Array.from({ length: numDays }, (_, i) => i + 1);

  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Login UI düzəlt",
      color: "#4f46e5",
      startDate: new Date(today.getFullYear(), today.getMonth(), 28),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 3),
    },
    {
      id: "2",
      title: "Auth əlavə et",
      color: "#10b981",
      startDate: new Date(today.getFullYear(), today.getMonth(), 5),
      endDate: new Date(today.getFullYear(), today.getMonth(), 8),
    },
    {
      id: "3",
      title: "Test yaz",
      color: "#f59e0b",
      startDate: new Date(today.getFullYear(), today.getMonth(), 5),
      endDate: new Date(today.getFullYear(), today.getMonth(), 8),
    },
    {
      id: "4",
      title: "Bildirişlər",
      color: "#ec4899",
      startDate: new Date(today.getFullYear(), today.getMonth() + 1, 2),
      endDate: new Date(today.getFullYear(), today.getMonth() + 1, 5),
    },
  ]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header onSearch={setSearchText} />

      {/* Back button */}

      <View
        style={{ flex: 1, paddingTop: 20, backgroundColor: "bg-background" }}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={{
              padding: 6,
            }}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>
            {baseDate.toLocaleString("default", { month: "long" })}
            {baseDate.getFullYear()}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <TouchableOpacity
              onPress={() => setMonthOffset(monthOffset - 1)}
              className="m-2 rounded-full bg-navyBlue p-2"
            >
              <AntDesign name="left" color="white"></AntDesign>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setMonthOffset(monthOffset + 1)}
              className="m-2 rounded-full bg-navyBlue p-2"
            >
              <AntDesign name="right" color="white"></AntDesign>
            </TouchableOpacity>
          </View>
        </View>

        {/* Takvim grid */}
        <View style={styles.grid}>
          {days.map((day) => (
            <View key={day} style={styles.cell}>
              <Text style={styles.dayText}>{day}</Text>
            </View>
          ))}

          {/* Görevleri renderla */}
          {tasks.map((task) => {
            const visibleRange = getTaskVisibleRange(task, baseDate);
            if (!visibleRange) return null; // Bu ayda görünmesin
            return (
              <DraggableTask
                key={task.id}
                task={task}
                baseDate={baseDate}
                visibleRange={visibleRange}
                setTasks={setTasks}
                tasks={tasks}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function DraggableTask({ task, baseDate, visibleRange, setTasks, tasks }) {
  const pan = useRef(new Animated.ValueXY()).current;

  const { startDay, endDay } = visibleRange;

  const startRow = Math.floor((startDay - 1) / numColumns);
  const startCol = (startDay - 1) % numColumns;
  const endCol = (endDay - 1) % numColumns;

  const splitNeeded = endCol < startCol;

  const duration = Math.max(endDay - startDay + 1, 1);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        const newCol = Math.floor(gesture.moveX / cellSize);
        const newRow = Math.floor((gesture.moveY - 110) / cellSize);

        const newDay = newRow * numColumns + newCol + 1;

        const durationDays =
          (task.endDate - task.startDate) / (1000 * 60 * 60 * 24);

        if (newDay >= 1 && newDay <= 31) {
          const newStartDate = new Date(
            baseDate.getFullYear(),
            baseDate.getMonth(),
            newDay
          );
          const newEndDate = new Date(
            newStartDate.getTime() + durationDays * 24 * 60 * 60 * 1000
          );

          setTasks(
            tasks.map((t) =>
              t.id === task.id
                ? { ...t, startDate: newStartDate, endDate: newEndDate }
                : t
            )
          );
        }

        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  // Eğer split yoksa tek parça renderla
  if (!splitNeeded) {
    const blockWidth = duration * cellSize - 4;

    return (
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          top: startRow * cellSize + 25,
          left: startCol * cellSize + 2,
          width: blockWidth,
          height: 30,
          backgroundColor: task.color,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          opacity: 0.9,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Text style={{ color: "white", fontSize: 11 }} numberOfLines={1}>
          {task.title}
        </Text>
      </Animated.View>
    );
  }

  // Split gerekiyorsa iki parça renderla
  const firstRowEndDay = (startRow + 1) * numColumns;
  const firstBlockWidth = (firstRowEndDay - startDay + 1) * cellSize - 4;
  const secondBlockWidth = (endDay - firstRowEndDay) * cellSize + cellSize - 4;

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          top: startRow * cellSize + 25,
          left: startCol * cellSize + 2,
          width: firstBlockWidth,
          height: 30,
          backgroundColor: task.color,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          opacity: 0.9,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Text style={{ color: "white", fontSize: 11 }} numberOfLines={1}>
          {task.title}
        </Text>
      </Animated.View>

      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: "absolute",
          top: (startRow + 1) * cellSize + 25,
          left: 2,
          width: secondBlockWidth,
          height: 30,
          backgroundColor: task.color,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
          opacity: 0.9,
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
      >
        <Text style={{ color: "white", fontSize: 11 }} numberOfLines={1}>
          {task.title}
        </Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  arrow: { fontSize: 18 },
  monthTitle: { fontSize: 18, fontWeight: "bold" },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: {
    width: cellSize,
    height: cellSize,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
  },
  dayText: { fontSize: 14, fontWeight: "bold" },
});
