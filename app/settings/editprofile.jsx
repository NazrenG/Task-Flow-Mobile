import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../components/Button/Button";
import Header from "../../components/Header";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from '../../constants/Colors';

const { width, height } = Dimensions.get("window");

const defaultData = {
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

export default function EditProfileScreen() {
  const { theme } = useTheme();
  const [form, setForm] = useState(defaultData);
  const [avatar, setAvatar] = useState(defaultData.avatar);
  const [backgroundImage] = useState(require('../../assets/images/page.jpg'));
  const [searchText, setSearchText] = useState("");
  const { t } = useTranslation();
  const scrollViewRef = useRef(null);
  const [inputPositions, setInputPositions] = useState({});
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const onInputLayout = (key, event) => {
    const { y } = event.nativeEvent.layout;
    setInputPositions((prev) => ({ ...prev, [key]: y }));
  };

  const handleFocus = (key) => {
    if (inputPositions[key] !== undefined) {
      scrollViewRef.current?.scrollTo({
        y: inputPositions[key] - 20,
        animated: true,
      });
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission denied", "We need permission to access your gallery.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setAvatar({ uri: selectedUri });
    }
  };

  const handleSave = () => {
    Alert.alert("Profiliniz yeniləndi.");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors[theme].background }}>
      <Header onSearch={setSearchText} />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 100,
          left: 20,
          zIndex: 2,
          padding: 6,
          borderRadius: 999,
        }}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color={Colors[theme].card} />
      </TouchableOpacity>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          <View style={{ position: "relative" }}>
            <ImageBackground
              source={backgroundImage}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <TouchableOpacity
                style={[styles.headerCamera, { backgroundColor: Colors[theme].card }]}
                onPress={pickImage}
              >
                <MaterialIcons name="edit" size={20} color={Colors[theme].text} />
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.profileImageContainer}>
              <View style={[styles.profileImageWrapper, { backgroundColor: Colors[theme].card }]}>
                <Image
                  source={avatar}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity
                style={[styles.profileCamera, { backgroundColor: Colors[theme].card }]}
                onPress={pickImage}
              >
                <MaterialIcons name="edit" size={20} color={Colors[theme].text} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            {[
              ["fullName", t("profile.fullname")],
              ["email", t("profile.email")],
              ["phone", t("profile.phone")],
              ["department", t("profile.department")],
              ["country", t("profile.country")],
              ["gender", t("profile.gender")],
            ].map(([key, label]) => (
              <View
                key={key}
                style={styles.inputGroup}
                onLayout={(event) => onInputLayout(key, event)}
              >
                <Text style={[styles.label, { color: Colors[theme].text }]}>{label}</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: Colors[theme].card, color: Colors[theme].text }]}
                  value={form[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  placeholder={label}
                  placeholderTextColor={Colors[theme].secondaryText}
                  onFocus={() => handleFocus(key)}
                />
              </View>
            ))}

            {/* Birthday Input */}
         <View style={styles.inputGroup}>
  <Text style={[styles.label, { color: Colors[theme].text }]}>{t("profile.birthDate")}</Text>
  <TouchableOpacity
    onPress={() => setDatePickerVisibility(true)}
    style={[styles.input, { backgroundColor: Colors[theme].card, justifyContent: 'center' }]}
  >
    <Text style={{ color: form.birthday ? Colors[theme].text : Colors[theme].secondaryText, fontSize: 16 }}>
      {form.birthday ? new Date(form.birthday).toLocaleDateString() : t("profile.birthDate")}
    </Text>
  </TouchableOpacity>
</View>

{/* Date Picker */}
<DateTimePickerModal
  isVisible={isDatePickerVisible}
  mode="date"
  maximumDate={new Date()}
  onConfirm={(date) => {
    handleChange("birthday", date.toISOString());
    setDatePickerVisibility(false);
  }}
  onCancel={() => setDatePickerVisibility(false)}
/>

              <TouchableOpacity
            onPress={() => router.push("/profile")}
            className="bg-dark_violet justify-center items-center rounded-full p-4"
            style={{
              width: width * 0.9, // ekranın 90%-i
              maxWidth: 400,
              marginBottom: 20,
            }}
          >
            <Button text={t("settings.save")} />
          </TouchableOpacity>

        
          </View>
        </ScrollView>
      </KeyboardAvoidingView>



{/* Birthday DatePicker Modal */}
<Modal transparent animationType="fade" visible={calendarVisible}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <View style={{ backgroundColor: Colors[theme].card, padding: 20, borderRadius: 12 }}>

      <TouchableOpacity
        onPress={() => setCalendarVisible(false)}
        style={{ marginTop: 10, alignItems: 'center' }}
      >
        <Text style={{ color: Colors[theme].primary, fontWeight: 'bold' }}>Bağla</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width,
    height: height * 0.28,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerCamera: {
    position: "absolute",
    bottom: 16,
    right: 20,
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  profileImageContainer: {
    position: "absolute",
    bottom: -64,
    left: width / 2 - 64,
    zIndex: 20,
  },
  profileImageWrapper: {
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 6,
  },
  profileImage: {
    width: 112,
    height: 112,
    borderRadius: 56,
  },
  profileCamera: {
    position: "absolute",
    bottom: 0,
    right: 0,
    padding: 6,
    borderRadius: 999,
    elevation: 3,
  },
  formContainer: {
    marginTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  calendarModal: {
    margin: 20,
    marginTop: 100,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
});
