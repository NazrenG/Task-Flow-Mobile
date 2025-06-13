import { Dimensions, View } from "react-native";
import { PieChart } from "react-native-chart-kit";

export default function DonutChart() {
  const screenWidth = Dimensions.get("window").width;

  const data = [
    {
      name: "IT(programming)",
      population: 10,
      color: "#f00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Design",
      population: 60,
      color: "#0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
     {
      name: "Human Resources",
      population: 40,
      color: "#f00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Software Programming",
      population: 60,
      color: "#0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
     {
      name: "Backend Developer",
      population: 40,
      color: "#f00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Frontend Developer",
      population: 60,
      color: "#0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }, 
    {
      name: "Other",
      population: 60,
      color: "#0f0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PieChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={{
          color: () => `#fff`,
        }}
        accessor={"population"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 10]} // daha ortalı görünmesi için
        hasLegend={true}
        
      />
    </View>
  );
}
