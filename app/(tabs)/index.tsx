
import { Redirect } from "expo-router";
export default function HomeScreen() {
  return (
    // <View
    //   className={
    //     "flex-1 w-full flex-row items-start justify-between bg-background p-4"
    //   }
    // >
    //   <CountView />
    // </View>
    <Redirect href="/quiz"/> 
  );
}