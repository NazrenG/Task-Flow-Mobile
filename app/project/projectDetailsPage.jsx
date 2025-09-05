import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { fetchProjectDetail } from "../../utils/fetchUtils";
import RecentAvtivity from "./recentActivity";

const width = Dimensions.get("window").width;

const ViewDetails = () => {
  const { t } = useTranslation();
  const route = useRoute();
  const { id } = route.params;
  const [projectDetails, setProjectDetails] = useState({});
  const profile = {
    name: "Sevgi Alasgarova",
    email: "sevgi.elesgerova@gmail.com",
    avatar: require("../../assets/images/default-user.png"),
  };

  const info = {
    country: "Azerbaijan",
    occupation: "Backend Dev",
    gender: "Female",
    birthday: "12/12/12",
    phone: "0559998877",
    status: "Online",
    project: {
      status: "On Going",
      priority: "Pending",
      startDate: "12/12/12",
      endDate: "12/12/12",
    },
  };

  useEffect(() => {
    const getData = async () => {
      const response = await fetchProjectDetail(id);
      setProjectDetails(response);
      console.log("project details: " + JSON.stringify(response));
    };
    getData();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <Header />
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <Image source={profile.avatar} style={styles.avatar} />
            <Text style={styles.name}>{projectDetails.ownerName}</Text>
            <Text style={styles.email}>{projectDetails.ownerEmail}</Text>
          </View>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoHeader}>{t("userDetail.info")}</Text>
            <InfoRow
              label={t("projectDetails.country")}
              value={projectDetails.country ? projectDetails.country : "--"}
            />
            <InfoRow
              label={t("projectDetails.occupation")}
              value={
                projectDetails.occupation ? projectDetails.occupation : "--"
              }
            />
            <InfoRow
              label={t("projectDetails.gender")}
              value={projectDetails.gender ? projectDetails.gender : "--"}
            />
            <InfoRow
              label={t("projectDetails.birthday")}
              value={projectDetails.birthday ? projectDetails.birthday : "--"}
            />
            <InfoRow
              label={t("projectDetails.phone")}
              value={projectDetails.phone ? projectDetails.phone : "--"}
            />
            <InfoRow
              label={t("projectDetails.status")}
              value={
                <View style={styles.statusRow}>
                  {projectDetails.isOnline ? (
                    <MaterialIcons name="circle" size={12} color="#22c55e" />
                  ) : (
                    <MaterialIcons name="circle" size={12} color="#c52222" />
                  )}

                  <Text style={styles.statusText}>Online</Text>
                </View>
              }
            />
          </View>

          {/* Project Overview Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoHeader}>
              {t("projectDetails.projectOverview")}
            </Text>
            <InfoRow
              label={t("projectDetails.status")}
              value={projectDetails.status}
            />

            <InfoRow
              label={t("project.startDate")}
              value={projectDetails.startDate}
            />
            <InfoRow
              label={t("project.endDate")}
              value={projectDetails.endDate}
            />
            <InfoRow
              label={t("projectDetails.priority")} //description
              value={
                projectDetails.description ? projectDetails.description : "--"
              }
            />
          </View>

          <View style={{ alignItems: "center", marginTop: 24 }}>
            <RecentAvtivity />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}</Text>
    <Text style={styles.infoValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileCard: {
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
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
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#374151",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  infoLabel: {
    fontSize: 15,
    color: "#4B5563",
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
    color: "#1F2937",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: "#22c55e",
    fontWeight: "500",
  },
});

export default ViewDetails;
