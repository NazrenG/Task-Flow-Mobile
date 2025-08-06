import Header from "@/components/Header";
import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card/Card";
import {
  Dimensions,
  Image,
  Linking,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "@/components/ThemeContext"; // mövzu hook
import { Colors } from "@/constants/Colors"; // mövzu rəngləri

const { width } = Dimensions.get("window");

export default function UserDetail() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { theme } = useTheme(); // Mövzu alınır

  // Profile Info Data
  const profileInfo = {
    avatar: require("../../assets/images/default-user.png"),
    name: "Nezrin Quliyeva",
    email: "nazrinG@gmail.com",
  };

  // Basic Info Data
  const basicInfo = {
    country: "Azerbaijan",
    occupation: "Other (please specify)",
    gender: "Female",
    birthday: "01-01-2025",
    phone: "+994501234567",
    status: "Offline",
  };

  // Task Data
  const taskData = [
    {
      id: "1",
      task: "Design Home Page",
      priority: "High",
      startDate: "2025-07-01",
      deadline: "2025-07-05",
      progress: "50%",
      status: "In Progress",
    },
    {
      id: "2",
      task: "Fix Login Bug",
      priority: "Medium",
      startDate: "2025-07-02",
      deadline: "2025-07-06",
      progress: "80%",
      status: "Running",
    },
  ];

  const getPriorityStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return { color: "#d73a49", fontWeight: "bold" };
      case "medium":
        return { color: "#dbab09", fontWeight: "bold" };
      case "low":
        return { color: "#28a745", fontWeight: "bold" };
      default:
        return {};
    }
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "done":
      case "completed":
        return { color: "#28a745", fontWeight: "bold" };
      case "in progress":
        return { color: "#dbab09", fontWeight: "bold" };
      case "not started":
      case "pending":
        return { color: "#d73a49", fontWeight: "bold" };
      default:
        return {};
    }
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        { backgroundColor: Colors[theme].background },
      ]}
    >
      <Header onSearch={setSearchText} />
      <ScrollView
        style={[styles.container, { backgroundColor: Colors[theme].background }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Task Summary */}
        <View style={styles.taskGrid}>
          <Card
            title={t("userDetail.totalTasks", "Total Tasks")}
            count="0"
            color="#f8ebc5"
            icon={<MaterialIcons name="assignment" size={20} color="#D97706" />}
            gradient={["#fcd34d", "#fde68a"]}
          />
          <Card
            title={t("userDetail.runningTasks", "Running Tasks")}
            count="2"
            color="#caf8e7"
            icon={
              <MaterialIcons name="play-circle-outline" size={20} color="#059669" />
            }
            gradient={["#34d399", "#6ee7b7"]}
          />
          <Card
            title={t("userDetail.holdTasks", "On Hold")}
            count="0"
            color="#c2b8ff"
            icon={
              <MaterialIcons name="pause-circle-outline" size={20} color="#7C3AED" />
            }
            gradient={["#a78bfa", "#ddd6fe"]}
          />
          <Card
            title={t("userDetail.completedTasks", "Completed")}
            count="0"
            color="#CFFAFE"
            icon={
              <MaterialIcons name="check-circle-outline" size={20} color="#0E7490" />
            }
            gradient={["#67e8f9", "#a5f3fc"]}
          />
        </View>

        {/* Profile Info */}
        <View
          style={[
            styles.profileCard,
            { backgroundColor: Colors[theme].card, shadowColor: theme === "dark" ? "#000" : "#aaa" },
          ]}
        >
          <View style={styles.avatar}>
            <Image
              source={profileInfo.avatar}
              style={{ width: 70, height: 70, borderRadius: 40 }}
              resizeMode="cover"
            />
          </View>
          <Text style={[styles.name, { color: Colors[theme].text }]}>
            {profileInfo.name}
          </Text>
          <Text style={[styles.email, { color: Colors[theme].secondaryText }]}>
            {profileInfo.email}
          </Text>

          <View style={styles.iconRow}>
            <Pressable
              onPress={() => Linking.openURL(`mailto:${profileInfo.email}`)}
              style={styles.mailButton}
            >
              <Entypo name="mail" size={16} color="white" />
            </Pressable>
            <Pressable
              onPress={() => router.push("/chat/chatDetails")}
              style={styles.mailButton}
            >
              <MaterialIcons name="chat" size={16} color="white" />
            </Pressable>
            <Pressable style={styles.mailButton}>
              <MaterialIcons name="notifications" size={16} color="white" />
            </Pressable>
            <Pressable
              onPress={() => Linking.openURL(`tel:${basicInfo.phone}`)}
              style={styles.mailButton}
            >
              <MaterialIcons name="call" size={16} color="white" />
            </Pressable>
          </View>
        </View>

        {/* Basic Info */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: Colors[theme].card, shadowColor: theme === "dark" ? "#000" : "#aaa" },
          ]}
        >
          <Text style={[styles.infoHeader, { color: Colors[theme].text }]}>
            {t("userDetail.info")}
          </Text>
          <InfoItem
            label={t("userDetail.country")}
            value={basicInfo.country}
            theme={theme}
          />
          <InfoItem
            label={t("userDetail.occupation")}
            value={basicInfo.occupation}
            theme={theme}
          />
          <InfoItem label={t("userDetail.gender")} value={basicInfo.gender} theme={theme} />
          <InfoItem label={t("userDetail.birthDate")} value={basicInfo.birthday} theme={theme} />
          <InfoItem label={t("userDetail.phone")} value={basicInfo.phone} theme={theme} />
          <InfoItem
            label={t("userDetail.status")}
            value={
              <View style={styles.statusContainer}>
                <MaterialIcons name="circle" size={12} color="#DC2626" />
                <Text style={[styles.statusText, { color: Colors[theme].textSecondary }]}>
                  {basicInfo.status}
                </Text>
              </View>
            }
            theme={theme}
          />
        </View>

        {/* Task Cards */}
        <View style={styles.taskCardList}>
          <Text style={[styles.infoHeader, { color: Colors[theme].text }]}>
            🗂️{t("userDetail.overview")}
          </Text>
          {taskData.map((task, index) => (
            <View
              key={task.id}
              style={[
                styles.taskCard,
                { backgroundColor: Colors[theme].card, shadowColor: theme === "dark" ? "#000" : "#aaa" },
              ]}
            >
              <Text style={[styles.taskCardTitle, { color: Colors[theme].text }]}>
                #{index + 1} • {task.task}
              </Text>

              <View style={styles.metaInfo}>
                <View style={styles.iconLabel}>
                  <MaterialCommunityIcons
                    name="flag-outline"
                    size={18}
                    color="#715ad1"
                  />
                  <Text style={[styles.label, { color: Colors[theme].textSecondary }]}>
                    {t("userDetail.priority")}
                  </Text>
                </View>
                <Text style={[styles.value, getPriorityStyle(task.priority)]}>
                  {task.priority}
                </Text>
              </View>

              <View style={styles.metaInfo}>
                <View style={styles.iconLabel}>
                  <MaterialCommunityIcons
                    name="clock-time-four-outline"
                    size={18}
                    color="#715ad1"
                  />
                  <Text style={[styles.label, { color: Colors[theme].textSecondary }]}>
                    {t("userDetail.start")}
                  </Text>
                </View>
                <Text style={[styles.value, { color: Colors[theme].text }]}>
                  {task.startDate}
                </Text>
              </View>

              <View style={styles.metaInfo}>
                <View style={styles.iconLabel}>
                  <MaterialCommunityIcons
                    name="calendar-check-outline"
                    size={18}
                    color="#715ad1"
                  />
                  <Text style={[styles.label, { color: Colors[theme].textSecondary }]}>
                    {t("userDetail.deadline")}
                  </Text>
                </View>
                <Text style={[styles.value, { color: Colors[theme].text }]}>
                  {task.deadline}
                </Text>
              </View>

              <View style={styles.metaInfo}>
                <View style={styles.iconLabel}>
                  <MaterialCommunityIcons
                    name="progress-clock"
                    size={18}
                    color="#715ad1"
                  />
                  <Text style={[styles.label, { color: Colors[theme].textSecondary }]}>
                    {t("userDetail.progress")}
                  </Text>
                </View>
                <Text style={[styles.value, { color: Colors[theme].text }]}>
                  {task.progress}
                </Text>
              </View>

              <View style={styles.metaInfo}>
                <View style={styles.iconLabel}>
                  <MaterialCommunityIcons
                    name="checkbox-marked-circle-outline"
                    size={18}
                    color="#715ad1"
                  />
                  <Text style={[styles.label, { color: Colors[theme].textSecondary }]}>
                    {t("userDetail.status")}
                  </Text>
                </View>
                <Text style={[styles.value, getStatusStyle(task.status)]}>
                  {task.status}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// InfoItem Component
const InfoItem = ({ label, value, theme }) => (
  <View style={styles.infoItem}>
    <Text style={[styles.infoLabel, { color: Colors[theme].textSecondary }]}>
      {label}
       </Text>
    <Text style={[styles.infoValue, { color: Colors[theme].text }]}>
      {value || ":"}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  iconLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  taskGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  profileCard: {
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    marginBottom: 12,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
  },
  mailButton: {
    backgroundColor: "#715ad1",
    borderRadius: 5,
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  infoHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    fontWeight: "500",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  taskCardList: {
    padding: 16,
    marginBottom: 24,
  },
  taskCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  taskCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
  },
  value: {
    fontWeight: "400",
  },
});

