import React, {useState,useEffect} from "react";
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
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import firebase from "../database/firebase";
import QueueClinic from "../component/QueueClinic";


const QueueAppoint = ({ route, navigation }) => {
  const [queueclinic_list, setQueueclinicList] = useState([]);
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
      const { ClinicID, Date, OwnerID, PetID, Status, StatusClinic, Time } = res.data();
      all_data.push({
        key: res.id,
        ClinicID,
        Date,
        OwnerID,
        PetID,
        Status,
        StatusClinic,
        Time
      });
    });

    setQueueclinicList(all_data);
  };

  useEffect(() => {
    const unsubscribe = firebase.firestore()
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


  const FirstRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} typeclinicstatus="รอการยืนยัน"/>
    </View>
  );

  const SecondRoute = () => (
      <View className="flex-1 bg-white-100 items-center">
        <QueueClinic queuedata={queueclinic_list} navigation={navigation} typeclinicstatus="นัดหมาย"/>
      </View>
  );

  const ThirdRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} typeclinicstatus="สำเร็จ"/>
    </View>
  );

  const FourthRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} typeclinicstatus="เลื่อนนัด"/>
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
  upcoming_box: {
    flexDirection: "row",
    borderRadius: 20,
    height: 150,
    padding: 10,
    alignItems: "center",
    width: "90%",
  },
  alllist: {
    width: '100%',
    alignItems: 'center'
  },
  infoappoint: {
    flex: 7,
    paddingLeft: 10,
  },
  picappoint: {
    flex: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingRight: 5,
  },
  piconappoint: {
    width: "auto",
    height: "85%",
  },
  txtinfoappoint: {
    lineHeight: 24,
    paddingVertical: 4,
  },
  container_button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    alignContent: "center",
  },
  eachbox: {
    backgroundColor: "#F9F9F9", 
    marginVertical: 20,
    borderRadius: 20,
    elevation: 10
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 0,
    objectFit: "contain",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10
  },
});

export default QueueAppoint;
