// import { TextInput, View } from "react-native";

// const Input = ({ placeholder, keyboardType = "default", ...rest }) => {
//     return (
//       <>

//             <View className="bg-gray-200  px-6 py-4 w-[90%] self-center mb-4">
//       <TextInput
//         placeholder={placeholder}
//         placeholderTextColor="#555"
//         className="text-base text-black font-center"

//         {...rest}
//       />

//     </View>

//       </>
//   );
// };

// export default Input;
import { TextInput, View } from "react-native";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";

const ProjectInput = ({
  placeholder,
  style,
  keyboardType = "default",
  ...rest
}) => {
  const { theme } = useTheme();

  return (
    <View
      className="rounded-lg py-1 px-2 w-[90%] mb-1"
      style={{
        borderWidth: 1,
        borderColor: Colors[theme].border ,
        backgroundColor: Colors[theme].backgroundSecondary ,
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors[theme].placeholder }
        className="text-base"
        style={{
          color: Colors[theme].text,
          textAlign: "left",
        }}
        keyboardType={keyboardType}
        {...rest}
      />
    </View>
  );
};

export default ProjectInput;
