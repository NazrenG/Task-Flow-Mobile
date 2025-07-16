import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import TableView from "./TableView";
import { useTranslation } from "react-i18next";


const initialColumns = {
  todo: [
    {
      id: "1",
      title: "Login UI düzəlt",
      labelColor: "bg-red-500",
      dueDate: "10 Tem",
      assignee: "https://i.pravatar.cc/40?img=1",
    },
    {
      id: "2",
      title: "Firebase Auth əlavə et",
      labelColor: "bg-blue-500",
      dueDate: "12 Tem",
      assignee: "https://i.pravatar.cc/40?img=2",
    },
  ],
  inprogress: [
    {
      id: "3",
      title: "Project strukturunu planlaşdır",
      labelColor: "bg-yellow-500",
      dueDate: "15 Tem",
      assignee: "https://i.pravatar.cc/40?img=3",
    },
  ],
  done: [
    {
      id: "4",
      title: "Test et və yaz",
      labelColor: "bg-green-500",
      dueDate: "18 Tem",
      assignee: "https://i.pravatar.cc/40?img=4",
    },
  ],
};

const columnOrder = ["todo", "inprogress", "done"];

const tabColors = {
  table: {
    bg: "bg-light_green",
    activeBg: "bg-green",
    text: "text-white",
  },
  kanban: {
    bg: "bg-bg_yellow",
    activeBg: "bg-yellow",
    text: "text-white",
  },
};

export default function App() {
  const router = useRouter();
  const [columns, setColumns] = useState(initialColumns);
  const [activeView, setActiveView] = useState("kanban");
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("kanban");
    const { t } = useTranslation();  


  const moveItem = (from, to, id) => {
    setColumns((prev) => {
      const item = prev[from].find((i) => i.id === id);
      if (!item) return prev;

      return {
        ...prev,
        [from]: prev[from].filter((i) => i.id !== id),
        [to]: [...prev[to], item],
      };
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header onSearch={setSearchText} />

      <View className="flex-1 justify-between bg-gray-100 pt-2">
        <View className="flex-row justify-between p-4">
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="arrow-back-ios" size={25} color="black" />
          </TouchableOpacity>
          <View className="flex-row gap-2">
            <TouchableOpacity
              onPress={() => {
                setActiveView("kanban");
                setActiveTab("kanban");
              }}
              className={`py-2 px-4 rounded-full ${
                activeTab === "kanban"
                  ? tabColors["kanban"].activeBg
                  : tabColors["kanban"].bg
              }`}
            >
              <Text className="text-white font-semibold">{t("kanban.kanban")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setActiveView("table");
                setActiveTab("table");
              }}
              className={`py-2 px-4 rounded-full ${
                activeTab === "table"
                  ? tabColors["table"].activeBg
                  : tabColors["table"].bg
              }`}
            >
              <Text className="text-white font-semibold">{t("kanban.table")}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-row justify-center px-4 mb-2">
          <Text className=" text-gray-500 text-2xl font-semibold mb-2">
            Project Name
          </Text>
        </View>
        {/*Kanban*/}
        {activeView === "kanban" && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-1"
            contentContainerStyle={{ paddingHorizontal: 12 }}
          >
            {columnOrder.map((col) => (
              <View
                key={col}
                style={{
                  width: Dimensions.get("window").width * 0.75,
                  marginHorizontal: 8,
                  padding: 12,
                  borderRadius: 8,
                  backgroundColor: "#F8F8F8",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  {col === "todo" && (
                    <FontAwesome name="list-ul" size={17} color="black" />
                  )}
                  {col === "inprogress" && (
                    <FontAwesome
                      name="hourglass-half"
                      size={17}
                      color="black"
                    />
                  )}
                  {col === "done" && (
                    <FontAwesome name="check-circle" size={17} color="black" />
                  )}
                  <Text
                    style={{ fontSize: 16, fontWeight: "bold", marginLeft: 6 }}
                  >
                    {col === "todo"
                      ? "To Do"
                      : col === "inprogress"
                      ? "In Progress"
                      : "Done"}
                  </Text>
                </View>

                {columns[col].map((item) => (
                  <View
                    key={item.id}
                    className="bg-white rounded-lg p-3 mb-4 shadow-sm"
                  >
                    <View
                      style={{
                        width: 48,
                        height: 4,
                        borderRadius: 2,
                        backgroundColor:
                          item.labelColor === "bg-red-500"
                            ? "#ef4444"
                            : item.labelColor === "bg-blue-500"
                            ? "#3b82f6"
                            : item.labelColor === "bg-yellow-500"
                            ? "#eab308"
                            : item.labelColor === "bg-green-500"
                            ? "#22c55e"
                            : "#999",
                        marginBottom: 8,
                      }}
                    />

                    <Text className="text-gray-900 font-semibold mb-2">
                      {item.title}
                    </Text>
                    <View className="flex-row justify-between items-center mb-2">
                      <Image
                        source={{ uri: item.assignee }}
                        className="w-6 h-6 rounded-full"
                      />
                      <Text className="text-xs text-gray-500">
                        {item.dueDate}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: "#e5e7eb",
                        marginTop: 8,
                        overflow: "hidden",
                      }}
                    >
                      <View
                        style={{
                          width: `60%`,
                          height: "100%",
                          backgroundColor:
                            item.labelColor === "bg-red-500"
                              ? "#ef4444"
                              : item.labelColor === "bg-blue-500"
                              ? "#3b82f6"
                              : item.labelColor === "bg-yellow-500"
                              ? "#eab308"
                              : item.labelColor === "bg-green-500"
                              ? "#22c55e"
                              : "#999",
                        }}
                      />
                    </View>
                    <View className="flex-row mt-2">
                      <TouchableOpacity
                        className="bg-gray-300 px-3 py-1 rounded mr-2"
                        onPress={() => {
                          const idx = columnOrder.indexOf(col);
                          if (idx > 0) {
                            moveItem(col, columnOrder[idx - 1], item.id);
                          }
                        }}
                      >
                        <Text className="text-gray-700 text-xs font-semibold">
                          {t("kanban.back")}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="bg-green-500 px-3 py-1 rounded"
                        onPress={() => {
                          const idx = columnOrder.indexOf(col);
                          if (idx < columnOrder.length - 1) {
                            moveItem(col, columnOrder[idx + 1], item.id);
                          }
                        }}
                      >
                        <Text className="text-black text-xs font-semibold">
                          {t("kanban.next")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
        )}

        {/* table*/}
        {activeView === "table" && <TableView />}
      </View>
    </SafeAreaView>
  );
}
