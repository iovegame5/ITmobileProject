import React, { useEffect, useState, Component } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "../database/firebase";
import { useAuth } from "../Auth/AuthContext";

const AppointmentScreen = ({ route, navigation }) => {
  const { user, role, isAuthenticated, login, logout } = useAuth();

  const [Name, onChangeName] = React.useState("");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [Petname, onChangePetname] = useState([
    /*  { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" }, */
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

  const getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      const { Name, OwnerID, PetID } = res.data();
      if (OwnerID === user.uid) {
        all_data.push({
          label: Name,
          value: res.id,
        });
      }
    });

    onChangePetname(all_data);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("route " + route.params.todo);
      const subjDoc = firebase
        .firestore()
        .collection("Appointment")
        .doc(route.params.queueid);
      subjDoc.get().then((res) => {
        if (res.exists) {
          const subj = res.data();
          onChangedatetxt(subj.Date);
          setValuetime(subj.Time);
          if (role === "Clinic") {
            console.log(route.params.PetID);
            onChangeName(route.params.Fullname);
            console.log("Ownername" + route.params.Fullname);
          } else {
            onChangeName(user.firstName + " " + user.lastName);
            onChangeNumber(user.phone);
          }
        } else {
          console.log("Document does not exist!!");
        }
      });
      const unsubscribe = firebase
        .firestore()
        .collection("Pet")
        .onSnapshot(getCollection);
    };
    fetchData()
  }, []);

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
        console.log("date" + date);
      }
    } else {
      selectDate();
    }
  };

  const formatDate = (rawdate) => {
    let date = new Date(rawdate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  function storeAppointment() {
    const appointmentDB = firebase.firestore().collection("Appointment");
    if (route.params.todo === "addQueue") {
      console.log(route.params);
      appointmentDB
        .add({
          ClinicID: route.params.ClinicID,
          Date: datetxt,
          OwnerID: user.uid,
          PetID: value,
          Status: "รอการยืนยัน",
          Time: valuetime,
          StatusClinic: "รอการยืนยัน",
          Datestamp: new Date(datetxt),
        })
        .then((res) => {
          onChangedatetxt("");
          setValuetime(null);
          Alert.alert(
            "Adding Alert",
            "New Queue was added!! Pls check your DB!!"
          );
        });
    } else if (
      route.params.todo === "editQueue" &&
      route.params.editfrom === "Owner"
    ) {
      const updateQueue = firebase
        .firestore()
        .collection("Appointment")
        .doc(route.params.queueid);
      updateQueue
        .set({
          ClinicID: route.params.clinicID,
          Date: datetxt,
          OwnerID: user.uid,
          PetID: value,
          Status: "รอการยืนยัน",
          Time: valuetime,
          StatusClinic: "เลื่อนนัด",
          Datestamp: new Date(datetxt),
        })
        .then(() => {
          Alert.alert(
            "Updating Alert",
            "The queue was updated!! Pls check your DB!!"
          );
        });
    } else if (
      route.params.todo === "editQueue" &&
      route.params.editfrom === "Clinic"
    ) {
      const updateQueue = firebase
        .firestore()
        .collection("Appointment")
        .doc(route.params.queueid);
      updateQueue
        .set({
          ClinicID: route.params.clinicID,
          Date: datetxt,
          OwnerID: route.params.ownerID,
          PetID: route.params.PetID,
          Status: "เลื่อนนัด",
          Time: valuetime,
          StatusClinic: "รอการยืนยัน",
          Datestamp: new Date(datetxt),
        })
        .then(() => {
          Alert.alert(
            "Updating Alert",
            "The queue was updated!! Pls check your DB!!"
          );
        });
    }
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.header}>จองคิวเข้ารักษา</Text>

      <View style={styles.form}>
        <Text style={styles.txt}>ชื่อคลินิก : {route.params.clinicName}</Text>

        <Text style={styles.txt}>ชื่อ-นามสกุล :</Text>
        <TextInput
          style={styles.input}
          value={Name}
          onChangeText={onChangeName}
          placeholder="Name"
          editable={role === "Clinic" ? false : true}
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
          disabled={role === "Clinic" ? true : false}
        />

        <Text style={styles.txt}>เบอร์โทร : </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Telphone"
          keyboardType="numeric"
          editable={role === "Clinic" ? false : true}
        />

        <Text style={styles.txt}>วันและเวลานัดหมาย : </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ width: "45%" }}>
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
          <View style={{ width: "45%" }}>
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

      <View style={{ width: "70%", paddingVertical: 20, borderRadius: 20 }}>
        {route.params.todo === "editQueue" ? (
          <Button
            onPress={() => {
              storeAppointment(), navigation.navigate("ReminderAppointment");
            }}
            title="Submit"
            color="#87D8C3"
          />
        ) : (
          <Button
            onPress={() => {
              storeAppointment(), navigation.navigate("ReminderUser");
            }}
            title="Submit"
            color="#87D8C3"
          />
        )}
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
    marginVertical: 10,
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
    marginVertical: 10,
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
