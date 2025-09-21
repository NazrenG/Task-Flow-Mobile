import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from "react-native";
import * as Progress from "react-native-progress";
import { fetchProjectInvolved } from "@/utils/dashboardUtils";
import LottieView from "lottie-react-native";

export default function ProjectCard() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProjectInvolved();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <LottieView
        source={require("../../assets/animations/EmptyArray.json")}
        autoPlay
        loop
        style={{ width: 350, height: 170, alignSelf: "center" }}
      />
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <LottieView
        source={require("../../assets/animations/EmptyArray.json")}
        autoPlay
        loop
        style={{ width: 350, height: 170, alignSelf: "center" }}
      />
    );
  }

  return (
    <FlatList
      data={projects}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>
                {item.title.charAt(0).toUpperCase()}
              </Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.projectTitle}>{item.title}</Text>
            </TouchableOpacity>
          </View>

          {/* Task Info */}
          <Text style={styles.taskText}>
            Task Done: {item.completedTask}/{item.totalTask}
          </Text>

          {/* Progress Bar */}
          <Progress.Bar
            progress={item.totalTask > 0 ? item.completedTask / item.totalTask : 0}
            width={null}
            height={6}
            color="#3C21F7"
            unfilledColor="#e0e0e0"
            borderWidth={0}
            style={styles.progressBar}
          />

          {/* Participants */}
          <View style={styles.participants}>
            {item.participantsPath?.length > 0 ? (
              item.participantsPath.map((p, i) => (
                <Image
                  key={i}
                  source={{
                    uri: p
                      ? p
                      : "https://jeffjbutler.com//wp-content/uploads/2018/01/default-user.png",
                  }}
                  style={styles.participantImage}
                />
              ))
            ) : (
              <Text style={styles.noParticipants}>No Participants</Text>
            )}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: "90%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ef7f5a",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  projectTitle: {
    marginLeft: 10,
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  taskText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#666",
  },
  progressBar: {
    marginBottom: 12,
  },
  participants: {
    flexDirection: "row",
    alignItems: "center",
  },
  participantImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: -8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  noParticipants: {
    fontSize: 12,
    color: "#aaa",
  },
});
