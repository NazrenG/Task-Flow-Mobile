import { Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image, ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Header from "../../components/Header";

const selectItem = {
  avatar: require('../../assets/images/default-user.png'),
  username: 'sevgi',
  email: 'sevgi.elesgerova@gmail.com',
  fullName: 'Sevgi Alasgarova',
  phone: '0559717465',
  department: 'Other (please specify)',
  country: 'Azerbaijan',
  gender: '',
  birthday: '',
};

export default function ProfileScreen() {
  const [searchText, setSearchText] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(require('../../assets/images/page.jpg'));
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header onSearch={setSearchText} />

      <View className="relative">
        <TouchableOpacity
          className="absolute top-6 left-5 z-10"
          onPress={() => navigation.navigate('(tabs)')}
        >
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>

        <ImageBackground
          source={backgroundImage}
          className="w-full h-60 justify-end items-center"
          resizeMode="cover"
        >
          <TouchableOpacity className="absolute top-6 right-5 z-10">
            <Feather name="settings" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity className="absolute bottom-4 right-5 p-2 rounded-full shadow z-10">
            <Feather name="camera" size={20} color="black" />
          </TouchableOpacity>
        </ImageBackground>

        <View className="absolute -bottom-16 left-1/2 -translate-x-1/2 z-20">
          <View className="w-32 h-32 rounded-full bg-white justify-center items-center overflow-hidden shadow-xl">
            <Image
              source={selectItem.avatar}
              className="w-28 h-28"
              resizeMode="cover"
            />
          </View>

          <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-1 rounded-full shadow">
            <Feather name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-20 items-center">
        <Text className="text-xl font-bold text-black">{selectItem.username}</Text>
        <Text className="text-base text-gray-600">{selectItem.email}</Text>
      </View>

      <View className="bg-white rounded-2xl shadow p-6 mx-4 mt-6 z-10">
        <Text className="text-lg font-bold text-black mb-4">Personal Info</Text>

        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Full Name: </Text>{selectItem.fullName}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Email: </Text>{selectItem.email}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Phone Number: </Text>{selectItem.phone}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Department: </Text>{selectItem.department}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Country: </Text>{selectItem.country}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Gender: </Text>{selectItem.gender || '—'}
        </Text>
        <Text className="text-base text-gray-500 mb-1">
          <Text className="font-bold text-black">Birthday: </Text>{selectItem.birthday || '—'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
