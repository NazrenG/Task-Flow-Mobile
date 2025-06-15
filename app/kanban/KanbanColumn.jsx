import { FlatList, Text, View } from "react-native";

export default function KanbanColumn({ title, tasks }) {
  return (
    <View
      style={{
        width: 250,
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        marginRight: 16,
        padding: 12,
      }}
    >
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
        {title}
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 8,
              padding: 10,
              marginBottom: 10,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 14, fontWeight: "500" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12, color: "#888" }}>{item.deadline}</Text>
          </View>
        )}
      />
    </View>
  );
}
