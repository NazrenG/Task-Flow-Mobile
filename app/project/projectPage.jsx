import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import CardPagination from "./cardPagination";
import InProgressProject from "./inProgressProject";
import RecentAvtivity from "./recentActivity";

const width = Dimensions.get("window").width;

const cardsData = [
  {
    title: "Featured Event",
    content: "Join our annual conference with industry leaders",
  },
  {
    title: "Special Offer",
    content: "Get 20% off all bookings made this week",
  },
  {
    title: "New Feature",
    content: "Try our new event planning toolkit",
  },
];

const ProjectPage = () => {
  const handleTest = async () => {
    console.log("in handletest");
    try {
      const response = await fetch("https://127.0.0.1:7157/api/Auth/test");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const [value, setValue] = useState(50);

  return (
    <View className="pb-6">
      <Header></Header>
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10 }}>
        <View style={styles.grid}>
          <View style={styles.gridItem} className="bg-light_navy">
            <Text>Total Projects</Text>
            <Text>10</Text>
          </View>
          <View style={styles.gridItem} className="bg-light_red">
            <Text>Complete Projects</Text>
            <Text>6</Text>
          </View>
          <View style={styles.gridItem} className="bg-light_green">
            <Text>On Going Projects</Text>
            <Text>2</Text>
          </View>
          <View style={styles.gridItem} className="bg-bg_yellow">
            <Text>Pending Projects</Text>
            <Text>2</Text>
          </View>
        </View>
        <Pressable
          style={{ width: width / 2 - 40, height: width / 6 }}
          className="bg-navyBlue my-5 rounded-xl justify-center items-center flex flex-row gap-3"
          onPress={handleTest}
        >
          <FontAwesome name="plus" size={20} color="white" />
          <Text className="text-white font-bold text-lg">Create Project</Text>
        </Pressable>
        <View className="h-[30vh]">
          <CardPagination></CardPagination>
        </View>
        {/* <View className="h-[25vh] w-full my-1"> */}
        <InProgressProject></InProgressProject>
        {/* </View> */}
        {/* <View> */}
        <RecentAvtivity></RecentAvtivity>
        {/* </View> */}
      </ScrollView>
    </View>
  );
};

export default ProjectPage;

const styles = StyleSheet.create({
  grid: {
    width: width - 40,
    height: width / 3 + 103,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  gridItem: {
    width: "48%",
    height: 100,
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 8,
  },
});
