import { Pressable, Text } from "react-native";

const RoundedButton = ({ data, style, textStyle = "" }) => {
  return (
    <Pressable className={"rounded-2xl py-1 px-2 " + style}>
      <Text className={textStyle}>{data}</Text>
    </Pressable>
  );
};

export default RoundedButton;
