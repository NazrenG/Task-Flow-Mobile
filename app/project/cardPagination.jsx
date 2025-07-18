import { useRef, useState } from "react";
import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import RoundedButton from "../../components/Button/RoundedButton";
import { Colors } from "../../constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useTranslation } from "react-i18next";
import ProjectActionsDropdown from "../../components/dropdown/projectActionsDropdown";
const width = Dimensions.get("window").width;
const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CardPagination = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { t } = useTranslation();
  const scrollRef = useRef(null);
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
  console.log(cardsData);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / SCREEN_WIDTH);
    setCurrentIndex(index);
  };

  const scrollToIndex = (index) => {
    scrollRef.current?.scrollTo({
      x: index * SCREEN_WIDTH,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <View className="flex flex-row items-center justify-end my-2">
        {/* <Text className="text-base font-semibold my-2 ml-2">
          {t("project.recentProjectUpdates")}
        </Text> */}
 

        <View className="flex flex-row gap-1 ">
          <RoundedButton
            data={t("project.pending")}
            styleData="bg-bg_blue"
            textStyle="text-sm"
          ></RoundedButton>
          <RoundedButton
            data={t("project.onGoing")}
            styleData="bg-bg_yellow"
            textStyle="text-sm"
          ></RoundedButton>
          <RoundedButton
            data={t("project.complated")}
            styleData="bg-light_green"
            textStyle="text-sm"
          ></RoundedButton>
        </View>
      </View>
      {/* Horizontal Scroll Cards */}
      <View>
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          snapToInterval={SCREEN_WIDTH}
          decelerationRate="fast"
        >
          {cardsData.map((card, index) => (
            <View key={index} style={styles.card}>
              <View className="flex flex-row flex-left mt-6">
                <View className="bg-navyBlue h-[3vh] w-[1vw] mr-4"></View>
                <Text style={styles.cardTitle}>{card.title}</Text>
              </View>
              <View className="px-6 py-4">
                <Text style={styles.cardContent}>Owned by you</Text>
                <Text className="text-[#6C757D] text-sm font-light mt-2">
                  {t("project.deadline")}: yyyy-mm-dd
                </Text>
              </View>
              <View className="flex flex-row justify-between mx-9 mb-4 relative">
                <Text className="text-2xl items-center">-</Text>
                <ProjectActionsDropdown
                  isOpen={openDropdownIndex === index}
                  onToggle={() =>
                    setOpenDropdownIndex(
                      openDropdownIndex === index ? null : index
                    )
                  }
                ></ProjectActionsDropdown>
                {/* <Entypo name="dots-three-horizontal" size={24} color="black" /> */}
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {cardsData.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => {
                scrollToIndex(index);
                setCurrentIndex(index);
              }}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // paddingVertical: 20,
  },
  card: {
    width: SCREEN_WIDTH / 2 - 40,
    marginHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 12,
    // padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    // position: "relative",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  cardContent: {
    fontSize: 14,
    color: "#6C757D",
    fontWeight: "bold",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.primary.navyBlue,
    width: 12,
  },
});

export default CardPagination;
