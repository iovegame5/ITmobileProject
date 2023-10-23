import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Switch,
  Image,
  Linking,
  ScrollView,
  Button,
  Alert,
  FlatList,
  StyleSheet
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../database/firebase";
import { useAuth } from "../Auth/AuthContext";


const QueueClinic = (props) => {
  const [submitchange, Onsubmitchange] = React.useState(null);
  const { user, role, isAuthenticated, login, logout } = useAuth();
  console.log(user)

  function SubmitChange(prop) {
    const subjDoc = firebase.firestore()
      .collection("Appointment")
      .doc(prop);
    subjDoc.get().then((res) => {
      if (res.exists) {
        Onsubmitchange(res.data());
        const updateChangeQueue = firebase.firestore()
          .collection("Appointment")
          .doc(prop);
        updateChangeQueue
          .set({
            ClinicID: res.data().ClinicID,
            Date: res.data().Date,
            OwnerID: res.data().OwnerID,
            PetID: res.data().PetID,
            Status: "นัดหมาย",
            Time: res.data().Time,
            StatusClinic: "นัดหมาย"
          })
          .then(() => {
            Alert.alert(
              "Updating Alert",
              "The queue was updated!! Pls check your DB!!"
            );
          });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

  function abortAppointment(prop) {
    const subjDoc = firebase.firestore()
      .collection("Appointment")
      .doc(prop);
    subjDoc.get().then((res) => {
      if (res.exists) {
        const updateChangeQueue = firebase.firestore()
          .collection("Appointment")
          .doc(prop);
        updateChangeQueue
          .set({
            ClinicID: res.data().ClinicID,
            Date: res.data().Date,
            OwnerID: res.data().OwnerID,
            PetID: res.data().PetID,
            Status: "ยกเลิก",
            Time: res.data().Time,
            StatusClinic: "ยกเลิก"
          })
          .then(() => {
            Alert.alert(
              "Updating Alert",
              "The queue was updated!! Pls check your DB!!"
            );
          });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

  function completeAppointment(prop) {
    const subjDoc = firebase.firestore()
      .collection("Appointment")
      .doc(prop);
    subjDoc.get().then((res) => {
      if (res.exists) {
        const updateChangeQueue = firebase.firestore()
          .collection("Appointment")
          .doc(prop);
        updateChangeQueue
          .set({
            ClinicID: res.data().ClinicID,
            Date: res.data().Date,
            OwnerID: res.data().OwnerID,
            PetID: res.data().PetID,
            Status: "สำเร็จ",
            Time: res.data().Time,
            StatusClinic: "สำเร็จ"
          })
          .then(() => {
            Alert.alert(
              "Updating Alert",
              "The queue was updated!! Pls check your DB!!"
            );
          });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }


  const WaitQueue = (prop) => {
    console.log("prop---------------")
    console.log(prop.Info)
    if (prop.Info.Status === "เลื่อนนัด") {
      return (
        <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
          <View className=" w-72 h-48 rounded-2xl">
            <Text className="text-right text-orange-700 mr-2 mt-2">
              รอการยืนยัน
            </Text>
            <View className="flex flex-row justify-evenly items-center">
              <View className="w-2/5 items-center">
                <Image
                  source={require("../pics/promo1.jpeg")}
                  className="h-36 w-28 rounded-lg"
                />
              </View>
              <View className="w-3/6 gap-1">
                <Text className=" text-base font-semibold">{prop.Ownername}</Text>
                <View className="flex flex-row items-center">
                  <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                  <Text className="text-sm text-blue-700 font-semibold">
                    {prop.Info.Date}
                  </Text>
                </View>
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Info.Time}
                </Text>
                <Text className="text-sm">{"พันธุ์ : " + prop.Typeof}</Text>
              <Text className="text-sm">{prop.Ownerphone}</Text>             
              </View>
            </View>
          </View>
        </View>
      );
    } else if (prop.Info.Status === "รอการยืนยัน") {
      return (
        <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
          <View className=" w-72 h-52 rounded-2xl">
            <Text className="text-right text-orange-700 mr-2 mt-2">
              รอการยืนยัน
            </Text>
            <View className="flex flex-row justify-evenly items-center">
              <View className="w-2/5 items-center">
                <Image
                  source={require("../pics/promo1.jpeg")}
                  className="h-36 w-28 rounded-lg"
                />
              </View>
              <View className="w-3/6 gap-1">
                <Text className=" text-base font-semibold">{prop.Ownername}</Text>
                <View className="flex flex-row items-center">
                  <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                  <Text className="text-sm text-blue-700 font-semibold">
                    {prop.Info.Date}
                  </Text>
                </View>
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Info.Time}
                </Text>
                <Text className="text-sm">{"พันธุ์ : " + prop.Typeof}</Text>
              <Text className="text-sm">{prop.Ownerphone}</Text>
                <View className="border-t border-gray-400 mb-1"></View>
              <View className="flex flex-row justify-evenly	items-center">
                <Button
                  onPress={() => SubmitChange(prop.Info.key)}
                  title="ยืนยัน"
                  color="#379895"
                />
                <Button onPress={() => abortAppointment(prop.Info.key)} title="ยกเลิก" color="#FD6262" />
              </View>
              </View>
            </View>
          </View>
        </View>
      );
    }
  
  };

  const ComingQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className="flex flex-row justify-around  w-72 h-48 rounded-2xl items-center">
          <View className="w-2/5 items-center">
            <Image
              source={require("../pics/promo1.jpeg")}
              className="h-2/3 w-28 rounded-lg"
            />
          </View>
          <View className="w-3/6 gap-1 ">
            <Text className=" text-base font-semibold">{prop.Ownername}</Text>
            <View className="flex flex-row items-center">
              <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Info.Date}
              </Text>
            </View>
            <Text className="text-sm text-blue-700 font-semibold">
              {prop.Info.Time}
            </Text>
            <Text className="text-sm">{"พันธุ์ : " + prop.Typeof}</Text>
            <Text className="text-sm">{prop.Ownerphone}</Text>
          </View>
        </View>
            <View className="flex flex-row justify-evenly	items-center" style={{marginTop: -14, marginBottom: 5}}>
              <Button onPress={() => completeAppointment(prop.Info.key)} title="สำเร็จ" />
              <Button
                onPress={() => {
                  props.navigation.navigate("FormAppointment", {
                    todo: "editQueue",
                    queueid: prop.Info.key,
                    editfrom: "Clinic",
                    clinicName: user.name,
                    clinicID: prop.Info.ClinicID,
                    ownerName: prop.Ownername,
                    ownerID: prop.Info.OwnerID,
                    PetID: prop.Info.PetID,
                    Fullname: prop.Fullname
                  });
                }}
                title="แก้ไข"
                color="#379895"
              />
              <Button onPress={() => abortAppointment(prop.Info.key)} title="ยกเลิก" color="#FD6262" />
            </View>
      </View>
    );
  };

  const CompleteQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
      <View className=" w-72 h-48 rounded-2xl">
        <Text className="text-right text-orange-700 mr-2 mt-2">
          {prop.Info.StatusClinic}
        </Text>
        <View className="flex flex-row justify-evenly items-center">
          <View className="w-2/5 items-center">
            <Image
              source={require("../pics/promo1.jpeg")}
              className="h-36 w-28 rounded-lg"
            />
          </View>
          <View className="w-3/6 gap-1">
            <Text className=" text-base font-semibold">{prop.Ownername}</Text>
            <View className="flex flex-row items-center">
              <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Info.Date}
              </Text>
            </View>
            <Text className="text-sm text-blue-700 font-semibold">
              {prop.Info.Time}
            </Text>
            <Text className="text-sm">{"พันธุ์ : " + prop.Typeof}</Text>
          <Text className="text-sm">{prop.Ownerphone}</Text>             
          </View>
        </View>
      </View>
    </View>
    );
  };

  const ChangeQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className=" w-80 h-52 rounded-2xl">
          <Text className="text-right text-orange-700 mr-2 mt-2">
            เปลี่ยนแปลงนัด
          </Text>
          <View className="flex flex-row justify-evenly items-center">
            <View className="w-2/5 items-center">
              <Image
                source={require("../pics/promo1.jpeg")}
                className="h-36 w-28 rounded-lg"
              />
            </View>
            <View className="w-3/6 gap-1">
              <Text className=" text-base font-semibold">{prop.Ownername}</Text>
              <View className="flex flex-row items-center">
                <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Info.Date}
                </Text>
              </View>
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Info.Time}
              </Text>
              <Text className="text-sm">{"พันธุ์ : " + prop.Typeof}</Text>
            <Text className="text-sm">{prop.Ownerphone}</Text>
              <View className="border-t border-gray-400 mb-1"></View>
              <View className="flex flex-row justify-evenly	items-center">
                <Button
                  onPress={() => SubmitChange(prop.Info.key)}
                  title="ยืนยัน"
                  color="#379895"
                />
                <Button onPress={() => abortAppointment(prop.Info.key)} title="ยกเลิก" color="#FD6262" />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderQueueItem = (itemData) => {
    console.log(props.typeclinicstatus)
    if (props.typeclinicstatus === "นัดหมาย" && itemData.item.StatusClinic === "นัดหมาย") {
      return (
        //เขียนโค้ดเพิ่ม
        <ComingQueue
          Info={itemData.item}
          Ownername={props.ownername}
          Ownerphone={props.ownerphone}
          CatorDog={props.pettypecatordog}
          Typeof={props.typeof}
          Detailpet={props.detailpet}
          Fullname={props.fullnameowner}
        />
      );
    } else if (
      props.typeclinicstatus === "รอการยืนยัน" &&
      itemData.item.StatusClinic === "รอการยืนยัน"
    ) {
      return (
        <WaitQueue
          Info={itemData.item}
          Ownername={props.ownername}
          Ownerphone={props.ownerphone}
          CatorDog={props.pettypecatordog}
          Typeof={props.typeof}
          Detailpet={props.detailpet}
          Fullname={props.fullnameowner}
        />
      );
    } else if (
      props.typeclinicstatus === "เลื่อนนัด" &&
      itemData.item.StatusClinic === "เลื่อนนัด"
    ) {
      return (
        <ChangeQueue
          Info={itemData.item}
          Ownername={props.ownername}
          Ownerphone={props.ownerphone}
          CatorDog={props.pettypecatordog}
          Typeof={props.typeof}
          Detailpet={props.detailpet}
          Fullname={props.fullnameowner}
        />
      );
    } else if (props.typeclinicstatus === "สำเร็จ" &&
    (itemData.item.StatusClinic === "สำเร็จ" || itemData.item.StatusClinic === "ยกเลิก")) {
      return (
      <CompleteQueue
        Info={itemData.item}
        Ownername={props.ownername}
          Ownerphone={props.ownerphone}
          CatorDog={props.pettypecatordog}
          Typeof={props.typeof}
          Detailpet={props.detailpet}
          Fullname={props.fullnameowner}
      />
      );
    }
  };

  return <View className="justify-center items-center"><FlatList data={props.queuedata} renderItem={renderQueueItem} /></View>;
}

const styles = StyleSheet.create({
    shadow: {
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 12.5,
      elevation: 10,
      shadowOpacity: 0.5,
    },
  });

export default QueueClinic