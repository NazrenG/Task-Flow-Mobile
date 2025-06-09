import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Header from "@/components/Header"; 
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  return (
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
     
         <Header onSearch={setSearchText} />
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24 }}>{t("welcome")}</Text> 
         <Text style={{ color: "black" }}>Dashboard Screen</Text>
      </View>
    </View>
  );
}
