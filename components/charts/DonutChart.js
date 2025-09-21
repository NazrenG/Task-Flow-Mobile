import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle, G, Path } from "react-native-svg";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import {fetchOccupationStatistics} from "../../utils/quizUtils";

const DonutSlice = ({ startAngle, endAngle, color }) => {
  const radius = 80;
  const cx = 120;
  const cy = 90;

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  const startX = cx + radius * Math.cos((Math.PI * startAngle) / 180);
  const startY = cy + radius * Math.sin((Math.PI * startAngle) / 180);
  const endX = cx + radius * Math.cos((Math.PI * endAngle) / 180);
  const endY = cy + radius * Math.sin((Math.PI * endAngle) / 180);

  const pathData = [
    `M ${startX} ${startY}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
    `L ${cx} ${cy}`,
    "Z",
  ].join(" ");

  // stroke="#fff"
  return <Path d={pathData} fill={color}  strokeWidth={2} />;
};

export default function  DonutChart() {

  const { theme } = useTheme();
 const [data, setData] = React.useState([]);  

  const fetchData = async () => {
    try {
      const response = await fetchOccupationStatistics();  
      const chartData = response.map((item, index) => ({
        name: item.occupationName,
        value: item.percentage,
        color: colors[index % colors.length],
      }));
      setData(chartData);
    } catch (error) {
      console.error("Error fetching occupation statistics:", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);  
  
  const total = data.reduce((sum, d) => sum + d.value, 0); 
  let cumulativeAngle = 0;

  const colors = [
    "#3C21F7",
    "#00BC8B",
    "#FFB800",
    "#00ECCC",
    "#EF7F5A",
    "#5D45FB",
    "#6c757d",
  ];

  if (data.length === 0) return <Text>Loading chart...</Text>;

 
return (
    <View style={styles.container}>
      <View>
        <Svg width={190} height={240}>
          <G rotation="-90" origin="110, 120">
            {data.map((slice, index) => {
              const angle = (slice.value / total) * 360;
              const startAngle = cumulativeAngle;
              const endAngle = cumulativeAngle + angle;
              cumulativeAngle += angle;

              return (
                <DonutSlice
                  key={index}
                  startAngle={startAngle}
                  endAngle={endAngle}
                  color={slice.color}
                />
              );
            })}
          </G>
          <Circle cx="80" cy="110" r="40" fill={Colors[theme].card} />
        </Svg>
      </View>

      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.colorBox, { backgroundColor: item.color }]} />
            <Text style={[styles.legendText, { color: Colors[theme].text }]}>
              {item.name} — {item.value.toFixed(1)}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
 
  legendContainer: {
    justifyContent: "center",
    gap: 6,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBox: {
    width: 13,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 13,
   
  },
});
