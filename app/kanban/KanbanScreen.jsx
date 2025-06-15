import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView } from "react-native";
import Header from "../../components/Header";
import KanbanColumn from "./KanbanColumn";

const selectItem = {
  avatar: require("../../assets/images/default-user.png"),
  username: "sevgi",
  email: "sevgi.elesgerova@gmail.com",
  fullName: "Sevgi Alasgarova",
  phone: "0559717465",
  department: "Other (please specify)",
  country: "Azerbaijan",
  gender: "",
  birthday: "",
};

export default function ProfileScreen() {
  const [searchText, setSearchText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(
    require("../../assets/images/page.jpg")
  );
  const navigation = useNavigation();

  return (
    <>
      <Header onSearch={setSearchText} />

      <ScrollView
        horizontal
        contentContainerStyle={{ padding: 16 }}
        showsHorizontalScrollIndicator={false}
      >
        <KanbanColumn title="To Do" tasks={tasks.todo} />
        <KanbanColumn title="In Progress" tasks={tasks.inProgress} />
        <KanbanColumn title="Done" tasks={tasks.done} />
      </ScrollView>
    </>
  );
}

const tasks = {
  todo: [
    { id: "1", title: "Login screen", deadline: "Today" },
    { id: "2", title: "UI Fixes", deadline: "Tomorrow" },
  ],
  inProgress: [{ id: "3", title: "Dashboard", deadline: "Next week" }],
  done: [{ id: "4", title: "API Setup", deadline: "Done" }],
};

// export default function KanbanScreen() {
//   return (
//     // <ScrollView
//     //   horizontal
//     //   contentContainerStyle={{ padding: 16 }}
//     //   showsHorizontalScrollIndicator={false}
//     // >
//     //   <KanbanColumn title="To Do" tasks={tasks.todo} />
//     //   <KanbanColumn title="In Progress" tasks={tasks.inProgress} />
//     //   <KanbanColumn title="Done" tasks={tasks.done} />
//     // </ScrollView>
//   );
// }
