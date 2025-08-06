import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Button = ({ text, onPress, style, className }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style} className={className}>
      <Text className="text-white text-lg font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
