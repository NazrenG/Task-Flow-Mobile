import Header from "@/components/Header"; // öz Header komponentindir
import { MaterialIcons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
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
              onPress={() => navigation.navigate("@/app/chat/chatDetails")}
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
          <Text style={styles.infoHeader}>Basic Info</Text>
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
        <View style={styles.taskTableContainer}>
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderText}>No</Text>
    <Text style={styles.tableHeaderText}>Task</Text>
    <Text style={styles.tableHeaderText}>Priority</Text>
    <Text style={styles.tableHeaderText}>Progress</Text>
  </View>

  {/* If you have task data */}
  {[1, 2].map((item, index) => (
    <View style={styles.tableRow} key={index}>
      <Text style={styles.tableCell}>{index + 1}</Text>
      <Text style={styles.tableCell}>Design Home Page</Text>
      <Text style={styles.tableCell}>High</Text>
      <Text style={styles.tableCell}>70%</Text>
    </View>
  ))}
</View>
        {/* Task Cards
        <View style={styles.taskCardList}>
          <Text style={styles.infoHeader}>Task Overview</Text>
          {taskData.map((task, index) => (
            <View key={task.id} style={styles.taskCard}>
              <Text style={styles.taskCardTitle}>Task #{index + 1}</Text>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Task:</Text>
                <Text style={styles.taskValue}>{task.task}</Text>
              </View>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Priority:</Text>
                <Text style={styles.taskValue}>{task.priority}</Text>
              </View>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Start Date:</Text>
                <Text style={styles.taskValue}>{task.startDate}</Text>
              </View>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Deadline:</Text>
                <Text style={styles.taskValue}>{task.deadline}</Text>
              </View>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Progress:</Text>
                <Text style={styles.taskValue}>{task.progress}</Text>
              </View>
              <View style={styles.taskRow}>
                <Text style={styles.taskLabel}>Status:</Text>
                <Text style={styles.taskValue}>{task.status}</Text>
              </View>
            </View>
          ))}
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

// Card Component
const Card = ({ title, count, color, icon }) => (
  <TouchableOpacity style={[styles.card, { backgroundColor: color }]} activeOpacity={0.8}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardCount}>{count}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

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
  card: {
    width: width / 2 - 22,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
  cardCount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 4,
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
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 16,
    paddingLeft: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#3B82F6",
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
    marginTop: 12,
    marginBottom: 24,
  },
  taskCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  taskCardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#4B5563",
  },
  taskRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  taskLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  taskValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },

  ////////////////////////
  taskTableContainer: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#c3bae8",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
    justifyContent: "space-between",
    marginBottom: 6,
  },
  tableHeaderText: {
    fontWeight: "600",
    fontSize: 12,
    flex: 1,
    textAlign: "center",
    color: "#4B5563",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    color: "#1F2937",
  }
});
