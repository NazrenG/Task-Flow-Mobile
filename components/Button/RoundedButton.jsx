import { Pressable, Text } from "react-native";

const RoundedButton = ({
  data,
  styleData,
  textStyle = "",
  customPress = () => {},
}) => {
  return (
    <Pressable
      className={"rounded-2xl py-1 px-2 " + styleData}
      onPress={customPress}
    >
      <Text className={textStyle}>{data}</Text>
    </Pressable>
  );
};

export default RoundedButton;
