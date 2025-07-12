import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Text, View } from "react-native";
import Header from "../../components/Header";

const width = Dimensions.get("window").width;

export default function Notification() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedButton, setSelectedButton] = useState("friend");
  // const [isReminder, setReminder] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Header onSearch={setSearchText} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24 }}>{t("language")}</Text>
        <Text style={{ color: "black" }}>Notification Screen</Text>
      </View>
    </View>
  );
}
