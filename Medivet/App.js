import React from "react";
import { StyleSheet } from "react-native";

// import คอมโพเนนต์ที่จำเป็น


import MyNavigator from "./navigation/MyNavigator.js";

import Allclinic from "./screens/Allclinic.js";
import { AuthProvider } from "./Auth/AuthContext.js";

export default function App() {
  // เพิ่มโค้ดส่วนนี้ เพื่อจัดการ Stack Navigation
  return (

    <AuthProvider>
      <MyNavigator></MyNavigator>
         
      {/* <QueueAppoint/> */}
      {/* <Allclinic></Allclinic> */}
  
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
