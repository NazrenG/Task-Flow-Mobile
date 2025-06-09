import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const Button = ({ text }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5D45FB",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 9999,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Button;
