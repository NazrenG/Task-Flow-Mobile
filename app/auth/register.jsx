import { Link, router } from "expo-router";

import LottieView from "lottie-react-native";
import React from "react";
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Input from "../../components/Input/Input";
import Title from "../../components/Title/Title";
import { fetchSignUp } from "../../utils/fetchUtils";
import Button from "../../components/Button/Button";

const { width, height } = Dimensions.get("window");
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!email || !name || !surname || !username || !password) return;
    console.log("in hsu");
    const response = await fetchSignUp(
      email,
      name,
      surname,
      username,
      password
    );
    if (response) {
      router.push("/auth/otpVerification?email=" + email);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            padding: width * 0.05,
          }}
        >
          <View style={{ marginBottom: height * 0.06 }} />

          <Title>Sign Up to TaskFlow</Title>
          <Text style={{ color: "#FF9332", marginBottom: 10 }}>
            Welcome back! We missed you.
          </Text>

          <LottieView
            source={require("../../assets/animations/animation_cat.json")}
            autoPlay
            loop
            style={{
              width: width * 0.5,
              height: width * 0.5,
              marginBottom: 10,
            }}
          />

          <Input
            placeholder="Enter your Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            placeholder="Enter your Name"
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder="Enter your Surname"
            value={surname}
            onChangeText={setSurname}
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
            secureTextEntry
          />

          <View style={{ marginBottom: height * 0.04 }} />

  
<Button
  text="Register"
  onPress={() => router.push("auth/otpVerification")}
  style={{ width: width - 40, marginBottom: 20 }}
  className="bg-dark_violet justify-center items-center rounded-full p-4"
/>


          <View
            style={{
              width: width - 40,
              marginBottom: 20,
              backgroundColor: "#654A98",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              padding: 16,
            }}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: "#FF9332" }}>Already a member? </Text>
            <Link
              href="auth/login"
              style={{ color: "#654A98", fontWeight: "600" }}
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
