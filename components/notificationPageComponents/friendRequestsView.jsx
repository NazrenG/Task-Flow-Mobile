import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../../constants/Colors";

const FriendRequestsView = () => {
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
        <Text className="ml-2 w-[65%]">
          User UserName sent you a friend request
        </Text>
        <View className="flex-row gap-1">
          <TouchableOpacity className="p-1 bg-navyBlue rounded-full">
            <Entypo name="check" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="p-1 bg-white border border-navyBlue rounded-full">
            <Entypo name="cross" size={24} color={Colors.primary.navyBlue} />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default FriendRequestsView;
