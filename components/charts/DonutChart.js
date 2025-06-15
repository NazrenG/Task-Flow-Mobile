import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg";

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

  return <Path d={pathData} fill={color} stroke="#fff" strokeWidth={2} />;
};

export default function  DonutChart() {
  const data = [
    { name: "IT", value: 10, color: "#ef7f5a" },
    { name: "Design", value: 20, color: "#00BC8B" },
    { name: "HR", value: 30, color: "#FFB800" },
    { name: "Frontend", value: 25, color: "#5D45FB" },
    { name: "Other", value: 15, color: "#6C757D" },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0); 
  let cumulativeAngle = 0;

  return (
    <View style={styles.container}>
      {/* Chart */}
      <View>
        <Svg width={190} height={240}>
          <G rotation="-90" origin="120, 120">
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
          {/* İç boşluq */}
          <Circle cx="90" cy="120" r="40" fill="white" />
        </Svg> 
      </View>

      {/* Legend sağda */}
      <View style={styles.legendContainer}>
        {data.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);
          return (
            <View key={index} style={styles.legendItem}>
              <View
                style={[styles.colorBox, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText}>
                {item.name} — {percent}%
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",  
    justifyContent:"flex-start", 
    gap: 2, 
  },
 
  legendContainer: {
    justifyContent: "center",
    gap: 5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
  },
});
