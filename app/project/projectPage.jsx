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
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import {
  fetchComplatedProjectCount,
  fetchOnGoingProjectCount,
  fetchPendingProjectCount,
  fetchTotalProjectsCount,
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
  const { theme } = useTheme();
  const colors = Colors[theme];

  useEffect(() => {
    const getDatas = async () => {
      try {
        const complatedProj = await fetchComplatedProjectCount();
        const pendingProj = await fetchPendingProjectCount();
        const onGoingProj = await fetchOnGoingProjectCount();
        const totalProj = await fetchTotalProjectsCount();

        console.log("complatedProj" + complatedProj);
        console.log("pendingProj" + pendingProj);
        console.log("onGoingProj" + onGoingProj);
        console.log("totalProj" + totalProj);
        setComplatedProjects(complatedProj);
        setPendingProjects(pendingProj);
        setOnGoingProjects(onGoingProj);
        setTotalProjects(totalProj);
      } catch (error) {
        console.log("error in getDatas: " + error);
      }
    };
    getDatas();
  }, []);

  return (
    <>
    
      <Header></Header>
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView
          contentContainerStyle={{ alignItems: "center", padding: 10 }}
          style={{ backgroundColor: colors.background }}
        >
          <View
            className="flex-row flex-wrap justify-between items-center  p-4 mb-3 gap-2 rounded-lg bg-white shadow-sm"
            style={{ backgroundColor: colors.card }}
          >
            <Card
              title={t("project.totalProjects")}
              count={totalProjectCount}
              color={Colors.secondary.bg_blue}
              icon={
                <MaterialIcons name="view-list" size={20} color="#0E7490" />
              }
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
                <MaterialIcons
                  name="pending-actions"
                  size={20}
                  color="#D97706"
                />
              }
              gradient={[Colors.secondary.lightYellow, Colors.secondary.yellow]}
            />
          </View>
          <Pressable
            className="bg-navyBlue p-3 rounded-xl items-center flex flex-row justify-start gap-1 mb-2"
            onPress={() => setModalVisible(true)}
          >
            <FontAwesome name="plus" size={15} color="white" />
            <Text className="text-white font-bold text-base">
              {t("project.createProject")}
            </Text>
          </Pressable>
          {/** divide*/}
          <View className="w-full h-[1px] bg-gray-200 my-2" />
          <View
            className="h-[35vh]"
            style={{ backgroundColor: colors.background }}
          >
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
    </>
  );
};

export default ProjectPage;
