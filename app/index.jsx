import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
// import i18n from "../i18n/i18n";
export default function HomeScreen() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const selectItem = {
    title: "Welcome TaskFlow",
    describe: "Organize your tasks, boost your productivity.",
    icon: (
      <LottieView
        source={require("../assets/animations/start_animation.json")}
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

        <Title>{selectItem.title}</Title>

        <Text className="text-xl text-center text-gray-400 mt-12">
          {selectItem.describe}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          router.push("/auth/login");
        }}
        className="  bg-dark_violet justify-center items-center rounded-full   p-4"
        style={{ width: width - 40, marginBottom: 40 }}
      >
        <Button text="Get Started" />
      </TouchableOpacity>
    </View>
  );
}
