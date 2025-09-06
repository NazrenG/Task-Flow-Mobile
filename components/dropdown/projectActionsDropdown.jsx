import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "../../components/ThemeContext";
import { Colors } from "../../constants/Colors";
import { fetchDeleteProject } from "../../utils/fetchUtils";
import EditProjectModal from "../projectPageComponents/editProjectModal";
import UserSelectorModal from "../projectPageComponents/selectPeople";

///bura id oturulmelidi
export default function ProjectActionsDropdown({ projectId }) {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [membersModalVisible, setMembersModalVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigation = useNavigation();

  const { t } = useTranslation();
  const { theme } = useTheme();

  const menuOptions = [
    t("project.edit"),
    t("project.selectUsers"),
    t("project.viewDetails"),
    t("project.delete"),
  ];

  const handleDelete = async () => {
    const response = await fetchDeleteProject(projectId);
    if (response) {
      Toast.show({
        type: "success",
        text1: t("project.toast.success.deleteProject"),
        position: "bottom",
        visibilityTime: 3000,
      });
    }
  };
  const handleEdit = () => {
    Toast.show({
      type: "success",
      text1: t("project.toast.success.editProject"),
      position: "bottom",
      visibilityTime: 3000,
    });
  };

  const handleChoice = (id) => {
    console.log("in handle choice");
    switch (id) {
      case 0:
        setEditModalVisible(true);
        break;
      case 1:
        setMembersModalVisible(true);
        break;
      case 2:
        navigation.navigate("project/projectDetailsPage", { id: projectId });
        break;
      case 3:
        handleDelete();
        break;

      default:
        break;
    }
  };
  console.log("project id in dropdown: " + projectId);
  return (
    <View className="relative items-end">
      {/* 3-dot menu button */}
      <Pressable onPress={() => setOpenMenu(!openMenu)} className="p-2">
        <Entypo
          name="dots-three-horizontal"
          size={24}
          style={{ color: Colors[theme].text }}
        />
      </Pressable>

      {/* Dropdown menu */}
      {openMenu && (
        <View
          className="absolute bottom-full right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-[250]"
          style={{ backgroundColor: Colors[theme].card }}
        >
          {menuOptions.map((option, idx) => (
            <Pressable
              key={idx}
              onPress={() => {
                handleChoice(idx);
                setOpenMenu(false);
                console.log(`Selected: ${option}`);
              }}
              className="px-4 py-2 border-b last:border-b-0"
            >
              <Text
                className="text-gray-700 text-sm"
                style={{ color: Colors[theme].text }}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      )}
      <EditProjectModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
        projectId={projectId}
      ></EditProjectModal>
      <UserSelectorModal
        visible={membersModalVisible}
        onClose={setMembersModalVisible}
        projectID={projectId}
      ></UserSelectorModal>
    </View>
  );
}
