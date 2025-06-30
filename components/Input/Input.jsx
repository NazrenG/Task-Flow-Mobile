import { TextInput, View, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const Input = ({ placeholder, keyboardType = "default", style, ...rest }) => {
  return (
    <View
      style={{
        backgroundColor: "#e5e7eb", 
        paddingHorizontal: 24,      
        paddingVertical: 4,        
        width: width * 0.9,         
        alignSelf: "center",
        marginBottom: 16,          
        borderRadius: 8,            
        ...style,
      }}
    >
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#555"
        keyboardType={keyboardType}
        style={{
          fontSize: 16,
          color: "#000",
          textAlign: "left",
        }}
        {...rest}
      />
    </View>
  );
};

export default Input;
