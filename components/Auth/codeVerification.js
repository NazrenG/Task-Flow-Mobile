import React, { useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Button from "../Button/Button";

const { width } = Dimensions.get("window");

const CodeVerification = ({ code, setCode, onNext }) => {
  const codeRefs = useRef([]);

  const handleCodeChange = (text, index) => {
    const newCode = [...code];
    newCode[index] = text.replace(/[^0-9]/g, "").slice(0, 1);
    setCode(newCode);

    if (text && index < code.length - 1) {
      codeRefs.current[index + 1]?.focus();
    }
  };

  return (
    <>
      <View style={styles.codeInputs}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (codeRefs.current[index] = el)}
            value={digit}
            onChangeText={(text) => handleCodeChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            style={styles.codeInput}
          />
        ))}
      </View>

      <View style={styles.changeChatBox}>
        <TouchableOpacity
          onPress={onNext} // 👈 düzəldilmiş hissə
          className="bg-dark_violet justify-center items-center rounded-full p-4"

          style={{
            width: width * 0.9,
            maxWidth: 400,
            marginBottom: 20,
          }}
        >
          <Button text="Next" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CodeVerification;
const styles = StyleSheet.create({
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