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
import QueueClinic from "../component/QueueClinic";
import { useAuth } from "../Auth/AuthContext";
import firebase from "../database/firebase";



const QueueAppoint = ({ route, navigation }) => {
  const [queueclinic_list, setQueueclinicList] = useState([]);
  const [dbowner, setDbowner] = useState("");
  const [fullname, setfullname] = useState("");
  const [dbownerphone, setDbownerphone] = useState("");
  const [dbpet, setDbpet] = useState("");
  const [dbpetType, setDbpetType] = useState("");
  const [dbpetDetail, setDbpetDetail] = useState("");
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "รอยืนยัน" },
    { key: "second", title: "นัดหมาย" },
    { key: "third", title: "ประวัติ" },
    { key: "fourth", title: "เลื่อนนัด" },
  ]);
  const { user, role, isAuthenticated, login, logout } = useAuth();
  console.log(user.uid)

  const getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      const { ClinicID, Date, OwnerID, PetID, Status, StatusClinic, Time } = res.data();
      if (ClinicID === user.uid) {
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
      }
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

  if (queueclinic_list.length > 0) {
    const ownerName = firebase.firestore()
    .collection("Owner")
    .doc(queueclinic_list[0].OwnerID);
    ownerName.get().then((res) => {
    if (res.exists) {
      const owner = res.data();
      setDbowner(owner.firstName);
      setDbownerphone(owner.phone);
      setfullname(owner.firstName + " " + owner.lastName)
      console.log(dbowner + " " + dbownerphone)
    } else {
      console.log("Document does not exist!!");
    }
  });

  const PetName = firebase.firestore()
  .collection("Pet")
  .doc(queueclinic_list[0].PetID);
  PetName.get().then((res) => {
  if (res.exists) {
    const petname = res.data();
    setDbpet(petname.PetType);
    setDbpetType(petname.Type)
    setDbpetDetail(petname.Detail)
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


  const FirstRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} ownername={dbowner} ownerphone={dbownerphone} pettypecatordog={dbpet} typeof={dbpetType} detailpet={dbpetDetail} fullnameowner={fullname}  typeclinicstatus="รอการยืนยัน"/>
    </View>
  );

  const SecondRoute = () => (
      <View className="flex-1 bg-white-100 items-center">
        <QueueClinic queuedata={queueclinic_list} navigation={navigation} ownername={dbowner} ownerphone={dbownerphone} pettypecatordog={dbpet} typeof={dbpetType} detailpet={dbpetDetail} fullnameowner={fullname} typeclinicstatus="นัดหมาย"/>
      </View>
  );

  const ThirdRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} ownername={dbowner} ownerphone={dbownerphone} pettypecatordog={dbpet} typeof={dbpetType} detailpet={dbpetDetail} fullnameowner={fullname} typeclinicstatus="สำเร็จ"/>
    </View>
  );

  const FourthRoute = () => (
    <View className="flex-1 bg-white-100 items-center">
      <QueueClinic queuedata={queueclinic_list} navigation={navigation} ownername={dbowner} ownerphone={dbownerphone} pettypecatordog={dbpet} typeof={dbpetType} detailpet={dbpetDetail} fullnameowner={fullname} typeclinicstatus="เลื่อนนัด"/>
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
