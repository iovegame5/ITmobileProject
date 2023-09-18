import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";

const AppointmentScreen = ({ route, navigation }) => {
  const [Name, onChangeName] = React.useState("");
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
  const [opentime, setOpentime] = useState(false);
  const [valuetime, setValuetime] = useState(null);
  const [Ontime, onChangeTime] = useState([
    { label: "13:00 - 14:00", value: "13:00 - 14:00" },
    { label: "17:00 - 18:00", value: "17:00 - 18:00" },
  ]);

  const selectDate = () => {
    setShowdate(!showdate);
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

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>จองคิวเข้ารักษา</Text>

      <View style={styles.form}>
        <Text style={styles.txt}>ชื่อคลินิก : lolipop</Text>

        <Text style={styles.txt}>ชื่อ-นามสกุล :</Text>
        <TextInput
          style={styles.input}
          value={Name}
          onChangeText={onChangeName}
          placeholder="Name"
        />

        <Text style={styles.txt}>ชื่อสัตว์เลี้ยง :</Text>

        <DropDownPicker
          open={open}
          value={value}
          items={Petname}
          setOpen={setOpen}
          setValue={setValue}
          setItems={onChangePetname}
          style={styles.dropdown}
        />

        <Text style={styles.txt}>เบอร์โทร : </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Telphone"
          keyboardType="numeric"
        />

        <Text style={styles.txt}>วันและเวลานัดหมาย : </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{width: '45%'}}>
            {!showdate && Platform.OS == "ios" && (
              <View
                style={{ flexDirection: "row", justifyContent: "space-around" }}
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
          <View style={{width: '45%'}}>
            <DropDownPicker
              open={opentime}
              value={valuetime}
              items={Ontime}
              setOpen={setOpentime}
              setValue={setValuetime}
              setItems={onChangeTime}
              style={styles.dropdown}
            />
          </View>
        </View>
      </View>

      <View style={{width: '70%', paddingVertical: 20, borderRadius: 20}}>
        <Button onPress={() => navigation.navigate("ReminderUser")} title="Submit" color="#87D8C3"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  form: {
    width: "90%",
    alignItems: "left",
  },
  txt: {
    fontSize: 18,
    marginVertical: 10
  },
  input: {
    height: 40,
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10
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
});

export default AppointmentScreen;
