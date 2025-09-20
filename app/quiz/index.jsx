import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import { 
  fetchUpdateOccupationQuiz,
  fetchUpdateProfessionQuizzes,
} from "../../utils/quizUtils";

export default function Quiz() {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const router = useRouter();
  const [index, setIndex] = useState(1);

  const fetchData = async (selectedAnswer) => {
    try {
      await fetchUpdateOccupationQuiz(selectedAnswer); 
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const fetchProfessionData = async (selectedAnswer) => {
    try {
      await fetchUpdateProfessionQuizzes(selectedAnswer); 
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };

  const files = [
    {
      id: "1",
      title: "What field do you want to work in?",
      answers: [
        { id: "1", text: "IT(Programming,System)" },
        { id: "2", text: "Design(UI/UX Graphics)" },
        { id: "3", text: "Human Resources" },
        { id: "4", text: "Software Developer" },
        { id: "5", text: "Backend Developer" },
        { id: "6", text: "Frontend Developer" },
        { id: "7", text: "Other" },
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
      title: "Which field are you currently working in?",
      answers: [
        { id: "1", text: "Programming" },
        { id: "2", text: "Marketing" },
        { id: "3", text: "Accounting" },
        { id: "4", text: "Education" },
        { id: "5", text: "Other" },
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
  ];

  const selectItem = files.find((item) => item.id == index);

  function increaseIndex() {
    setIndex((prev) => {
      if (prev === 2) {
        router.replace("/(tabs)/dashboard");
        return prev;
      }
      return prev + 1;
    });
  }

  return (
    <View
      className="flex-1 items-center justify-between  bg-background p-5  "
      style={{ width, height, paddingTop: 80 }}
    >
      <View
        style={{ width: width }}
        className="p-4  rounded-lg w-52 items-center mt-10"
      >
        {selectItem.icon}

        <Text className="text-2xl text-center font-bold text-black mt-2">
          {selectItem.title}
        </Text>
        {selectItem.answers.map((answer) => (
          <TouchableOpacity
            key={answer.id}
            className="w-full h-12 bg-[#403955] justify-center items-center rounded-lg mt-5"
            onPress={() => {
              if (index === 2) {
                fetchProfessionData(answer.text);
                router.replace("/auth/login");
              } else {
                fetchData(answer.text);
                increaseIndex();
              }
            }}
          >
            <Text className="text-white text-lg font-bold">{answer.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View className=" items-center">
        <View className="flex-row justify-bottom my-5">
          {[1, 2].map((i) => (
            <View
              key={i}
              className={`h-2 w-2 rounded-full mx-2 ${
                index === i ? "bg-dark_violet" : "bg-gray-300"
              }`}
            />
          ))}
        </View>
      </View>
    </View>
  );
}
