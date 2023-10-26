import React, { useEffect, useState } from "react";
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
  Alert,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import firebase from "../database/firebase";

const QueueOwner = (props) => {
  const appointmentDB = firebase.firestore().collection("Appointment");

  function SubmitChange(prop) {
    const subjDoc = firebase.firestore().collection("Appointment").doc(prop);
    subjDoc.get().then((res) => {
      if (res.exists) {
        const updateChangeQueue = firebase
          .firestore()
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
            StatusClinic: "นัดหมาย",
          })
          .then(() => {
            Alert.alert(
              "เปลี่ยนแปลงสำเร็๗",
              "นัดหมายเสร็จสิ้น!! ท่านสามารถแก้ไขหรือยกเลิกการนัดหมายได้ที่หน้านัดหมาย"
            );
          });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

  function abortAppointment(prop) {
    const subjDoc = firebase.firestore().collection("Appointment").doc(prop);
    subjDoc.get().then((res) => {
      if (res.exists) {
        const updateChangeQueue = firebase
          .firestore()
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
            StatusClinic: "ยกเลิก",
          })
          .then(() => {
            Alert.alert(
              "เปลี่ยนแปลงสำเร็จ",
              "ยกเลิกคิวแล้ว!"
            );
          });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

  const WaitQueue = (prop) => {
    console.log(prop);
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className="w-72 h-44 rounded-2xl">
          <Text className="text-right text-orange-700 mr-2 mt-2">
            รอการยืนยัน
          </Text>
          <View className="flex flex-row justify-evenly items-center">
            <View className="w-2/5 items-center">
              <Image
                source={{ uri: prop.clinicImage }}
                className="h-32 w-28 rounded-lg"
              />
            </View>
            <View className="w-3/6 gap-1">
              <Text className=" text-base font-semibold">
                {prop.ClinicName}
              </Text>
              <View className="flex flex-row items-center">
                <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Date}
                </Text>
              </View>
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Time}
              </Text>
              <Text className="text-sm">{prop.PetName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ComingQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className="flex flex-row justify-around  w-72 h-44 rounded-2xl items-center">
          <View className="w-2/5 items-center">
            <Image
              source={{ uri: prop.clinicImage }}
              className="h-2/3 w-28 rounded-lg"
            />
          </View>
          <View className="w-3/6 gap-1 ">
            <Text className=" text-base font-semibold">{prop.ClinicName}</Text>
            <View className="flex flex-row items-center">
              <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Date}
              </Text>
            </View>
            <Text className="text-sm text-blue-700 font-semibold">
              {prop.Time}
            </Text>
            <Text className="text-sm">{prop.PetName}</Text>
            <View className="border-t border-gray-400 mb-1"></View>
            <View className="flex flex-row justify-evenly	items-center">
              <Button
                onPress={() => {
                  props.navigation.navigate("FormAppointment", {
                    todo: "editQueue",
                    queueid: prop.Key,
                    editfrom: "Owner",
                    clinicName: prop.ClinicName,
                    clinicID: prop.ClinicID,
                    ownerName: prop.ownerName,
                  });
                }}
                title="แก้ไข"
                color="#379895"
              />
              <Button
                onPress={() => abortAppointment(prop.Key)}
                title="ยกเลิก"
                color="#FD6262"
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const CompleteQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className="w-72 h-44 rounded-2xl">
          {prop.Status == "สำเร็จ" ? (
            <Text className="text-right text-green-700 mr-2 mt-2">
              {prop.Status}
            </Text>
          ) : (
            <Text className="text-right text-orange-700 mr-2 mt-2">
              {prop.Status}
            </Text>
          )}

          <View className="flex flex-row justify-evenly items-center">
            <View className="w-2/5 items-center">
              <Image
                source={{ uri: prop.clinicImage }}
                className="h-32 w-28 rounded-lg"
              />
            </View>
            <View className="w-3/6 gap-1">
              <Text className=" text-base font-semibold">
                {prop.ClinicName}
              </Text>
              <View className="flex flex-row items-center">
                <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Date}
                </Text>
              </View>
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Time}
              </Text>
              <Text className="text-sm">{prop.PetName}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const ChangeQueue = (prop) => {
    return (
      <View className="bg-slate-50 mt-3 mb-2 rounded-2xl" style={styles.shadow}>
        <View className="w-72 h-52 rounded-2xl">
          <Text className="text-right text-orange-700 mr-2 mt-2">
            เปลี่ยนแปลงนัด
          </Text>
          <View className="flex flex-row justify-evenly items-center">
            <View className="w-2/5 items-center">
              <Image
                source={{ uri: prop.clinicImage }}
                className="h-36 w-28 rounded-lg"
              />
            </View>
            <View className="w-3/6 gap-1">
              <Text className=" text-base font-semibold">
                {prop.ClinicName}
              </Text>
              <View className="flex flex-row items-center">
                <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
                <Text className="text-sm text-blue-700 font-semibold">
                  {prop.Date}
                </Text>
              </View>
              <Text className="text-sm text-blue-700 font-semibold">
                {prop.Time}
              </Text>
              <Text className="text-sm">{prop.PetName}</Text>
              <View className="border-t border-gray-400 mb-1"></View>
              <View className="flex flex-row justify-evenly	items-center">
                <Button
                  onPress={() => SubmitChange(prop.Key)}
                  title="ยืนยัน"
                  color="#379895"
                />
                <Button
                  onPress={() => abortAppointment(prop.Key)}
                  title="ยกเลิก"
                  color="#FD6262"
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  const renderQueueItem = (itemData) => {
    if (props.typestatus === "นัดหมาย" && itemData.item.Status === "นัดหมาย") {
      return (
        //เขียนโค้ดเพิ่ม
        <ComingQueue
          ClinicName={itemData.item.clinicName}
          Date={itemData.item.Date}
          Time={itemData.item.Time}
          PetName={itemData.item.petName}
          Key={itemData.item.key}
          ClinicID={itemData.item.ClinicID}
          clinicImage={itemData.item.clinicImage}
        />
      );
    } else if (
      props.typestatus === "รอการยืนยัน" &&
      itemData.item.Status === "รอการยืนยัน"
    ) {
      return (
        <WaitQueue
          ClinicName={itemData.item.clinicName}
          Date={itemData.item.Date}
          Time={itemData.item.Time}
          PetName={itemData.item.petName}
          ClinicID={itemData.item.ClinicID}
          clinicImage={itemData.item.clinicImage}
        />
      );
    } else if (
      props.typestatus === "เลื่อนนัด" &&
      itemData.item.Status === "เลื่อนนัด"
    ) {
      return (
        <ChangeQueue
          ClinicName={itemData.item.clinicName}
          Date={itemData.item.Date}
          Time={itemData.item.Time}
          PetName={itemData.item.petName}
          Key={itemData.item.key}
          ClinicID={itemData.item.ClinicID}
          clinicImage={itemData.item.clinicImage}
        />
      );
    } else if (
      props.typestatus === "สำเร็จ" &&
      (itemData.item.Status === "สำเร็จ" || itemData.item.Status === "ยกเลิก")
    ) {
      return (
        <CompleteQueue
          ClinicName={itemData.item.clinicName}
          Date={itemData.item.Date}
          Time={itemData.item.Time}
          PetName={itemData.item.petName}
          ClinicID={itemData.item.ClinicID}
          Status={itemData.item.Status}
          clinicImage={itemData.item.clinicImage}
        />
      );
    }
  };

  return (
    <View style={{ padding: 10 }} className="justify-center items-center ">
      <FlatList data={props.queuedata} renderItem={renderQueueItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    margin: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 12.5,
    elevation: 10,
    shadowOpacity: 0.5,
  },
});

export default QueueOwner;
