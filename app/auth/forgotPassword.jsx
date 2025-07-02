import { router } from "expo-router";
import LottieView from "lottie-react-native";
import { useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import CodeVerification from "../../components/codeverification/codeVerification";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [showCodeInputs, setShowCodeInputs] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);

  const codeRefs = useRef([]);

  const { width } = Dimensions.get("window");

  const handleReset = () => {
    setShowCodeInputs(true);
  };

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.replace(/[^0-9]/g, "").slice(0, 1);
    setCode(newCode);

    // Avtomatik növbəti inputa keç
    if (text && index < code.length - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <LottieView
                source={require("../../assets/animations/Animation - 1751226345030.json")}
                autoPlay
                loop
                style={styles.animation}
              />



        {!showCodeInputs ? (
          <>
        <Text style={styles.title}>Reset Your Password</Text>
        <Text style={styles.subtitle}>
          Enter the email associated with your account and we’ll send you reset instructions.
        </Text>
            <Text style={styles.label}>Your Email</Text>
            <Input
              placeholder="Enter your Email"
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity
              onPress={handleReset}
              className="bg-dark_violet justify-center items-center rounded-full p-4"

              style={{
                width: width * 0.9,
                maxWidth: 400,
                marginBottom: 20,
              }}
            >
              <Button text="Send Reset Instructions" />
            </TouchableOpacity>
          </>
        ) : (
          <>
           <CodeVerification code={code}
    setCode={setCode}
    onNext={() => router.push("auth/changePassword")}/>
          </>
        )}

        <TouchableOpacity onPress={() => router.push("auth/login")}>
          <Text style={styles.returnText}>Return to Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d1e5f",
    textAlign: "center",
    marginBottom: 10,
  },
  animation: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e80",
    textAlign: "center",
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d1e5f",
    alignSelf: "flex-start",
    marginBottom: 8,
    marginTop: 10,
  },
  returnText: {
    color: "#7c3aed",
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 20,
  },
  codeInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    width: "80%",
  },
  codeInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: 50,
    height: 50,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#2d1e5f",
  },
  changeChatBox: {
    marginTop: 30,
    backgroundColor: "#f3f3fc",
    padding: 15,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
  },
});
