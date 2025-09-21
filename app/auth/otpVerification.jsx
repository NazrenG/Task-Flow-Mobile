import { router, useLocalSearchParams } from "expo-router";

import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import CodeVerification from "../../components/codeverification/codeVerification";
import {
  fetchEmailConfirmation,
  fetchVerifyCode,
} from "../../utils/profileUtils";
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const OtpVerificationScreen = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const { email } = useLocalSearchParams();
  const codeRefs = useRef([]);
  const { width } = Dimensions.get("window");

  useEffect(() => {
    console.log("emailll" + email);
    const getdata = async () => {
      await delay(4000);
      const confirmation = await fetchEmailConfirmation(email);
      console.log(confirmation);
    };
    getdata();
  }, [email]);

  const checkCode = async () => {
    console.log("otp email: " + email);
    const response = await fetchVerifyCode(code, email);
    if (response) router.push("/quiz");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.innerContainer}
        keyboardShouldPersistTaps="handled"
      >
        <LottieView
          source={require("../../assets/animations/Animation - 1751226345030.json")}
          autoPlay
          loop
          style={styles.animation}
        />

        <CodeVerification code={code} setCode={setCode} onNext={checkCode} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  animation: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2d1e5f",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6e6e80",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  returnText: {
    color: "#7c3aed",
    textAlign: "center",
    fontSize: 15,
    textDecorationLine: "underline",
    marginTop: 30,
  },
});
