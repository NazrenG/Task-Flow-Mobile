import { View, Text } from "react-native";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useState } from "react";
export default function Notification() {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  return (
     <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  
           <Header onSearch={setSearchText} />
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 24 }}>{t("language")}</Text> 
                <Text style={{ color: "black" }}>Notification Screen</Text>
        </View>
      </View>
  );
}
