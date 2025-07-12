import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import Header from "../../components/Header";
import CreateProjectModal from "../../components/projectPageComponents/createProjectModal";
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
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  const [value, setValue] = useState(50);

  return (
    <View className="pb-6">
      <Header></Header>
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10 }}>
        <View style={styles.grid}>
          <View style={styles.gridItem} className="bg-light_navy">
            <Text>{t("project.totalProjects")}</Text>
            <Text>10</Text>
          </View>
          <View style={styles.gridItem} className="bg-light_red">
            <Text>{t("project.complateProjects")}</Text>
            <Text>6</Text>
          </View>
          <View style={styles.gridItem} className="bg-light_green">
            <Text>{t("project.onGoingProjects")}</Text>
            <Text>2</Text>
          </View>
          <View style={styles.gridItem} className="bg-bg_yellow">
            <Text>{t("project.pendingProjects")}</Text>
            <Text>2</Text>
          </View>
        </View>
        <Pressable
          style={{ width: width / 2 - 40, height: width / 6 }}
          className="bg-navyBlue my-5 rounded-xl justify-center items-center flex flex-row gap-3"
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plus" size={20} color="white" />
          <Text className="text-white font-bold text-lg">
            {t("project.createProject")}
          </Text>
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
      <CreateProjectModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
