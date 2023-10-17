import React, { Component } from "react";
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
import {FIREBASE_APP} from "../database/firebaseDB";


class ReminderAppoint extends Component {
  constructor(props) {
    super(props);
    this.queueOwner = FIREBASE_APP.firestore().collection("Appointment");
    this.state = {
      queueowner_list: [],
      index: 0,
      routes: [
        { key: "first", title: "รอยืนยัน" },
        { key: "second", title: "นัดหมาย" },
        { key: "third", title: "ประวัติ" },
        { key: "fourth", title: "เลื่อนนัด" },
      ]
    };
    
  }
  
  getCollection = (querySnapshot) => {
    
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
        Time
      });
    });
    // console.log("all_data : ", all_data);
    
    this.setState({
      queueowner_list: all_data
    });
  };


  componentDidMount() {
    this.unsubscribe = this.FIREBASE_APP.onSnapshot(this.getCollection);
  };

  componentWillUnmount() {
    this.unsubscribe();
  };


  render() {
    function FirstRoute() {
      return (
      <View className="flex-1 bg-white-100 items-center"></View>
      );
    }
    
    function SecondRoute() {
      return (
        <View className="flex-1 bg-white-100 items-center">
        <QueueOwner></QueueOwner>
      </View>
      );
    };
    
    function ThirdRoute() {
      return (
        <View className="flex-1 bg-white-100 items-center"></View>
      );
    };
    
    function FourthRoute() {
      return (
        <View className="flex-1 bg-white-100 items-center"></View>
      );
    }; 


    return (
      <View style={{ flex: 1 }}>
        <TabView
          navigationState={this.state}
          renderScene={SceneMap({
            first: FirstRoute,
            second: SecondRoute,
            third: ThirdRoute,
            fourth: FourthRoute,
          })}
          onIndexChange={(index) => this.setState({ index })}
          renderTabBar={(props) => this.renderTabBar(props)}
          initialLayout={{ width: useWindowDimensions().width }}
        />
      </View>
    );
  }

  renderTabBar = (props) => {
    return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#379895" }}
      style={{ backgroundColor: "white" }}
      labelStyle={{ color: "black" }}
      activeColor="#379895"
    />
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  alllist: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 0,
    objectFit: "contain",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default ReminderAppoint;
