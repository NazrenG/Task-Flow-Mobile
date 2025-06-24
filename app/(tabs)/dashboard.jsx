import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

export default function Dashboard() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const goToProjectPage = () => {
    navigation.navigate("project/projectPage");
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Header onSearch={setSearchText} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {/* <Text style={{ fontSize: 24 }}>{t("welcome")}</Text> 
         <Text style={{ color: "black" }}>Dashboard Screen</Text> */}
      </View>
    </View>
  );
}
