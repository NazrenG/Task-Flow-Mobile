import { View, Text } from "react-native";
<<<<<<< HEAD
import Login from "../auth/login";

=======
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useState } from "react";
>>>>>>> 4460fe2c91271780dce008b7102d199ad9396d44
export default function Friends() {
   const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");

  return (
<<<<<<< HEAD
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>

      <Text style={{ color: "black" }}>Friend Screen</Text>
    </View>
=======
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
  
           <Header onSearch={setSearchText} />
       <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: 24 }}>{t("language")}</Text> 
                <Text style={{ color: "black" }}>Friend Screen</Text>
        </View>
      </View>
>>>>>>> 4460fe2c91271780dce008b7102d199ad9396d44
  );
}
