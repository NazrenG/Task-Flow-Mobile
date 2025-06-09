import LottieView from "lottie-react-native";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input"; // Assuming your Input component is in this path


const Login = () => {
     const width = Dimensions.get("window").width;
      const height = Dimensions.get("window").height;
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

    return (
      <>
      
      
    <View className="flex-1 justify-center bg-white items-center p-5">
                <Text className="text-3xl font-bold text-center mb-10">Welcome back!</Text>
                
                    <LottieView
                          source={require("../../assets/animations/loginAnimation.json")}
                          autoPlay
                          loop
                          style={{ width:250, height: 250 }}
                        />
      
      <Input
        placeholder="Enter your Username"
        value={username}
        onChangeText={setUsername}
      />

    

      <Input
        placeholder="Enter your Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      
      {/* Araya boşluq əlavə et */}
     

    
      
      <TouchableOpacity
        onPress={() => {
          router.push("/quiz");
        }}
        className="bg-dark_violet justify-center items-center rounded-full p-4"
        style={{ width: width - 40, marginBottom: 20 }}
      >
        <Button text="Get Started" />
      </TouchableOpacity>
                <Text className="text-gray-600 px-30">Already a member? </Text>
                <Text className="text-gray-600 px-30"  href='/register'>Sign Up </Text>
       
    
          
    </View>
      </>
  );
};

export default Login;