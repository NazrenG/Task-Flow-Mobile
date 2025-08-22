import DonutChart from "@/components/charts/DonutChart";
import CountView from "@/components/CountView";
import DailyTasks from "@/components/dashboard/DailyTask";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
 
 
import { useTheme } from "../../components/ThemeContext";
 
import { getToken } from "../../secureStore";
export default function Dashboard() {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState("");
  const goToProjectPage = () => {
    navigation.navigate("project/projectPage");
  };
  const { t } = useTranslation();  
    const { theme } = useTheme();

 
  const cardData = [
    {
      label: t("dashboard.totalClients"),
      value: "3",
      icon: "people-group",
    },
    {
      label: t("dashboard.message"),
      value: "1",
      icon: "message",
    },
  ];

  useEffect(() => {
    const getTokenFetch = async () => {
      const stored = await getToken("authToken");
      console.log("stored: " + stored);
    };
    getTokenFetch();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background" style={{ backgroundColor: Colors[theme].background }}>
      <Header onSearch={setSearchText} />
 
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-4"
      >
        {/* Count View */}
        <CountView />
 
        {/* Create Project */}
        <ImageBackground
          source={require("../../assets/images/bg-manage.png")}
          resizeMode="cover"
          className="rounded-lg overflow-hidden my-2 p-4 bg-navyBlue"
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-1 pr-3">
              <Text className="text-2xl font-semibold text-white" >
                {t("dashboard.managarProjects")}
              </Text>
              <Text className="text-sm text-bg_violet mt-2">
                {t("dashboard.organizeTasks")}
              </Text>
            </View>
            <View className="bg-white rounded-lg shadow-lg px-3 py-2 ml-2" >
              <Text className="text-navyBlue font-medium text-sm">
                {t("dashboard.tryNow")}
              </Text>
            </View>
          </View>
        </ImageBackground>
 
        {/* Info Cards */}
         <View className="flex-row flex-wrap justify-between gap-3 mt-3">
          {cardData.map((card, index) => (
            <View
              key={index}
              className=" flex-[0.48] p-3 rounded-xl shadow-md"
              style={{ backgroundColor: Colors[theme].card }}
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-black font-extrabold text-xl" style={{ color: Colors[theme].text }}>
                  {card.value}
                </Text>
                <FontAwesome6
                  name={card.icon}
                  size={15}
                  color={Colors.primary.darkViolet}
                  style={{ color: Colors[theme].tabButtonIcon }}
                />
              </View>
              <Text className="text-black font-bold" style={{ color: Colors[theme].text }}>{card.label}</Text>
            </View>
          ))}

          <View className="bg-navyBlue flex-[0.48] items-center justify-center p-3 rounded-xl shadow-md">
            <Text className="text-white font-extrabold text-xl mb-1">
              {t("dashboard.createtask")}
            </Text>
            <FontAwesome6 name="plus" size={15} color="white" />
          </View>
        </View>
 
        {/* Participant Occupation */}
        <View className=" mt-4 rounded-lg shadow-md p-3" style={{ backgroundColor: Colors[theme].card }}>
          <Text className="text-lg font-semibold text-black" style={{ color: Colors[theme].text }}>
             {t("dashboard.participantprofile")}
          </Text>
          <Text className="text-sm text-gray-400 mt-2">
            {t("dashboard.statisticsAccording")}
          </Text>
          <DonutChart />
        </View>
 
        {/* Daily Tasks */}
        <DailyTasks />
 
        {/* Current Project */}
        <View className=" mt-4 rounded-lg shadow-md p-3" style={{ backgroundColor: Colors[theme].card }}>
          <Text className="text-xl font-semibold text-black" style={{ color: Colors[theme].text }}>
            {t("dashboard.currentTasks")}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
 