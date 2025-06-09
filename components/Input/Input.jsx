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

const Input = ({ placeholder, keyboardType = "default", style, ...rest }) => {
  return (
    <View className="bg-gray-200 rounded-full px-6 py-4 w-[90%] self-center mb-4">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#555"
        className="text-base text-black text-center"
        keyboardType={keyboardType}
       
        {...rest}
      />
    </View>
  );
};

export default Input;