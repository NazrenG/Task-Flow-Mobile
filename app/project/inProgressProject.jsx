import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Dimensions, ScrollView, Text, View } from "react-native";
import * as Progress from "react-native-progress";

const width = Dimensions.get("window").width;
const InProgressProject = () => {
  const projects = [
    { name: "test 90", daysLeft: -95 },
    { name: "test 5", daysLeft: -62 },
    { name: "test 17", daysLeft: -95 },
    { name: "test 66", daysLeft: -63 },
    { name: "test 65", daysLeft: -23 },
    { name: "test 65", daysLeft: -34 },
    { name: "test 65", daysLeft: -78 },
  ];

  return (
    <View
      style={{
        width: width - 40,
        maxHeight: 300,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
      }}
      className="p-4 bg-white rounded-lg m-3"
    >
      <Text className="text-lg font-semibold mb-3">In Progress Project</Text>
      <ScrollView nestedScrollEnabled={true}>
        {projects.map((project, index) => (
          <View key={index} className="mb-3 flex flex-row gap-5">
            <View>
              <View className="rounded-full bg-green size-12 p-2 justify-center items-center">
                <Text className="font-bold text-white">
                  {project.name[0].toUpperCase()}
                </Text>
              </View>
            </View>
            <View style={{ width: width - 150 }}>
              <Text className="text-base mb-1">{project.name}</Text>
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
                    Deadline :{project.daysLeft} days left
                  </Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default InProgressProject;
