import Header from "@/components/Header";
import { MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, Text, View, ScrollView } from "react-native";
import RecentAvtivity from "./recentActivity";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

const width = Dimensions.get("window").width;

const ViewDetails = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

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

  return (
    <View style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <Header />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {/* Profile Card */}
          <View style={[styles.profileCard, { backgroundColor: Colors[theme].card }]}>
            <Image source={profile.avatar} style={styles.avatar} />
            <Text style={[styles.name, { color: Colors[theme].text }]}>{profile.name}</Text>
            <Text style={[styles.email, { color: Colors[theme].text }]}>{profile.email}</Text>
          </View>

          {/* Info Card */}
          <View style={[styles.infoCard, { backgroundColor: Colors[theme].card }]}>
            <Text style={[styles.infoHeader, { color: Colors[theme].text }]}>{t("userDetail.info")}</Text>
            <InfoRow label={t("projectDetails.country")} value={info.country} theme={theme} />
            <InfoRow label={t("projectDetails.occupation")} value={info.occupation} theme={theme} />
            <InfoRow label={t("projectDetails.gender")} value={info.gender} theme={theme} />
            <InfoRow label={t("projectDetails.birthday")} value={info.birthday} theme={theme} />
            <InfoRow label={t("projectDetails.phone")} value={info.phone} theme={theme} />
            <InfoRow
              label={t("projectDetails.status")}
              value={
                <View style={styles.statusRow}>
                  <MaterialIcons name="circle" size={12} color={ "#22c55e"} />
                  <Text style={[styles.statusText]}>{info.status}</Text>
                </View>
              }
              theme={theme}
            />
          </View>

          {/* Project Overview Card */}
          <View style={[styles.infoCard, { backgroundColor: Colors[theme].card }]}>
            <Text style={[styles.infoHeader, { color: Colors[theme].text }]}>{t("projectDetails.projectOverview")}</Text>
            <InfoRow label={t("projectDetails.status")} value={info.project.status} theme={theme} />
            <InfoRow label={t("projectDetails.priority")} value={info.project.priority} theme={theme} />
            <InfoRow label={t("project.startDate")} value={info.project.startDate} theme={theme} />
            <InfoRow label={t("project.endDate")} value={info.project.endDate} theme={theme} />
          </View>

          <View style={{ alignItems: "center", marginTop: 24 }}>
            <RecentAvtivity />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value, theme }) => (
  <View style={[styles.infoRow]}>
    <Text style={[styles.infoLabel, { color: Colors[theme].text }]}>{label}</Text>
    <Text style={[styles.infoValue, { color: Colors[theme].text }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileCard: {
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
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
  },
  infoHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 15,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#22c55e",
  },
});

export default ViewDetails;
