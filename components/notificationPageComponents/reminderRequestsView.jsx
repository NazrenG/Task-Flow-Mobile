import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const ReminderRequestsView = () => {
  const [requestList, setRequestList] = useState([]);
  //   useEffect(() => {
  //     const getData = async () => {
  //       const response = await fetch("");
  //       if (response.ok) {
  //         let data = await response.json();
  //       }
  //     };
  //   }, []);

  return (
    <ScrollView>
      <View className="flex-row items-center">
        <View className="size-[11vw]">
          <Image
            source={require("../../assets/images/default-user.png")}
            className="w-full h-full"
          />
        </View>
        <Text className="ml-2 w-[70%]">Task TaskName has 2 days left</Text>
        <View className="flex-row gap-1">
          <FontAwesome name="calendar" size={24} color="black" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ReminderRequestsView;
