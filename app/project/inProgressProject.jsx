import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { fetchOnGoingProjectsList } from "../../utils/fetchUtils";

const width = Dimensions.get("window").width;
const InProgressProject = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  // const projects = [
  //   { name: "test 90", daysLeft: -95 },
  //   { name: "test 5", daysLeft: -62 },
  //   { name: "test 17", daysLeft: -95 },
  //   { name: "test 66", daysLeft: -63 },
  //   { name: "test 65", daysLeft: -23 },
  //   { name: "test 65", daysLeft: -34 },
  //   { name: "test 65", daysLeft: -78 },
  // ];
  const { theme } = useTheme();

  useEffect(() => {
    const getDatas = async () => {
      const response = await fetchOnGoingProjectsList();
      console.log("inprogress: " + JSON.stringify(response));
      setProjects(response ? response : []);
    };
    getDatas();
  }, []);

  return (
    <View
      style={[
        {
          width: width - 40,
          maxHeight: 300,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3,
        },
        { backgroundColor: Colors[theme].card },
      ]}
      className="p-4 bg-white rounded-lg m-2"
    >
      <Text
        className="text-lg font-semibold mb-3"
        style={{ color: Colors[theme].text }}
      >
        {t("project.inProcessProject")}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
        {projects && projects.length > 0 ? (
          projects.map((project, index) => (
            <View key={index} className="mb-3 flex flex-row gap-5">
              <View>
                <View className="rounded-full bg-green size-12 p-2 justify-center items-center">
                  <Text className="font-bold text-white">
                    {project.title[0].toUpperCase()}
                  </Text>
                </View>
              </View>
              <View style={{ width: width - 150 }}>
                <Text className="text-base mb-1">{project.title}</Text>
                <Progress.Bar
                  progress={0.6}
                  width={null}
                  height={4}
                  color="rgb(0, 188, 139)"
                  borderWidth={0.5}
                  style={{ width: "100%" }}
                />
                {project.daysLeft !== null && (
                  <View className="flex-row items-center gap-1 mt-1">
                    <MaterialIcons name="watch-later" size={15} color="gray" />
                    <Text className="text-sm text-gray-600">
                      {t("project.deadline")}: days left
                    </Text>
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View>
            <LottieView
              source={require("../../assets/animations/Empty-Search.json")}
              autoPlay
              loop
              style={{ width: 350, height: 170 }} // Animasiya ölçüsü
            />
            <Text
              style={{
                textAlign: "center",
                fontSize: 16,
                fontWeight: "600",
                color: "#4B5563",
                marginTop: 8,
              }}
            >
              You don`t have a project!
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default InProgressProject;
