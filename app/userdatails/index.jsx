import Header from "@/components/Header"; // öz Header komponentindir
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
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


const { width } = Dimensions.get("window");

export default function UserDetail() {
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const { t } = useTranslation();

  // Profile Info Data
  const profileInfo = {
    avatar: require('../../assets/images/default-user.png'),
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Header onSearch={setSearchText} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Task Summary */}
        <View style={styles.taskGrid}>
          
          <Card
            title="Total Task"
            count="0"
            color="#FEF3C7"
            icon={<MaterialIcons name="assignment" size={20} color="#D97706" />}
          />
          <Card
            title="Running Task"
            count="2"
            color="#D1FAE5"
            icon={<MaterialIcons name="play-circle-outline" size={20} color="#059669" />}
          />
          <Card
            title="On Hold Task"
            count="0"
            color="#EDE9FE"
            icon={<MaterialIcons name="pause-circle-outline" size={20} color="#7C3AED" />}
          />
          <Card
            title="Complete Task"
            count="0"
            color="#CFFAFE"
            icon={<MaterialIcons name="check-circle-outline" size={20} color="#0E7490" />}
          />
        </View>

        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
          <Image
                        source={profileInfo.avatar}
                        style={{ width: 70, height: 70, borderRadius: 40 }}
                        resizeMode="cover"
                      />
          </View>
          <Text style={styles.name}>{profileInfo.name}</Text>
          <Text style={styles.email}>{profileInfo.email}</Text>

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
        <View style={styles.infoCard}>
          <Text style={styles.infoHeader}>{t("info")}</Text>
          <InfoItem label="Country" value={basicInfo.country} />
          <InfoItem label="Occupation" value={basicInfo.occupation} />
          <InfoItem label="Gender" value={basicInfo.gender} />
          <InfoItem label="BirthDay" value={basicInfo.birthday} />
          <InfoItem label="Phone" value={basicInfo.phone} />
          <InfoItem
            label="Status"
            value={
              <View style={styles.statusContainer}>
                <MaterialIcons name="circle" size={12} color="#DC2626" />
                <Text style={styles.statusText}>{basicInfo.status}</Text>
              </View>
            }
          />
        </View>
        {/* <View style={styles.taskTableContainer}>
                <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderText}>No</Text>
    <Text style={styles.tableHeaderText}>Task</Text>
    <Text style={styles.tableHeaderText}>Priority</Text>
    <Text style={styles.tableHeaderText}>Progress</Text>
            </View>

 
            {[1, 2].map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{index + 1}</Text>
                <Text style={styles.tableCell}>Design Home Page</Text>
                <Text style={styles.tableCell}>High</Text>
                <Text style={styles.tableCell}>70%</Text>
              </View>
            ))}
            </View> */}
        {/* Task Cards */}
        <View style={styles.taskCardList}>
  <Text style={styles.infoHeader}>🗂️ Task Overview</Text>
  {taskData.map((task, index) => (
    <View key={task.id} style={styles.taskCard}>
      <Text style={styles.taskCardTitle}>#{index + 1} • {task.task}</Text>

      <View style={styles.metaInfo}>
        <Text style={styles.label}>📌 Priority:</Text>
        <Text style={[styles.value, getPriorityStyle(task.priority)]}>{task.priority}</Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.label}>🕒 Start:</Text>
        <Text style={styles.value}>{task.startDate}</Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.label}>📅 Deadline:</Text>
        <Text style={styles.value}>{task.deadline}</Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.label}>📈 Progress:</Text>
        <Text style={styles.value}>{task.progress}</Text>
      </View>

      <View style={styles.metaInfo}>
        <Text style={styles.label}>✅ Status:</Text>
        <Text style={[styles.value, getStatusStyle(task.status)]}>{task.status}</Text>
      </View>
    </View>
  ))}
</View>

      </ScrollView>
    </SafeAreaView>
  );
}




// InfoItem Component
const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value || ":"}</Text>
  </View>
);

const styles = StyleSheet.create({
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },
  avatar: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#6B7280",
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
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 3,
  },
  infoHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#4B5563",
  },
  infoValue: {
    fontSize: 15,
    color: "#1F2937",
    fontWeight: "500",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "500",
  },
  taskCardList: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    marginBottom: 24,
  },
  taskCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  taskCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#24292e",
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    color: "#57606a",
  },
  value: {
    fontWeight: "400",
    color: "#24292e",
  },
});
