import Card from "@/components/Card/Card";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import CreateProjectModal from "../../components/projectPageComponents/createProjectModal";
import { Colors } from "../../constants/Colors";
import {
  fetchComplatedProjectCount,
  fetchOnGoingProjectCount,
  fetchPendingProjectCount,
} from "../../utils/fetchUtils";
import CardPagination from "./cardPagination";
import InProgressProject from "./inProgressProject";
import RecentAvtivity from "./recentActivity";

const width = Dimensions.get("window").width;
const ProjectPage = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalProjectCount, setTotalProjects] = useState("");
  const [complatedProjectCount, setComplatedProjects] = useState("");
  const [onGoingProjectCount, setOnGoingProjects] = useState("");
  const [pendingProjectCount, setPendingProjects] = useState("");
  console.log("is modal on: " + modalVisible);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const complatedProj = await fetchComplatedProjectCount();
        const pendingProj = await fetchPendingProjectCount();
        const onGoingProj = await fetchOnGoingProjectCount();

        console.log("complatedProj" + complatedProj);
        console.log("pendingProj" + pendingProj);
        console.log("onGoingProj" + onGoingProj);
        setComplatedProjects(complatedProj);
        setPendingProjects(pendingProj);
        setOnGoingProjects(onGoingProj);
      } catch (error) {
        console.log("error in getDatas: " + error);
      }
    };
    getDatas();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header></Header>
      <ScrollView contentContainerStyle={{ alignItems: "center", padding: 10 }}>
        <View className="flex-row flex-wrap justify-between items-center  p-4 mb-3 gap-2 rounded-lg bg-white shadow-sm">
          <Card
            title={t("project.totalProjects")}
            count="0"
            color={Colors.secondary.bg_blue}
            icon={<MaterialIcons name="view-list" size={20} color="#0E7490" />}
            gradient={["#A5F3FC", "#22D3EE"]}
          />
          <Card
            title={t("project.complateProjects")}
            count={complatedProjectCount}
            color={Colors.secondary.light_red}
            icon={
              <MaterialIcons
                name="check-circle-outline"
                size={20}
                color="#b81836"
              />
            }
            gradient={["#f397a8", "#ef7f5a"]}
          />

          <Card
            title={t("project.onGoingProjects")}
            count={onGoingProjectCount}
            color={Colors.secondary.bg_green}
            icon={
              <MaterialIcons name="query-builder" size={20} color="#059669" />
            }
            gradient={[Colors.secondary.lightGreen, Colors.secondary.green]}
          />
          <Card
            title={t("project.pendingProjects")}
            count={pendingProjectCount}
            color={Colors.secondary.bg_yellow}
            icon={
              <MaterialIcons name="pending-actions" size={20} color="#D97706" />
            }
            gradient={[Colors.secondary.lightYellow, Colors.secondary.yellow]}
          />
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
      {modalVisible ? (
        <CreateProjectModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
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
