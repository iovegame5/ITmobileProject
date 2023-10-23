import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  Linking,
  ScrollView,
  Button,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import QueueOwner from "../component/QueueOwner";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import firebase from "../database/firebase";

const ReminderAppoint = ({ route, navigation }) => {
  const [queueowner_list, setQueueownerList] = useState([]);
  const [dbclinic, setDbclinic] = useState("");
  const [dbpet, setDbpet] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "รอยืนยัน" },
    { key: "second", title: "นัดหมาย" },
    { key: "third", title: "ประวัติ" },
    { key: "fourth", title: "เลื่อนนัด" },
  ]);

  const getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      const { ClinicID, Date, OwnerID, PetID, Status, Time, StatusClinic } = res.data();
      all_data.push({
        key: res.id,
        ClinicID,
        Date,
        OwnerID,
        PetID,
        Status,
        Time,
        StatusClinic
      });
    });

    setQueueownerList(all_data);
  };


  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection("Appointment")
      .onSnapshot(getCollection);
    
    return () => {
      unsubscribe();
    };
  }, []);

  if (queueowner_list.length > 0) {
    const clinicName = firebase.firestore()
    .collection("Clinic")
    .doc(queueowner_list[0].ClinicID);
    clinicName.get().then((res) => {
    if (res.exists) {
      const clinicname = res.data();
      setDbclinic(clinicname.name);
      console.log(dbclinic)
    } else {
      console.log("Document does not exist!!");
    }
  });

  const PetName = firebase.firestore()
  .collection("Pet")
  .doc(queueowner_list[0].PetID);
  PetName.get().then((res) => {
  if (res.exists) {
    const petname = res.data();
    setDbpet(petname.Name);
    console.log(dbpet)
  } else {
    console.log("Document does not exist!!");
  }
});
  }



  

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: "#379895" }}
        style={{ backgroundColor: "white" }}
        labelStyle={{ color: "black" }}
        activeColor="#379895"
      />
    );
  };


  const FirstRoute = () => {
  return (
    <View className="flex-1 bg-white-100 items-center">
      <QueueOwner queuedata={queueowner_list} clinicname={dbclinic} petname={dbpet} navigation={navigation} typestatus="รอการยืนยัน"></QueueOwner>
    </View>
  );
}
  const SecondRoute = () =>{
  return (
    <View className="flex-1 bg-white-100 items-center">
      <QueueOwner queuedata={queueowner_list} clinicname={dbclinic} petname={dbpet} navigation={navigation} typestatus="นัดหมาย"></QueueOwner>
    </View>

  );}

  const ThirdRoute = () => {
  return (
    <View className="flex-1 bg-white-100 items-center">
      <QueueOwner queuedata={queueowner_list} clinicname={dbclinic} petname={dbpet} navigation={navigation} typestatus="สำเร็จ"></QueueOwner>
    </View>
  );
}
  const FourthRoute = () => {
  return (
    <View className="flex-1 bg-white-100 items-center">
      <QueueOwner queuedata={queueowner_list} clinicname={dbclinic} petname={dbpet} navigation={navigation} typestatus="เลื่อนนัด"></QueueOwner>
    </View>
  );
}

  const layout = useWindowDimensions();

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
          fourth: FourthRoute,
        })}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
        initialLayout={{ width: layout.width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ReminderAppoint;
