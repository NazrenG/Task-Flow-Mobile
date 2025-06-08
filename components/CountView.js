import { Colors } from "@/constants/Colors";
import { FontAwesome5, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, Text, View } from "react-native";
export default function CountView() {
  const width = Dimensions.get("window").width;

  return (
    <View
      className={
        "flex-1 w-full flex-row items-start justify-between bg-background p-4"
      }
      style={{ width: width }}
    >
      <View
        className={
          "flex-1 flex-row  items-center justify-between bg-white px-3 py-5 rounded-lg shadow-lg gap-2"
        }
      >
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_green p-2  rounded-lg shadow-sm"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.green, Colors.secondary.lightGreen]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="project-diagram" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Projects</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_yellow p-2  rounded-lg shadow-sm"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome5 name="tasks" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold  text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Tasks</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_violet p-2  rounded-lg shadow-sm"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.violet, Colors.secondary.lightViolet]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,

                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Octicons name="project" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Kanban</Text>
        </View>
      </View>
    </View>
  );
}
