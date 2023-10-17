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
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const QueueOwner = (props) => {
  return (
    <View className="bg-slate-50 my-5 rounded-2xl" style={styles.shadow}>
      <View
        className="flex flex-row justify-around  w-4/5 h-44 rounded-2xl items-center"
      >
        <View className="w-2/5 items-center">
          <Image
            source={require("../pics/promo1.jpeg")}
            className="h-32 w-28 rounded-lg"
          />
        </View>
        <View className="w-3/6 gap-1 ">
          <Text className=" text-lg font-semibold">ชื่อคลินิก</Text>
          <View className="flex flex-row items-center">
            <AntDesign name="calendar" size={20} color="rgb(14 116 144)" />
            <Text className="text-sm text-blue-700 font-semibold"> 30th July, 9.00 am</Text>
          </View>
          <Text className="text-sm">ชื่อสัตว์เลี้ยง</Text>
          <Text className="text-sm mb-2">ชื่อสัตว์แแพทย์</Text>
          <View className="border-t border-gray-400 mb-1"></View>
          <View className="flex flex-row justify-evenly	items-center">
            <Button
              onPress={() => {
                navigation.navigate("FormAppointment");
              }}
              title="Edit"
              color="#379895"
            />
            <Button onPress={""} title="Delete" color="#FD6262"  />
          </View>
          
        </View>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000', 
    shadowOffset: {width: 0, height: 20}, 
    shadowRadius: 25, 
    elevation: 12.5,
    shadowOpacity: 0.5
  },
});

export default QueueOwner;
