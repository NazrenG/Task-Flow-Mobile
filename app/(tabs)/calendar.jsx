import { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import Header from "../../components/Header";

import { useTranslation } from "react-i18next";
import ProfileScreen from "../profile";

export default function Calendar() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  return (
      <>
    <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Header onSearch={setSearchText} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24 }}>{t("language")}</Text>
        <Text style={{ color: "black" }}>Calendar Screen</Text>
      </View>
    </SafeAreaView>
    </>
  );
}
