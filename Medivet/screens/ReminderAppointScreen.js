import React from "react";
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
  TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import QueueOwner from "../components/QueueOwner";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const FirstRoute = () => (
  <View className="flex-1 bg-white-100 items-center">
    <QueueOwner></QueueOwner>
  </View>
);

const SecondRoute = () => (
  <View className="flex-1 bg-white-100" />
);

const ThirdRoute = () => (
  <View className="flex-1 bg-white-100"></View>
);

const FourthRoute = () => (
  <View className="flex-1 bg-white-100"></View>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
  fourth: FourthRoute
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: "#379895" }}
    style={{ backgroundColor: "white" }}
    labelStyle={{ color: "black" }}
    activeColor="#379895"
  />
);

const ReminderAppoint = ({ route, navigation }) => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "รอยืนยัน" },
    { key: "second", title: "นัดหมาย" },
    { key: "third", title: "ประวัติ" },
    {key: "fourth", title: "เลื่อนนัด"}
  ]);

  return (
    <View style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
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
