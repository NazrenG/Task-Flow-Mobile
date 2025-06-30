import { Link, router } from "expo-router";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";

const { width } = Dimensions.get("window");

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center items-center bg-white px-4 py-6">
        <View style={{ marginBottom: 50, width: "100%" }} />


          <Title>Welcome back!</Title>

          <LottieView
            source={require("../../assets/animations/quiz_second.json")}
            autoPlay
            loop
            style={{
              width: width * 0.7, 
              height: width * 0.7,
              marginBottom: 20
            }}
          />

          <Input
            placeholder="Enter your Username"
            value={username}
            onChangeText={setUsername}
          />

          <Input
            placeholder="Enter your Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />

<TouchableOpacity
            onPress={() => router.push("/forgot-password")}
            style={{
              alignSelf: "flex-start",
              color: "#777",
              marginTop: 5,
              marginBottom: 15,
            }}
          >

          <Text
          >
            Forgot password?
          </Text>
          </TouchableOpacity>

          <View style={{ marginBottom: 50, width: "100%" }} />

          <TouchableOpacity
            onPress={() => router.push("/quiz")}
            className="bg-dark_violet justify-center items-center rounded-full p-4"
            style={{
              width: width * 0.9, // ekranın 90%-i
              maxWidth: 400,
              marginBottom: 20,
            }}
          >
            <Button text="Login" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mt-2">
            <Text style={{ color: "#FF9332" }}>Don't have an account? </Text>
            <Link
              href="auth/register"
              style={{ color: "#654A98", fontWeight: "600" }}
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
