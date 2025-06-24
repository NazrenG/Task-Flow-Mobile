import { Colors } from "@/constants/Colors";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from '@react-navigation/native';
import { Text, View, TouchableOpacity } from "react-native";

const CountCard = ({ icon, iconLib, count, label, bgColor, gradient }) => {
  const navigation = useNavigation();
  const IconComponent = iconLib === "Octicons" ? Octicons : FontAwesome5;

  const handlePress = () => {
    switch (label) {
      case "Kanban":
        navigation.navigate("kanban/KanbanScreen");
        break;
      case "Projects":
        navigation.navigate("kanban/KanbanScreen");
        break;
      case "Tasks":
        navigation.navigate("kanban/KanbanScreen");
        break;
      default:
        navigation.navigate("(tabs)");
        break;
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} className={`flex-1 gap-2 justify-between ${bgColor} p-2 rounded-lg shadow-sm`}>
      <View className="flex-row items-center gap-2">
        <LinearGradient
          colors={gradient}
          style={{
            width: 30,
            height: 30,
            borderRadius: 9999,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconComponent name={icon} size={15} color="white" />
        </LinearGradient>
        <Text className="color-white font-extrabold text-xl">{count}</Text>
      </View>
      <Text className="text-black font-bold">{label}</Text>
    </TouchableOpacity>
  );
};

export default function CountView() {
  return (
    <View className="flex-1 flex-row items-center justify-between bg-white p-3 mt-4 rounded-lg shadow-lg gap-2">
      <CountCard
        icon="project-diagram"
        iconLib="FontAwesome5"
        count={9}
        label="Projects"
        bgColor="bg-bg_green"
        gradient={[Colors.secondary.green, Colors.secondary.lightGreen]}
      />
      <CountCard
        icon="tasks"
        iconLib="FontAwesome5"
        count={8}
        label="Tasks"
        bgColor="bg-bg_yellow"
        gradient={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
      />
      <CountCard
        icon="project"
        iconLib="Octicons"
        count={9}
        label="Kanban"
        bgColor="bg-bg_violet"
        gradient={[Colors.secondary.violet, Colors.secondary.lightViolet]}
      />
    </View>
  );
}
