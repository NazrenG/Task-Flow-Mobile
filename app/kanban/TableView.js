import { Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
const initialData = [
  {
    id: "1",
    title: "Login UI düzəlt",
    dueDate: "10 Tem",
    assignee: "https://i.pravatar.cc/40?img=1",
    status: "todo",
    labelColor: "bg-red-500",
  },
  {
    id: "2",
    title: "Firebase Auth əlavə et",
    dueDate: "12 Tem",
    assignee: "https://i.pravatar.cc/40?img=2",
    status: "todo",
    labelColor: "bg-blue-500",
  },
  {
    id: "3",
    title: "Project strukturunu planlaşdır",
    dueDate: "15 Tem",
    assignee: "https://i.pravatar.cc/40?img=3",
    status: "inprogress",
    labelColor: "bg-yellow-500",
  },
  {
    id: "4",
    title: "Test et və yaz",
    dueDate: "18 Tem",
    assignee: "https://i.pravatar.cc/40?img=4",
    status: "done",
    labelColor: "bg-green-500",
  },
];

const statusLabels = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function TaskBoard() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(
    initialData.sort((a, b) => {
      if (a.status === b.status) return 0;
      if (a.status === "todo") return -1;
      if (a.status === "inprogress" && b.status === "done") return -1;
      return 1;
    })
  );

  const renderItem = ({ item, drag, isActive, index }) => {
    const prev = index > 0 ? data[index - 1] : null;
    const showHeader = !prev || prev.status !== item.status;

    return (
      <ScrollView>
        <View>
          {showHeader && (
            <View style={styles.headerContainer}>
              <View className="flex-row items-center gap-1">
                {item.status === "todo" && (
                  <FontAwesome name="list-ul" size={15} />
                )}
                {item.status === "inprogress" && (
                  <FontAwesome name="hourglass-half" size={15} />
                )}
                {item.status === "done" && (
                  <FontAwesome name="check-circle" size={15} />
                )}
                <Text style={styles.headerText}>
                  {statusLabels[item.status]}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setSelectedItem(item);
                  setModalVisible(true);
                }}
              >
                <Entypo name="dots-three-vertical" size={15} />
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            onLongPress={drag}
            disabled={isActive}
            style={[
              styles.card,
              { backgroundColor: isActive ? "#e5e7eb" : "#ffffff" },
            ]}
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
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={{
                width: `60%`,
                height: 5,
                borderRadius: 5,
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
                marginTop: 6,
              }}
            />
            <View style={styles.row}>
              <Image source={{ uri: item.assignee }} style={styles.avatar} />
              <Text style={styles.due}>{item.dueDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  const onDragEnd = ({ data: newData, from, to }) => {
    const movedItem = newData[to];
    const prevItem = to > 0 ? newData[to - 1] : null;
    const nextItem = to < newData.length - 1 ? newData[to + 1] : null;

    let newStatus = movedItem.status;

    const order = { todo: 0, inprogress: 1, done: 2 };

    if (prevItem && nextItem) {
      const prevOrder = order[prevItem.status];
      const nextOrder = order[nextItem.status];

      if (prevOrder === 0 && nextOrder === 2) {
        newStatus = "inprogress"; // Araya girmisse
      } else if (prevOrder !== nextOrder) {
        newStatus = prevOrder < nextOrder ? prevItem.status : nextItem.status;
      } else {
        newStatus = prevItem.status;
      }
    } else if (prevItem) {
      newStatus = prevItem.status;
    } else if (nextItem) {
      newStatus = nextItem.status;
    }

    // En üste geldiyse ama kimse yoxsa
    if (to === 0 && !nextItem) newStatus = "todo";
    // En alta geldiyse ama kimse yoxsa
    if (to === newData.length - 1 && !prevItem) newStatus = "done";

    const updatedData = newData.map((item, index) =>
      index === to ? { ...item, status: newStatus } : item
    );

    // Tekrar sırala
    const sorted = updatedData.sort(
      (a, b) => order[a.status] - order[b.status]
    );

    setData(sorted);
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <DraggableFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onDragEnd={onDragEnd}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Change Status</Text>
          {["todo", "inprogress", "done"].map((status) => (
            <TouchableOpacity
              key={status}
              style={styles.modalButtonRow}
              onPress={() => {
                const updated = data.map((d) =>
                  d.id === selectedItem.id ? { ...d, status } : d
                );
                setData(updated);
                setModalVisible(false);
              }}
            >
              {/* Checkbox */}
              <View className="flex-row items-center gap-1">
                {selectedItem?.status === status ? (
                  <Feather name="check-square" size={18} color="#999" />
                ) : (
                  <Feather name="square" size={18} color="#999" />
                )}
                <Text style={styles.modalButtonText}>
                  {statusLabels[status]}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    color: "#111827",
    marginTop: 3,
  },
  card: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontWeight: "500",
    fontSize: 14,
    marginBottom: 6,
    color: "#111",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  due: {
    fontSize: 12,
    color: "#555",
  },
  cardWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    padding: 8,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    margin: 50,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#111",
  },
  modalButton: {
    paddingVertical: 10,
  },
  modalButtonText: {
    fontSize: 14,
    color: "#333",
  },
  modalButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  checkboxContainer: {
    width: 24,
    alignItems: "center",
  },
  checkbox: {
    fontSize: 18,
  },
});
