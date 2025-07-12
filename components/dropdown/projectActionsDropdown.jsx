import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import EditProjectModal from "../projectPageComponents/editProjectModal";
import UserSelectorModal from "../projectPageComponents/selectPeople";
///bura id oturulmelidi
export default function ProjectActionsDropdown() {
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [membersModalVisible, setMembersModalVisible] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const { t } = useTranslation();

  const menuOptions = [
    t("project.edit"),
    t("project.selectUsers"),
    t("project.delete"),
  ];

  const handleDelete = () => {
    Toast.show({
      type: "success",
      text1: t("project.toast.deleteProject"),
      position: "bottom",
      visibilityTime: 3000,
    });
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
        handleDelete();
        break;

      default:
        break;
    }
  };

  return (
    <View className="relative items-end">
      {/* 3-dot menu button */}
      <Pressable onPress={() => setOpenMenu(!openMenu)} className="p-2">
        <Entypo name="dots-three-horizontal" size={24} color="black" />
      </Pressable>

      {/* Dropdown menu */}
      {openMenu && (
        <View className="absolute bottom-full right-0 mt-2 w-40 bg-white border rounded-md shadow-md z-50">
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
              <Text className="text-gray-700 text-sm">{option}</Text>
            </Pressable>
          ))}
        </View>
      )}
      <EditProjectModal
        modalVisible={editModalVisible}
        setModalVisible={setEditModalVisible}
      ></EditProjectModal>
      <UserSelectorModal
        visible={membersModalVisible}
        onClose={setMembersModalVisible}
      ></UserSelectorModal>
    </View>
  );
}
