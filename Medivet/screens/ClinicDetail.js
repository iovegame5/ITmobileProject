// import แบบ react-native
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
  Pressable,
  Platform,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import Dropdown from "react-native-input-select";
import DateTimePicker from "@react-native-community/datetimepicker";

const Clinicdetail = ({route, navigation}) => {
  const [dateOfbirth, setDateOfBirth] = useState("");
  const [country, setCountry] = React.useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };
  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }
  };

  return (
    <SafeAreaView style={styles.center}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.img}>
            <Image
              style={{ width: 250, height: 250 }}
              source={require("../pics/channels4_profile.jpg")}
            />
          </View>

          <SafeAreaView style={styles.layout}>
            <View style={styles.form}>
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                ชื่อคลนิก:{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                ที่อยู่:{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                เบอร์โทร:{" "}
              </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  width: 385,
                  marginTop: 20,
                }}
              />
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                ชื่อสัตว์แพทย์:{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                ประวัติการศึกษา:{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                อายุ:{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                ประสบการณ์:{" "}
              </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  width: 385,
                  marginTop: 20,
                }}
              />
              <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 10 }}>
                {" "}
                เวลาทำการ:{" "}
              </Text>
              <View style={{flexDirection: "row", width: 200}}>
              <Text style={{fontSize: 15, marginLeft: 10, marginTop: 10}}>Mon-Fri</Text>
              <Text style={{fontSize: 13, marginLeft: 15, marginTop: 13, marginLeft: 30}}>Morning 8.00 am -2.00 am </Text>
              </View>
              <Text style={{fontSize: 13,  marginTop: 10, marginLeft : 90}}>Evening  6.00 am -10.00 am </Text>
              <View
                style={{
                  borderBottomColor: "black",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  width: 385,
                  marginTop: 20,
                }}
              />
              <View style={{marginTop: 10}}>
              <Button  color="#87D8C3" title="Book an Appointment" onPress={() => navigation.navigate("FormAppointment", {todo: "addQueue"})} />
              </View>
            </View>
            
            
          </SafeAreaView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAF1E4",
  },
  img: {
    width: 250,
    height: 260,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    backgroundColor: "white",
    width: 420,
    height: 550,
    marginTop: 10,
    borderRadius: 20,
    alignItems: "stretch",
  },
  input: {
    height: 40,
    margin: 4,
    borderWidth: 1,
    padding: 10,
    width: 190,
  },
  form: {
    width: 380,
    height: 500,
    backgroundColor: "white",
    marginLeft: 10,
    marginTop: 10,
  },
  center: {
    alignItems: "center",
  },
});

export default Clinicdetail;
