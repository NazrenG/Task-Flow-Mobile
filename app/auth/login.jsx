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
  View,
} from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";

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

          <Title>Welcome back!</Title>

          <LottieView
            source={require("../../assets/animations/loginAnimation.json")}
            autoPlay
            loop
            style={{ width: 300, height: 300, marginBottom: 20 }}
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

          <Text
            style={{
              alignSelf: "flex-start",
              color: "#777",
              marginTop: 10,
              marginBottom: 30,
            }}
          >
            Forgot password?
          </Text>

          <View className="mb-10 w-full" />
          <TouchableOpacity
            onPress={() => router.push("/quiz")}
            className="bg-dark_violet justify-center items-center rounded-full p-4"
            style={{
              width: "100%",
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
