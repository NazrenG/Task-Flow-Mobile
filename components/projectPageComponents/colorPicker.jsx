import { Pressable, View } from "react-native";
import { Colors } from "../../constants/Colors";

const colors = [
  Colors.primary.navyBlue,
  Colors.primary.green,
  Colors.primary.yellow,
  Colors.primary.seafoamGreen,
  Colors.primary.orange,
  Colors.primary.darkPurple,
];

export default function ColorPicker({ selectedColor, onColorSelected }) {
  // const [selectedColor, setSelectedColor] = useState(null);

  return (
    <View className="flex-row flex-wrap gap-3 p-4">
      {colors.map((color, index) => (
        <Pressable
          key={index}
          onPress={() => onColorSelected(color)}
          className={`w-10 h-10 rounded-md border-2 ${
            selectedColor === color ? "border-black" : "border-transparent"
          }`}
          style={{ backgroundColor: color }}
        />
      ))}
    </View>
  );
}
