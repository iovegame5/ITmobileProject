import React from "react";
import { Image, View, Text } from "react-native";

// import library ที่จำเป็น
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

// import screen ที่เกี่ยวข้อง
import HomeScreen from "../screens/HomeScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import ReminderAppoint from "../screens/ReminderAppointScreen";
import QueueAppoint from "../screens/QueueAppointScreen";
import EditProfileClinic from "../screens/EditClinicProfileScreen";
import HomePageScreen from "../screens/HomePageScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileClinicScreen from "../screens/ProfileClinic";
// import RegisterVet from "../screens/RegisterVetScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MypetScreen from "../screens/Mypet";
import AddpetScreen from "../screens/Addpet";
import FixpetScreen from "../screens/Fixpet";
import AllclinicScreen from "../screens/Allclinic";
import ClinicDetailScreen from "../screens/ClinicDetail";
import Allillness from "../screens/Allillness";

const Stack = createNativeStackNavigator();
const Appointment = createNativeStackNavigator();
const Queue = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function LogoTitle() {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
      }}
    >
      <Image
        style={{ width: 70, height: 50 }}
        source={require("../pics/logo.png")}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginRight: "5%",
        }}
      >
        <Image
          style={{ width: 50, height: 50, borderRadius: 25 }}
          source={require("../pics/userpic.jpeg")}
        />
        <Text style={{ marginLeft: "5%" }}>Anpanprang</Text>
      </View>
      {/* <Text style={{ marginRight: '8%' }}>Log out</Text> */}
    </View>
  );
}

function LoginNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomePage"
        component={HomePageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="RegisterPage" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstHome"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#A2E5E1",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function Petnavigate() {
  return (
    <Stack.Navigator initialRouteName="MyPet">
      <Stack.Screen name="MyPet" component={MypetScreen} />
      <Stack.Screen name="AddPet" component={AddpetScreen} />
      <Stack.Screen name="Edit animal information" component={FixpetScreen} />
    </Stack.Navigator>
  );
}


function Profiles() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile-user"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
      <Stack.Screen
        name="Profileclinic"
        component={ProfileClinicScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AppointmentNavigator() {
  return (
    <Appointment.Navigator>
      <Appointment.Screen
        name="ReminderAppointment"
        component={ReminderAppoint}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
      <Appointment.Screen
        name="FormAppointment"
        component={AppointmentScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
    </Appointment.Navigator>
  );
}

function QueueNavigator() {
  return (
    <Queue.Navigator>
      <Queue.Screen
        name="AllClinic"
        component={AllclinicScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
      <Queue.Screen
        name="Clinicdetail"
        component={ClinicDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
       <Queue.Screen
        name="FormAppointment"
        component={AppointmentScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
      <Queue.Screen
        name="ReminderUser"
        component={ReminderAppoint}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
        }}
      />
    </Queue.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#52A9A8" },
        tabBarLabelStyle: { fontSize: 15 },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={24} color="white" />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="MyPet"
        component={Petnavigate}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name="pets" size={24} color="white" />;
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Clinic"
        component={QueueNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="clinic-medical" size={24} color="white" />
            );
          },
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Reminder"
        component={AppointmentNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="calendar" size={24} color="white" />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "green",
        drawerInactiveTintColor: "gray",
      }}
    >
      <Drawer.Screen
        name="homie"
        component={TabNavigator}
        options={{
          drawerLabel: "Home",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="profile"
        component={Profiles}
        options={{
          drawerLabel: "Profile",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="pet"
        component={Petnavigate}
        options={{
          drawerLabel: "MyPet",
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="ill"
        component={Allillness}
        options={{
          drawerLabel: "All illness",
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={LoginNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="all"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
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
