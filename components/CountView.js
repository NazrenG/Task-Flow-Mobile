import { Colors } from "@/constants/Colors";
import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
export default function CountView() {
  return (
    <View
      className={
        "flex-1 w-full flex-row items-start justify-between bg-background p-4"
      }
    >
      <View
        className={
          "flex-1 flex-row  items-center justify-between bg-white px-3 py-5 rounded-lg shadow-lg gap-2"
        } 
      >
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_green p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.green, Colors.secondary.lightGreen]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FontAwesome6 name="comment" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Messages</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_yellow p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.yellow, Colors.secondary.lightYellow]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="bell" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold  text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Notification</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-bg_violet p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={[Colors.secondary.violet, Colors.secondary.lightViolet]}
              style={{
                width: 30,
                height: 30,
                borderRadius: 9999,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="calendar" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Calendar</Text>
        </View>
      </View>
    </View>
  );
}
