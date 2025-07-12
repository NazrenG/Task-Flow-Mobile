import { useTranslation } from "react-i18next";
import { Dimensions, Image, ScrollView, Text, View } from "react-native";
const width = Dimensions.get("window").width;

const RecentAvtivity = () => {
  const { t } = useTranslation();
  const recentAct = [
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
    {
      user: "you",
      act: "Named a Project:test",
      time: "8:34:14 AM",
    },
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
      className="p-2 bg-white my-4 mb-[10vh] rounded-xl p-4"
    >
      <Text className="text-lg font-semibold mb-3">
        {t("project.recentActivity")}
      </Text>
      <ScrollView nestedScrollEnabled={true}>
        {recentAct.map((item, index) => (
          <View key={index} className="mb-3 flex flex-row gap-6 p-1">
            <View className="size-12 rounded-3xl overflow-hidden">
              <Image
                source={require("../../assets/images/default-user.png")}
                className="w-full h-full"
              />
            </View>
            <View
              style={{ width: width - 150 }}
              className="flex flex-row items-center justify-between"
            >
              <View>
                <Text className="text-base mb-1">{item.user}</Text>
                {item.time !== null && (
                  <View className="flex-row items-center gap-1 mt-1">
                    {/* <MaterialIcons name="watch-later" size={15} color="gray" /> */}
                    <Text className="text-sm text-gray-600">{item.time}</Text>
                  </View>
                )}
              </View>
              <View>
                <Text>{item.act}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentAvtivity;
