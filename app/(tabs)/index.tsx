import { FontAwesome6, MaterialCommunityIcons } from "@expo/vector-icons";

import { LinearGradient } from "expo-linear-gradient";

import { Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <>
      {/* <Onboarding />
    */}
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
            "flex-1   gap-2 justify-between bg-[#caf8e7] p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={["#059669", "#34D399"]}
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
              <FontAwesome6 name="bell" size={15} color="white" />
            </LinearGradient>
            <Text className="color-white font-extrabold text-xl">9</Text>
          </View>

          <Text className="text-black font-bold">Messages</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-[#f8ebc5] p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={["#FFBC03", "#fbd56f"]}
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
            <Text className="color-white font-extrabold  text-xl">8</Text>
          </View>

          <Text className="text-black font-bold">Notification</Text>
        </View>
        <View
          className={
            "flex-1   gap-2 justify-between bg-[#c2b8ff] p-2  rounded-lg shadow-lg"
          }
        >
          <View className="flex-row items-center gap-2">
            <LinearGradient
              colors={["#3C21F7", "#7661fd"]}
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
      
      </>
  );
}
