import { Link, router } from "expo-router";
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
import LottieView from "lottie-react-native";

const { width, height } = Dimensions.get("window");

const Register = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, setSurname] = React.useState("");
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
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "white",
            alignItems: "center",
            padding: width * 0.05,
          }}
        >
          <View style={{ marginBottom: height * 0.06, width: "100%" }} />

          <Title>Sign Up to TaskFlow</Title>
          <Text style={{ color: "#FF9332", marginBottom: 10 }}>
            Welcome back! We missed you.
          </Text>
          <LottieView
            source={require("../../assets/animations/animation_cat.json")}
            autoPlay
            loop
            style={{ width: width * 0.5, height: width * 0.5, marginBottom: 10 }}
          />


          <Input
            placeholder="Enter your Email Address"
            value={email}
            onChangeText={setEmail}
          />
          <Input placeholder="Enter your Name" value={name} onChangeText={setName} />
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

          <View style={{ marginBottom: height * 0.04, width: "100%" }} />

           <TouchableOpacity
 onPress={() => router.push("auth/otpVerification")}
 className="bg-dark_violet justify-center items-center rounded-full p-4"
 style={{ width: width - 40, marginBottom: 20 }}
 >
 <Button text="Register" />
</TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 8,
            }}
          >
            <Text style={{ color: "#FF9332" }}>Already a member? </Text>
            <Link
              href="auth/login"
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

export default Register;



