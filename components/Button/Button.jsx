import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Button = ({ text }) => {
  return (
    <TouchableOpacity>
      <Text className="text-white text-lg font-bold">
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
