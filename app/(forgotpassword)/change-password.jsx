import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

const ChangePasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    // if (!newPassword || !confirmPassword) {
    //   Alert.alert("Error", "Please fill in both fields.");
    //   return;
    // }

    // if (newPassword !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match.");
    //   return;
    // }

    Alert.alert("Success", "Password changed successfully!");
    router.push("auth/login");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Change Password</Text>

        <Text style={styles.label}>New Password</Text>
        <Input
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirm Password</Text>
        <Input
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.buttonContainer}
          className="bg-dark_violet justify-center items-center rounded-full p-4"
        >
          <Button text="Submit" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width * 0.07, // 7% padding sağ/sol
    paddingVertical: height * 0.05, // 5% yuxarı/aşağı
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: width * 0.065, // ~26px
    fontWeight: "bold",
    color: "#2d1e5f",
    textAlign: "center",
    marginBottom: height * 0.04,
  },
  label: {
    fontSize: width * 0.035, // ~14px
    fontWeight: "600",
    color: "#2d1e5f",
    marginBottom: 8,
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: height * 0.04,
    width: width * 0.9,
    alignSelf: "center",
  },
});
