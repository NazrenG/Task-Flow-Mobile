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
import { useTheme } from "../../components/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const CardPagination = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { t } = useTranslation();
  const scrollRef = useRef(null);
  const { theme } = useTheme();

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
        <View className="flex flex-row gap-1">
          <RoundedButton
            data={t("project.pending")}
            styleData="bg-bg_blue"
            textStyle="text-sm"
          />
          <RoundedButton
            data={t("project.onGoing")}
            styleData="bg-bg_yellow"
            textStyle="text-sm"
          />
          <RoundedButton
            data={t("project.complated")}
            styleData="bg-light_green"
            textStyle="text-sm"
          />
        </View>
      </View>

      {/* Horizontal Scroll Cards */}
      <View className="py-2">
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
            <View
              key={index}
              style={[
                styles.card,
                { backgroundColor: Colors[theme].card },
              ]}
            >
              <View className="flex flex-row flex-left mt-6">
                <View
                  className="h-[3vh] w-[1vw] mr-4"
                  style={{ backgroundColor: Colors[theme].primary }}
                />
                <Text
                  style={[styles.cardTitle, { color: Colors[theme].text }]}
                >
                  {card.title}
                </Text>
              </View>
              <View className="px-6 py-4">
                <Text
                  style={[styles.cardContent, { color: Colors[theme].text }]}
                >
                  Owned by you
                </Text>
                <Text
                  className="text-sm font-light mt-2"
                  style={{ color: Colors[theme].text }}
                >
                  {t("project.deadline")}: yyyy-mm-dd
                </Text>
              </View>
              <View className="flex flex-row justify-between mx-9 mb-4 relative">
                <Text
                  className="text-2xl items-center"
                  style={{ color: Colors[theme].text }}
                >
                  -
                </Text>
                <ProjectActionsDropdown
                  isOpen={openDropdownIndex === index}
                  style={{ color: Colors[theme].text }}
                  onToggle={() =>
                    setOpenDropdownIndex(
                      openDropdownIndex === index ? null : index
                    )
                  }
                />
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
              style={[
                styles.dot,
                { backgroundColor: Colors[theme].border },
                currentIndex === index && {
                  backgroundColor: Colors[theme].primary,
                  width: 12,
                },
              ]}
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
  },
  card: {
    width: SCREEN_WIDTH / 2 - 40,
    marginHorizontal: 10,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardContent: {
    fontSize: 14,
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
    marginHorizontal: 4,
  },
});

export default CardPagination;
