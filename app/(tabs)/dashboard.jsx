import { Dimensions, View } from "react-native";
import CountView from "@/components/CountView";
export default function Dashboard() {
  const width = Dimensions.get("window").width;

  const height = Dimensions.get("window").height;

  return (
    <View
      className="flex-1 items-center justify-between   bg-background p-5 "
      style={{ width, height, paddingTop: 80 }}
    > 
      <CountView />
    </View>
  );
}
