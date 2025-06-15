import DonutChart from "@/components/charts/DonutChart";
import CountView from "@/components/CountView";
import DailyTasks from "@/components/dashboard/DailyTask";
import Header from "@/components/Header";
import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  Text,
  View,
} from "react-native";

import { Colors } from "@/constants/Colors";

export default function Dashboard() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const screenWidth = Dimensions.get("window").width;
  const cardData = [
    {
      label: "Total Clients",
      value: "3",
      icon: "people-group",
      bg: "bg-white",
      w: "w-[30%]",
    },
    {
      label: "Messages",
      value: "1",
      icon: "message",
      bg: "bg-white",
      w: "w-[30%]",
    },
  ];

  return (
    <View className="flex-1 bg-background p-1 items-center justify-center">
      <Header onSearch={setSearchText} />

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* project ,task, kanban Count */}
        <View
          className="flex-1 w-full flex-row items-start justify-between  p-4"
          style={{ width: screenWidth }}
        >
          <CountView />
        </View>

        {/* Create project */}
        <ImageBackground
          source={require("@/assets/images/bg-manage.png")}
          resizeMode="cover"
          className="flex-1 bg-cover bg-navyBlue items-center justify-between rounded-lg mx-4 my-1 p-4 "
        >
          <View className="flex-row justify-between items-center flex-1">
            <View className="flex-1">
              <Text className="text-2xl font-semibold text-white">
                Manage your project in one touch
              </Text>
              <Text className="text-lg text-bg_violet mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Text>
            </View>

            <View className="bg-white rounded-lg shadow-lg p-2 my-4 justify-center items-center self-center">
              <Text className="text-navyBlue font-medium">
                Try For Free Now
              </Text>
            </View>
          </View>
        </ImageBackground>

        {/* Info Cards */}
        <View
          className=" flex-row mx-6 items-center justify-center"
          style={{ width: screenWidth - 50 }}
        >
          {cardData.map((card, index) => (
            <View
              key={index}
              className={`${card.bg} ${card.w} p-3 m-2 rounded-xl shadow-md `}
            >
              <View className="flex-row justify-between items-center gap-6">
                <Text className="text-black font-extrabold text-xl">
                  {card.value}
                </Text>
                <FontAwesome6
                  name={card.icon}
                  size={15}
                  color={Colors.primary.darkViolet}
                />
              </View>
              <Text className="text-black font-bold mt-1">{card.label}</Text>
            </View>
          ))}

          <View
            className={`flex bg-navyBlue w-[38%] items-center justify-center p-3 m-2 rounded-xl shadow-md `}
          >
            <Text className="text-white font-extrabold text-xl">
              Create task
            </Text>
            <FontAwesome6 name="plus" size={15} width={15} color="white" />
          </View>
        </View>

        {/* Participant Occupation */}
        <View className="flex-1 bg-cover bg-white  mx-[14px] my-1  justify-between rounded-lg shadow-black shadow-md ">
          <View className="justify-between   flex-1 ">
            <Text className="text-lg font-semibold text-black px-2 pt-3">
              Participant Occupation Profile
            </Text>
            <Text className="text-sm text-gray-400 mt-2 px-2">
              Statistics according to occupational profile of all participants
            </Text>

            <DonutChart />
          </View>
        </View>

        {/* Daily Task */}
        <DailyTasks />

        {/* Current Project */}
        <View className="flex-1 bg-cover bg-white  mx-[14px] my-1  justify-between rounded-lg shadow-black shadow-md ">
           <Text className="text-xl font-semibold text-black px-2 pt-3">
             Current Projects
            </Text>
           
        </View>
      </ScrollView>
    </View>
  );
}
