import Card from "@/components/Card/Card";
import { MaterialIcons } from "@expo/vector-icons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useState } from "react";
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
import CardPagination from "./cardPagination";
import InProgressProject from "./inProgressProject";
import RecentAvtivity from "./recentActivity";

 

const ProjectPage = () => {
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);
 

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
            count="0"
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
            count="2"
            color={Colors.secondary.bg_green}
            icon={
              <MaterialIcons name="query-builder" size={20} color="#059669" />
            }
            gradient={[Colors.secondary.lightGreen, Colors.secondary.green]}
          />
          <Card
            title={t("project.pendingProjects")}
            count="0"
            color={Colors.secondary.bg_yellow}
            icon={
              <MaterialIcons name="pending-actions" size={20} color="#D97706" />
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
    </SafeAreaView>
  );
};

export default ProjectPage;
