import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FriendCard from "../../components/friendsPageComponents/friendCard";
import UserCard from "../../components/friendsPageComponents/userCard";
import Header from "../../components/Header";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

const width = Dimensions.get("window").width;

export default function Friends() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  const handleTabPress = (index) => {
    setActiveTab(index);
    Animated.spring(translateX, {
      toValue: (width / 2) * index,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <Header onSearch={setSearchText} />
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: "center",
          backgroundColor: Colors[theme].background,
        }}
      >
        <View
          style={{
            marginTop: 20,
            borderRadius: 20,
            padding: 16,
            marginHorizontal: 12,
            width: width - 24,
            backgroundColor: Colors[theme].card,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
            elevation: 4,
          }}
        >
          {/* Tabs */}
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: Colors[theme].border || "#eee",
              marginBottom: 8,
            }}
          >
            {["friend.yourFriends", "friend.allUsers"].map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flex: 1,
                  alignItems: "center",
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor:
                    activeTab === index
                      ? Colors[theme].primary + "15"
                      : "transparent",
                }}
                onPress={() => handleTabPress(index)}
              >
                <Text
                  style={{
                    fontWeight: activeTab === index ? "700" : "400",
                    fontSize: 16,
                    color:
                      activeTab === index
                        ? Colors[theme].primary
                        : Colors[theme].textSecondary,
                  }}
                >
                  {t(tab)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Animated underline */}
          <Animated.View
            style={{
              height: 4,
              borderRadius: 2,
              backgroundColor: Colors[theme].primary,
              position: "absolute",
              top: 66,
              left: 12,
              width: width / 2 - 24,
              transform: [{ translateX }],
            }}
          />

          {/* Content */}
          <View style={{ paddingTop: 20 }}>
            {activeTab === 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <FriendCard />
                <FriendCard />
                <FriendCard />
                <FriendCard />
                
              </View>
            ) : (
              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 16,
                  justifyContent: "space-between",
                }}
              >
                <UserCard />
                <UserCard />
                <UserCard />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
