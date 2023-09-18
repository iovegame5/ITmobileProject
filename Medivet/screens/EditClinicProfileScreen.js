import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";

const EditProfileClinic = ({ route, navigation }) => {
  const [ClinicName, onChangeClinicName] = React.useState("");
  const [Describe, onChangeDescribe] = React.useState("");
  const [Address, onChangeAddress] = React.useState("");
  const [Name, onChangeName] = React.useState("");

  const [starttime, setStartTime] = useState(new Date());
  const [showStarttime, setShowStarttime] = useState(false);
  const [starttimetxt, onChangeStarttime] = React.useState("");

  const [endtime, setEndTime] = useState(new Date());
  const [showEndtime, setShowEndtime] = useState(false);
  const [endtimetxt, onChangeEndtime] = React.useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Petname, onChangePetname] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [number, onChangeNumber] = React.useState("");

  const [date, setDate] = useState(new Date());
  const [showdate, setShowdate] = useState(false);
  const [datetxt, onChangedatetxt] = React.useState("");

  const [Education, onChangeEdu] = React.useState("");
  const [Exp, onChangeExp] = React.useState("");

  const [opentime, setOpentime] = useState(false);
  const [valuetime, setValuetime] = useState(null);
  const [Ontime, onChangeTime] = useState([
    { label: "13:00 - 14:00", value: "13:00 - 14:00" },
    { label: "17:00 - 18:00", value: "17:00 - 18:00" },
  ]);

  const selectDate = () => {
    setShowdate(!showdate);
  };

  const selectStartTime = () => {
    setShowStarttime(!showStarttime);
  };

  const selectEndTime = () => {
    setShowEndtime(!showEndtime);
  };

  const onchange = ({ type }, selectDate) => {
    console.log(type);
    console.log(selectDate);
    if (type == "set") {
      const currentdate = selectDate;
      setDate(currentdate);

      if (Platform.OS == "android") {
        setShowdate();
        onChangedatetxt(formatDate(currentdate));
      }
    } else {
      selectDate();
    }
  };

  const onStartChange = ({ type }, selectStartTime) => {
    console.log(type);
    console.log(selectStartTime);
    if (type == "set") {
      const currenttime = selectStartTime;
      setStartTime(currenttime);

      if (Platform.OS == "android") {
        setShowStarttime();
        onChangeStarttime(formatTime(currenttime));
      }
    } else {
      selectStartTime();
    }
  };

  const onEndChange = ({ type }, selectStartTime) => {
    console.log(type);
    console.log(selectStartTime);
    if (type == "set") {
      const currenttime = selectStartTime;
      setEndTime(currenttime);

      if (Platform.OS == "android") {
        setShowEndtime();
        onChangeEndtime(formatTime(currenttime));
      }
    } else {
      selectEndTime();
    }
  };

  const confirmIosDate = () => {
    onChangedatetxt(formatDate(date));
    selectDate();
  };

  const formatDate = (rawdate) => {
    let date = new Date(rawdate);

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${day}/${month}/${year}`;
  };

  const formatTime = (rawdate) => {
    let date = new Date(rawdate);
    let hour = date.getHours();
    let min = date.getMinutes();

    hour = hour < 10 ? `0${hour}` : hour;
    min = min < 10 ? `0${min}` : min;

    return `${hour}:${min}`;
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.screen}>

          <View style={styles.form}>
          <Text style={styles.header}>Clinic Profile</Text>
            <Text style={styles.txt}>ชื่อคลินิก : </Text>
            <TextInput
              style={styles.input}
              value={ClinicName}
              onChangeText={onChangeClinicName}
              placeholder="Clinic Name"
            />

            <Text style={styles.txt}>Descriptions : </Text>

            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={(text) => onChangeDescribe(text)}
              value={Describe}
              style={styles.txtarea}
            />

            <Text style={styles.txt}>Address : </Text>
            <TextInput
              style={styles.input}
              value={Address}
              onChangeText={onChangeAddress}
              placeholder="address"
            />

            <Text style={styles.txt}>เบอร์โทร : </Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumber}
              value={number}
              placeholder="Telphone"
              keyboardType="numeric"
            />

            <Text style={styles.txt}>เวลาเปิดทำการ : </Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                {showStarttime && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={starttime}
                    onChange={onStartChange}
                  />
                )}

                <Pressable onPress={selectStartTime}>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeStarttime}
                    value={starttimetxt}
                    placeholder="Start time"
                    editable={false}
                    onPressIn={selectStartTime}
                  />
                </Pressable>
              </View>
              <Text style={{ fontSize: 28, fontWeight: "bold" }}>:</Text>
              <View style={{ width: "45%" }}>
                {showEndtime && (
                  <DateTimePicker
                    mode="time"
                    display="spinner"
                    value={endtime}
                    onChange={onEndChange}
                  />
                )}

                <Pressable onPress={selectEndTime}>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeEndtime}
                    value={endtimetxt}
                    placeholder="End time"
                    editable={false}
                    onPressIn={selectEndTime}
                  />
                </Pressable>
              </View>
            </View>

            <Text style={styles.txt}>ชื่อสัตวแพทย์ :</Text>
            <TextInput
              style={styles.input}
              value={Name}
              onChangeText={onChangeName}
              placeholder="ชื่อสัตวแพทย์"
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ width: "45%" }}>
                <Text style={styles.txt}>การศึกษา : </Text>
                <TextInput
                  style={styles.input}
                  value={Education}
                  onChangeText={onChangeEdu}
                  placeholder="ระดับการศึกษา"
                />
              </View>
              <View style={{ width: "45%" }}>
                <Text style={styles.txt}>วันเกิด : </Text>
                <View>
                  {!showdate && Platform.OS == "ios" && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <TouchableOpacity
                        style={[styles.btnios, styles.pickerbtnios]}
                        onPress={selectDate}
                      >
                        <Text>Cancel</Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={[styles.btnios, styles.pickerbtnios]}
                        onPress={confirmIosDate}
                      >
                        <Text>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {showdate && (
                    <DateTimePicker
                      mode="date"
                      display="spinner"
                      value={date}
                      onChange={onchange}
                      style={styles.datepicker}
                    />
                  )}

                  <Pressable onPress={selectDate}>
                    <TextInput
                      style={styles.input}
                      onChangeText={onChangedatetxt}
                      value={datetxt}
                      placeholder="Date"
                      editable={false}
                      onPressIn={selectDate}
                    />
                  </Pressable>
                </View>
              </View>
            </View>

            <Text style={styles.txt}>Experiance : </Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={(text) => onChangeExp(text)}
              value={Exp}
              style={styles.txtarea}
            />
          </View>

          <View style={{ width: "70%", paddingVertical: 20, borderRadius: 20 }}>
            <Button onPress={""} title="Submit" color="#87D8C3" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignItems: "center",
  },
  form: {
    width: "90%",
    alignItems: "left",
  },
  txt: {
    fontSize: 18,
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  txtarea: {
    borderWidth: 0.5,
    borderRadius: 10,
  },
  datepicker: {
    height: 120,
    marginTop: -10,
  },
  pickerbtnios: {
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  txt: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default EditProfileClinic;
