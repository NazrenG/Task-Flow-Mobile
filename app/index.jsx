import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
export default function HomeScreen() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const selectItem = {
    title: "Welcome TaskFlow",
    describe: "Organize your tasks, boost your productivity.",
    icon: (
      <LottieView
        source={require("../assets/animations/start_2_animation.json")}
        autoPlay
        loop
        style={{ width: 300, height: 300 }}
      />
    ),
  };

  return (
    <View
      className="flex-1 items-center justify-between   bg-background p-5 "
      style={{ width, height, paddingTop: 80 }}
    >
      <View
        style={{ width: width }}
        className="p-4  rounded-lg w-52 items-center  "
      >
        {selectItem.icon}

        <Text className="text-4xl font-bold text-blac text-center mt-2">
          {selectItem.title}
        </Text>
        <Text className="text-xl text-center text-gray-400 mt-12">
          {selectItem.describe}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/quiz");
        }}
        className="  bg-dark_violet justify-center items-center rounded-full   p-4"
        style={{ width: width - 40, marginBottom: 40 }}
      >
        <Text className="text-white text-lg font-bold">Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
