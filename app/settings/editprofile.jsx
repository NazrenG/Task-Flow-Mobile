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
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Header from "../../components/Header";

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
  const [form, setForm] = useState(defaultData);
  const [avatar, setAvatar] = useState(defaultData.avatar);
  const [backgroundImage] = useState(require('../../assets/images/page.jpg'));
  const { t } = useTranslation();
  const scrollViewRef = useRef(null);
  const [inputPositions, setInputPositions] = useState({});

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

  const [calendarVisible, setCalendarVisible] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      
      <Header />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back-ios" size={24} color="#333" />
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
              <TouchableOpacity style={styles.headerCamera} onPress={pickImage}>
           <MaterialIcons  name="edit" size={20} color="black" />
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.profileImageContainer}>
              <View style={styles.profileImageWrapper}>
                <Image
                  source={avatar}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>
              <TouchableOpacity style={styles.profileCamera} onPress={pickImage}>
                <MaterialIcons  name="edit" size={20} color="black" />
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
                <Text style={styles.label}>{label}</Text>
                <TextInput
                  style={styles.input}
                  value={form[key]}
                  onChangeText={(text) => handleChange(key, text)}
                  placeholder={label}
                  placeholderTextColor="#aaa"
                  onFocus={() => handleFocus(key)}
                />
              </View>
            ))}

            {/* 🗓️ Birthday Input with Calendar Popup */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("profile.birthDate")}</Text>
              <TouchableOpacity
                onPress={() => setCalendarVisible(true)}
                style={[styles.input, { justifyContent: 'center' }]}
              >
                <Text style={{ color: form.birthday ? '#111' : '#aaa', fontSize: 16 }}>
                  {form.birthday ? new Date(form.birthday).toLocaleDateString() : t("profile.birthDate")}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>
                {t("settings.save") || "Save"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* 🗓️ Calendar Modal */}
      <Modal visible={calendarVisible} transparent animationType="slide">
        <View style={styles.calendarModal}>
          <Calendar
            onDayPress={(day) => {
              handleChange('birthday', day.dateString);
              setCalendarVisible(false);
            }}
            markedDates={{
              [form.birthday]: {
                selected: true,
                selectedColor: '#6852ff'
              }
            }}
            maxDate={new Date().toISOString().split('T')[0]}
          />
          <TouchableOpacity onPress={() => setCalendarVisible(false)} style={{ padding: 10, alignItems: 'center' }}>
            <Text style={{ color: "#6852ff", fontWeight: "bold" }}>Bağla</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 100,
    left: 20,
    zIndex: 2,
    padding: 6,
    borderRadius: 999,
  },
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
    backgroundColor: "white",
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
    backgroundColor: "white",
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
    backgroundColor: "white",
    padding: 6,
    borderRadius: 999,
    elevation: 3,
  },
  formContainer: {
    marginTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 40,
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 2,
  },
  inputGroup: {
    marginBottom: 14,
  },
  label: {
    marginBottom: 6,
    fontWeight: "500",
    color: "#444",
  },
  input: {
    backgroundColor: "#f5f5f5",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: "#111",
  },
  saveButton: {
    marginTop: 24,
    backgroundColor: "#6852ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  calendarModal: {
    backgroundColor: "#fff",
    margin: 20,
    marginTop: 100,
    borderRadius: 10,
    padding: 10,
    elevation: 10,
  },
});
