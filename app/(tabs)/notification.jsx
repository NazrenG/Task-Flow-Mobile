import { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import OtherCard from "../../components/notifications/otherCard";
import ReminderCard from "../../components/notifications/reminderCard";
import RequestCard from "../../components/notifications/requestCard";

export default function NotificationScreen() {
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("requests");

  const requests = [
    {
      id: 1,
      user: {
        name: "Zehra Memmedzade",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      message:
        "Hi, I am OOO OOO. I want to invite you to my project named: TERS",
    },
    {
      id: 2,
      user: {
        name: "Nezrin Quliyeva",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      },
      message:
        "Hi, I am OOO OOO. I want to invite you to my project named: TERS",
    },
  ];

  const reminders = [
    { id: 1, date: "08-07-2025", message: "Project deadline approaching!" },
    { id: 2, date: "10-07-2025", message: "Submit weekly report." },
  ];

  const others = [
    { id: 1, text: "System maintenance scheduled." },
    { id: 2, text: "Your password will expire soon." },
  ];

  const tabColors = {
    requests: {
      bg: "bg-light_green",
      activeBg: "bg-green",
      text: "text-white",
    },
    reminders: {
      bg: "bg-bg_yellow",
      activeBg: "bg-yellow",
      text: "text-white",
    },
    others: {
      bg: "bg-bg_violet",
      activeBg: "bg-light_violet",
      text: "text-white",
    },
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header onSearch={setSearchText} />

      <View className="flex-row gap-1 mt-4   px-4">
        {["requests", "reminders", "others"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`py-2 px-4 rounded-full ${
              activeTab === tab ? tabColors[tab].activeBg : tabColors[tab].bg
            }`}
          >
            <Text className={`${tabColors[tab].text} font-semibold`}>
              {tab === "requests"
                ? t("")
                : tab === "reminders"
                ? "Reminders"
                : "Others"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {activeTab === "requests" && (
          <View className="bg-white rounded-xl shadow p-4">
            {requests.map((req) => (
              <RequestCard
                key={req.id}
                user={req.user}
                message={req.message}
                onAccept={() => console.log("Accepted", req.id)}
                onReject={() => console.log("Rejected", req.id)}
              />
            ))}
          </View>
        )}

        {activeTab === "reminders" && (
          <View className="bg-white rounded-xl shadow p-4 space-y-3 gap-1">
            {reminders.map((reminder) => (
              <ReminderCard
                key={reminder.id}
                date={reminder.date}
                message={reminder.message}
                onDelete={() => console.log("Deleted", reminder.id)}
              />
            ))}
          </View>
        )}

        {activeTab === "others" && (
          <View className="bg-white rounded-xl shadow p-4 space-y-3 gap-1">
            {others.map((item) => (
              <OtherCard
                key={item.id}
                text={item.text}
                onAction={() => console.log("Action taken for", item.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
