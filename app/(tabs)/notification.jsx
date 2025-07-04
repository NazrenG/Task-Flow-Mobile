import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import RoundedButton from "../../components/Button/RoundedButton";
import Header from "../../components/Header";
import FriendRequestsView from "../../components/notificationPageComponents/friendRequestsView";
import ReminderRequestsView from "../../components/notificationPageComponents/reminderRequestsView";

const width = Dimensions.get("window").width;

export default function Notification() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedButton, setSelectedButton] = useState("friend");
  // const [isReminder, setReminder] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Header onSearch={setSearchText} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          // justifyContent: "start",
        }}
      >
        <View className="bg-white h-[87%] w-[94%] rounded-lg mt-2 p-3 px-5">
          {/* <Text>Notifications</Text> */}
          <View className="flex-row gap-4 my-1">
            <RoundedButton
              data="Friend Requests"
              styleData={
                selectedButton === "friend"
                  ? "px-4 rounded-[6vw] bg-green"
                  : "px-4 rounded-[6vw] bg-light_green"
              }
              textStyle={
                selectedButton === "friend"
                  ? "text-lg font-semibold text-white"
                  : "text-lg"
              }
              customPress={() => setSelectedButton("friend")}
            />
            <RoundedButton
              data="Reminders"
              styleData={
                selectedButton === "reminder"
                  ? "px-4 rounded-[6vw] bg-[#fa8299]"
                  : "px-4 rounded-[6vw] bg-light_red"
              }
              textStyle={
                selectedButton === "reminder"
                  ? "text-lg font-semibold text-white"
                  : "text-lg"
              }
              customPress={() => setSelectedButton("reminder")}
            />
            <RoundedButton
              data="Other"
              styleData={
                selectedButton === "other"
                  ? "px-4 rounded-[6vw] bg-[rgb(255,188,3)]"
                  : "px-4 rounded-[6vw] bg-customYellow"
              }
              textStyle={
                selectedButton === "other"
                  ? "text-lg font-semibold text-white"
                  : "text-lg"
              }
              customPress={() => setSelectedButton("other")}
            />
          </View>
          <View className="h-px  bg-gray-300 w-full my-2 mb-6" />
          <View>
            {selectedButton === "friend" && (
              <FriendRequestsView></FriendRequestsView>
            )}
            {selectedButton === "reminder" && (
              <ReminderRequestsView></ReminderRequestsView>
            )}
            {/* {selectedButton === "friend" && (
              <FriendRequestsView></FriendRequestsView>
            )} */}
          </View>
          {/* <Text style={{ fontSize: 24 }}>{t("language")}</Text> 
                <Text style={{ color: "black" }}>Notification Screen</Text> */}
        </View>
      </View>
    </View>
  );
}
