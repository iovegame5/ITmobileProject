import React from "react";

// import library ที่จำเป็น
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';

// import screen ที่เกี่ยวข้อง
import HomeScreen from "../screens/HomeScreen"

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomePage" component={HomeScreen} options={{ headerShown: false }} />

    </Stack.Navigator>
  )
}


function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={HomeNavigator} options={{ headerShown: false }} />


    </Stack.Navigator>
  );
}
export default function MyNavigator() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
