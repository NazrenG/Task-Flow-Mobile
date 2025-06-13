import { Text, View } from "react-native";
import CalendarDropdown from "../../components/DropDown";
import Header from "../../components/Header";
import { useState } from "react";

import { useTranslation } from "react-i18next";
import ProfileScreen from "../profile";

export default function Calendar() {
  
    const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  return (
      <>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

         <Header onSearch={setSearchText} />
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 24 }}>{t("welcome")}</Text> 
             <Text style={{ color: "black" }}>Dashboard Screen</Text>
          </View>
    </View>
    </>
  );
}
