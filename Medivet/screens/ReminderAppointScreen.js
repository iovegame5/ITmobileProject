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
import QueueOwner from "../components/QueueOwner";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FIREBASE_APP } from "../database/firebaseDB";

const ReminderAppoint = ({ route, navigation }) => {
  const [queueowner_list, setQueueownerList] = useState([]);
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
      const { ClinicID, Date, OwnerID, PetID, Status, Time } = res.data();
      all_data.push({
        key: res.id,
        ClinicID,
        Date,
        OwnerID,
        PetID,
        Status,
        Time,
      });
    });

    setQueueownerList(all_data);
  };

  useEffect(() => {
    const unsubscribe = FIREBASE_APP.firestore()
      .collection("Appointment")
      .onSnapshot(getCollection);

    return () => {
      unsubscribe();
    };
  }, []);

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

  console.log(queueowner_list)

  const FirstRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
          <QueueOwner queuedata={queueowner_list} navigation={navigation} typestatus="รอการยืนยัน"></QueueOwner>
    </View>
  );

  const SecondRoute = () => (
      <View className="flex-1 bg-white-100 items-center">
        <QueueOwner queuedata={queueowner_list} navigation={navigation} typestatus="นัดหมาย"></QueueOwner>
      </View>
    
  );

  const ThirdRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
       <QueueOwner></QueueOwner>
    </View>
  );

  const FourthRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
       <QueueOwner></QueueOwner>
    </View>
  );

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
