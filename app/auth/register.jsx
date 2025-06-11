import { Link, router } from "expo-router";
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

const Register = () => {
  const width = Dimensions.get("window").width;
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [surname, SetSurname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <View className="flex-1 justify-center bg-white items-center p-5">
          <View className="mb-24 w-full" />

          <Title>Sign Up to TaskFlow</Title>
          <Text style={{ color: "#FF9332" }}> Welcome back! We missed you.</Text>
          <View className="mb-36 w-full" />

          <Input placeholder="Enter your Email Address" value={email} onChangeText={setEmail} />
          <Input placeholder="Enter your Name" value={name} onChangeText={setName} />
          <Input placeholder="Enter your Surname" value={surname} onChangeText={SetSurname} />
          <Input placeholder="Enter your Username" value={username} onChangeText={setUsername} />
          <Input placeholder="Enter your Password" value={password} onChangeText={setPassword} secureTextEntry />

          <View className="mb-8 w-full" />

          <TouchableOpacity
            onPress={() => router.push("auth/login")}
            className="bg-dark_violet justify-center items-center rounded-full p-4"
            style={{ width: width - 40, marginBottom: 20 }}
          >
            <Button text="Register" />
          </TouchableOpacity>

          <View className="flex-row items-center justify-center mb-2">
            <Text style={{ color: "#FF9332" }}>Already a member? </Text>
            <Link href="auth/login" style={{ color: "#654A98", fontWeight: "600" }}>
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
