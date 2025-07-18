import { useTranslation } from "react-i18next";
import { Dimensions, Image, Text, View } from "react-native";
import Header from "../../components/Header";
import RecentAvtivity from "./recentActivity";

const width = Dimensions.get("window").width;

const ViewDetails = () => {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Header></Header>
      <View style={{ alignItems: "center" }}>
        <View
          style={{ width: width - 40 }}
          className="border-2 border-gray-300 my-3 rounded-lg p-4 py-7 shadow shadow-gray-400 bg-white items-center"
        >
          <View>
            <Image
              style={{
                width: width / 5,
                height: width / 5,
              }}
              source={require("../../assets/images/default-user.png")}
            />
          </View>
          <View className="justify-center items-center mt-2">
            <Text className="font-bold text-lg">Sevgi Alasgarova</Text>
            <Text>sevgi.elesgerova@gmail.com</Text>
          </View>
          <View className="mt-5">
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.country")}:{" "}
              </Text>
              <Text>Azerbaijan</Text>
            </View>
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.occupation")}:
              </Text>
              <Text>Backend Dev</Text>
            </View>
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.gender")}:
              </Text>
              <Text>Female</Text>
            </View>
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.birthday")}:
              </Text>
              <Text>12/12/12</Text>
            </View>
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.phone")}:
              </Text>
              <Text>0559998877</Text>
            </View>
            <View className="w-full flex flex-row gap-2">
              <Text className="font-bold text-lg">
                {t("projectDetails.status")}:
              </Text>
              <Text>Online</Text>
            </View>

            <View className="mt-5">
              <Text className="text-xl font-semibold mb-1">
                {t("projectDetails.projectOverview")}:
              </Text>
              <View className="w-full flex flex-row gap-2">
                <Text className="font-bold text-lg">
                  {t("projectDetails.status")}:
                </Text>
                <Text>On Going</Text>
              </View>
              <View className="w-full flex flex-row gap-2">
                <Text className="font-bold text-lg">
                  {t("projectDetails.priority")}:
                </Text>
                <Text>Pending</Text>
              </View>
              <View className="w-full flex flex-row gap-2">
                <Text className="font-bold text-lg">
                  {t("project.startDate")}:
                </Text>
                <Text>12/12/12</Text>
              </View>
              <View className="w-full flex flex-row gap-2">
                <Text className="font-bold text-lg">
                  {t("project.endDate")}:
                </Text>
                <Text>12/12/12</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View style={{ alignItems: "center", marginTop: 14 }}>
        <RecentAvtivity></RecentAvtivity>
      </View>
    </View>
  );
};

export default ViewDetails;
