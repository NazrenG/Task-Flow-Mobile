// import { useNavigation } from "@react-navigation/native";
// import { useState } from "react";
// import { ScrollView } from "react-native";
// import Header from "../../components/Header";
// import KanbanColumn from "./KanbanColumn";
// import { SafeAreaView } from "react-native-safe-area-context";

// export default function ProfileScreen() {
//   const [searchText, setSearchText] = useState("");
//   const [backgroundImage, setBackgroundImage] = useState(
//     require("../../assets/images/page.jpg")
//   );
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
//       <Header onSearch={setSearchText} />

//       <ScrollView
//         horizontal
//         contentContainerStyle={{ padding: 16 }}
//         showsHorizontalScrollIndicator={false}
//       >
//         <KanbanColumn title="To Do" tasks={tasks.todo} />
//         <KanbanColumn title="In Progress" tasks={tasks.inProgress} />
//         <KanbanColumn title="Done" tasks={tasks.done} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const tasks = {
//   todo: [
//     { id: "1", title: "Login screen", deadline: "Today" },
//     { id: "2", title: "UI Fixes", deadline: "Tomorrow" },
//   ],
//   inProgress: [{ id: "3", title: "Dashboard", deadline: "Next week" }],
//   done: [{ id: "4", title: "API Setup", deadline: "Done" }],
// };

// // export default function KanbanScreen() {
// //   return (
// //     // <ScrollView
// //     //   horizontal
// //     //   contentContainerStyle={{ padding: 16 }}
// //     //   showsHorizontalScrollIndicator={false}
// //     // >
// //     //   <KanbanColumn title="To Do" tasks={tasks.todo} />
// //     //   <KanbanColumn title="In Progress" tasks={tasks.inProgress} />
// //     //   <KanbanColumn title="Done" tasks={tasks.done} />
// //     // </ScrollView>
// //   );
// // }
//DragDrop
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const initialData = [
  { id: "1", title: "Login UI düzəlt" },
  { id: "2", title: "Firebase Auth əlavə et" },
  { id: "3", title: "Project strukturunu planlaşdır" },
  { id: "4", title: "Test et və yaz" },
];

export default function App() {
  const [data, setData] = useState(initialData);

  const renderItem = ({ item, drag, isActive }) => (
    <Text
      style={[
        styles.taskCard,
        { backgroundColor: isActive ? "#F6B26B" : "#fff" },
      ]}
      onLongPress={drag}
    >
      {item.title}
    </Text>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text style={styles.heading}>📋 To Do</Text>
      <DraggableFlatList
        data={data}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#f2f2f2",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  taskCard: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginBottom: 10,
    fontSize: 16,
  },
});

// //Kanban for button

// import React, { useState } from 'react';
// import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

// const initialTasks = [
//   { id: '1', title: 'Login səhifəsini hazırla', status: 'To Do' },
//   { id: '2', title: 'API bağlantısı qur', status: 'In Progress' },
//   { id: '3', title: 'Test et və düzəliş ver', status: 'Done' },
// ];

// const statuses = ['To Do', 'In Progress', 'Done'];

// export default function App() {
//   const [tasks, setTasks] = useState(initialTasks);

//   const moveTask = (taskId, newStatus) => {
//     setTasks(prev =>
//       prev.map(task =>
//         task.id === taskId ? { ...task, status: newStatus } : task
//       )
//     );
//   };

//   const renderColumn = status => (
//     <View style={styles.column}>
//       <Text style={styles.columnTitle}>{status}</Text>
//       <FlatList
//         data={tasks.filter(task => task.status === status)}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.card}>
//             <Text>{item.title}</Text>
//             <View style={styles.actions}>
//               {statuses
//                 .filter(s => s !== item.status)
//                 .map(s => (
//                   <TouchableOpacity
//                     key={s}
//                     onPress={() => moveTask(item.id, s)}
//                     style={styles.button}
//                   >
//                     <Text style={styles.buttonText}>{s}</Text>
//                   </TouchableOpacity>
//                 ))}
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {statuses.map(status => (
//         <View key={status} style={styles.columnWrapper}>
//           {renderColumn(status)}
//         </View>
//       ))}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     paddingTop: 50,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   columnWrapper: {
//     flex: 1,
//     paddingHorizontal: 5,
//   },
//   column: {
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//     padding: 10,
//     height: '100%',
//   },
//   columnTitle: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 6,
//     padding: 10,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   actions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 5,
//   },
//   button: {
//     backgroundColor: '#B6A0E6',
//     padding: 5,
//     margin: 2,
//     borderRadius: 5,
//   },
//   buttonText: {
//     fontSize: 10,
//     color: '#fff',
//   },
// });
