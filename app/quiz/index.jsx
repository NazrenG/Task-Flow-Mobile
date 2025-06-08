import { FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Quiz() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const [index, setIndex] = useState(1);
  const files = [
    {
      id: "1",
      title: "Watch on any device",
      describe:
        "Stream on your phone, tablet, laptop and TV without playing more",
      answers: [
        { id: "1", text: "Yes, I can watch on any device" },
        { id: "2", text: "No, I can only watch on my phone" },
        { id: "3", text: "I don't know" },
      ],
      icon: (
        <LottieView
          source={require("../../assets/animations/quiz_first.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      ),
    },
    {
      id: "2",
      title: "3, 2, 1,... download!",
      describe: "Always have something to Watch offline.",
      answers: [
        { id: "1", text: "Yes, I can watch on any device" },
        { id: "2", text: "No, I can only watch on my phone" },
        { id: "3", text: "I don't know" },
      ],
      icon: (
        <LottieView
          source={require("../../assets/animations/quiz_second.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      ),
    },
    {
      id: "3",
      title: "No pesky contracts.",
      describe: "cancel anytime",
      answers: [
        { id: "1", text: "Yes, I can watch on any device" },
        { id: "2", text: "No, I can only watch on my phone" },
        { id: "3", text: "I don't know" },
      ],
      icon: (
        <LottieView
          source={require("../../assets/animations/quiz_third.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      ),
    },
    {
      id: "4",
      title: "How do I watch?",
      describe: "Members that subscribe to Netflix can watch here in the app",
      answers: [
        { id: "1", text: "Yes, I can watch on any device" },
        { id: "2", text: "No, I can only watch on my phone" },
        { id: "3", text: "I don't know" },
      ],
      icon: null,
    },
  ];

  const selectItem = files.find((item) => item.id == index);

  function increaseIndex() {
    setIndex((prev) => {
      if (prev === 4) {
        router.push("/login");
        return prev;
      }
      return prev + 1;
    });
  }

  return (
    <ImageBackground
      source={
        index === 4
          ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/PNG_transparency_demonstration_1.png/640px-PNG_transparency_demonstration_1.png"
          : null
      }
      className="flex-1 items-center justify-between  bg-background p-5 w-[]"
      style={{ width, height, paddingTop: 80 }}
      resizeMode="cover"
    >
      <View>
        <FontAwesome5 name="question-circle" size={24} color="black" />
      </View>
      <View
        style={{ width: width }}
        className="p-4  rounded-lg w-52 items-center"
      >
        {selectItem.icon}

        <Text className="text-3xl font-bold text-white mt-2">
          {selectItem.title}
        </Text>
        <Text className="text-xl text-center text-gray-400">
          {selectItem.describe}
        </Text>
        {selectItem.answers.map((answer) => (
          <TouchableOpacity
            key={answer.id}
            className="w-full h-12 bg-gray-800 justify-center items-center rounded-md mt-5"
            onPress={() => {
              if (index === 4) {
                router.push("/login");
              } else {
                increaseIndex();
              }
            }}
          >
            <Text className="text-white text-lg font-bold">
              {answer.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className=" items-center">
        <View className="flex-row justify-bottom my-5">
          {[1, 2, 3, 4].map((i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full mx-2 ${
                index === i ? "bg-red-700" : "bg-gray-300"
              }`}
            />
          ))}
        </View>

        
      </View>
    </ImageBackground>
  );
}
