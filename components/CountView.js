import { Colors } from "@/constants/Colors";
import { FontAwesome5, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "../components/ThemeContext";


const CountCard = ({ icon, iconLib, count, label, bgColor, gradient }) => {
  const router = useRouter();
  const IconComponent = iconLib === "Octicons" ? Octicons : FontAwesome5;
  const { t } = useTranslation();  
  const { theme } = useTheme();
  const handlePress = () => {
    switch (label) {
      case t("dashboard.kanban"):
        router.push("/kanban/KanbanScreen");
        break;
      case t("dashboard.projects"):
        router.push("/project/projectPage");
        break;
      case t("dashboard.tasks"):
        router.push("/tasks/TaskScreen");
        break;
      default:
        router.push("/(tabs)");
        break;
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`flex-1 gap-2 justify-between ${bgColor} p-2 rounded-lg shadow-sm`}
    >
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
        <Text className="color-white font-extrabold text-xl" style={{ color: Colors[theme].card }}>{count}</Text>
      </View>
      <Text className="text-black font-bold">{label}</Text>
    </TouchableOpacity>
  );
};

export default function CountView() {
  const { t } = useTranslation();  
  const { theme } = useTheme();

  return (
    <View className="flex-1 flex-row items-center justify-between  p-3 mt-4 rounded-lg shadow-lg gap-2" style={{ backgroundColor: Colors[theme].card }}>
      <CountCard
        icon="project-diagram"
        iconLib="FontAwesome5"
        count={9}
        label={t("dashboard.projects")}
        bgColor="bg-bg_green"
        gradient={[Colors.secondary.green, Colors.secondary.lightGreen]}
      />
      <CountCard
        icon="tasks"
        iconLib="FontAwesome5"
        count={8}
        label={t("dashboard.tasks")}
        bgColor="bg-bg_yellow"
        gradient={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
      />
      <CountCard
        icon="project"
        iconLib="Octicons"
        count={9}
        label={t("dashboard.kanban")}
        bgColor="bg-bg_violet"
        gradient={[Colors.secondary.violet, Colors.secondary.lightViolet]}
      />
    </View>
  );
}
