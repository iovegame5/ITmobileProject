import React from "react";
import { Image, View, Text } from "react-native";

// import library ที่จำเป็น
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
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
import Addpet from "../screens/Addpet";
import FixpetScreen from "../screens/Fixpet";
import AllclinicScreen from "../screens/Allclinic";
import ClinicDetailScreen from "../screens/ClinicDetail";
import AllIllness from "../screens/Allillness";
import CustomDrawerContent from "../component/CustomDrawerContent";
import AddPromotionScreen from "../screens/AddPromotion";
import IllnessDetail from "../screens/IllnessDetailScreen";
import { useAuth } from "../Auth/AuthContext";
const Stack = createNativeStackNavigator();
const Appointment = createNativeStackNavigator();
const Queue = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
function LogoTitle() {
  const { user, role } = useAuth();
  console.log("user", user);
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
        justifyContent: "flex-end", // Center vertically
        alignItems: "center",
        maxWidth: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          marginRight: 60,
        }}
      >
        <Image
          style={{ width: 40, height: 40, borderRadius: 25 }}
          source={require("../pics/userpic.jpeg")}
        />
        {role == "Owner" && (
          <Text ellipsizeMode="tail" style={{ marginLeft: "5%" }}>
            {user.firstName} {user.lastName}
          </Text>
        )}
        {role == "Clinic" && (
          <Text ellipsizeMode="tail" style={{ marginLeft: "5%" }}>
            {user.name}
          </Text>
        )}
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
        options={{ headerBackVisible: false, headerShown: false }}
      />
      <Stack.Screen name="RegisterPage" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function HomeNavigator() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FirstHome"
        component={HomeScreen}
        options={{
          headerTitle: (props) => <LogoTitle {...props} />,
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Petnavigate() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="MyPet">
      <Stack.Screen
        name="MyPet"
        component={MypetScreen}
        options={({ route }) => ({
          headerTitle:"สัตว์เลี้ยง",
          headerShown: true, // Show the Stack header for this screen
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
        })}
      />

      <Stack.Screen name="AddPet" component={Addpet} options= {{
        headerTitle:"เพิ่มสัตว์เลี้ยง"
      }} /> 
      <Stack.Screen name="Edit animal information" component={FixpetScreen} options= {{
        headerTitle:"เปลี่ยนข้อมูลสัตว์เลี้ยง"
      }}/>
    </Stack.Navigator>
  );
}

function Illnessnavigate() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator initialRouteName="Allillness">
      {/* <Stack.Screen name="Home" component={HomePageScreen}  options={{
        headerShown : false
      }}/> */}
  <Stack.Screen
        name="Allillness"
        component={AllIllness}
        options={{
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
          headerTitle: "โรคที่พบได้ทั่วไป",
        }}
      />
      <Stack.Screen name="IllnessDetail" component={IllnessDetail} />
   
    </Stack.Navigator>
  );
}




function Profiles() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="โปรไฟล์"
        component={ProfileScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
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
  const { user, role, isAuthenticated, login, logout } = useAuth();
  console.log(role);
  return (
    <Appointment.Navigator>
      {role === "Clinic" ? (
        <Appointment.Screen
          name="DoctorAppointment"
          component={QueueAppoint}
          options={{
            headerStyle: {
              backgroundColor: "#E3F4F4",
            },
          }}
        />
      ) : (
        <Appointment.Screen
          name="ReminderAppointment"
          component={ReminderAppoint}
          options={{
            headerStyle: {
              backgroundColor: "#E3F4F4",
            },
          }}
        />
      )}
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
          headerShown: false,
        }}
      />
      <Queue.Screen
        name="Clinicdetail"
        component={ClinicDetailScreen}
        options={{
          headerStyle: {
            backgroundColor: "#E3F4F4",
          },
          headerTitle: "รายละเอียดคลินิก",
        }}
      />
      <Queue.Screen
        name="addPromotion"
        component={AddPromotionScreen}
        options={{
          headerShown: true,
          headerTitle: "เพิ่มโปรโมชั่น",
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
  const { user, role, isAuthenticated, login, logout } = useAuth();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "white",
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
            return <Ionicons name="home" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
      {!role || role !== "Clinic" ? (
        <Tab.Screen
          name="petTab"
          component={Petnavigate}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <MaterialIcons name="pets" size={24} color={color} />;
            },
            headerShown: false,
          }}
        />
      ) : null}
      <Tab.Screen
        name="Clinic"
        component={QueueNavigator}
        options={{
          tabBarIcon: ({ color, size }) => {
            return (
              <FontAwesome5 name="clinic-medical" size={24} color={color} />
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
            return <FontAwesome name="calendar" size={24} color={color} />;
          },
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function DrawerNavigator() {
  const { user, role } = useAuth();
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: "green",
        drawerInactiveTintColor: "gray",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />} // Use the custom drawer content component
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
        name="editProfile"
        component={EditProfileClinic}
        options={{
          drawerLabel: "แก้ไขข้อมูล",
          headerShown: false,
        }}
      />
      {/* <Drawer.Screen
        name="profile"
        component={Profiles}
        options={{
          drawerLabel: "Profile",
          headerShown: false,
        }}
      /> */}
      <Drawer.Screen
        name="ill"
        component={Illnessnavigate}
        options={{
          drawerLabel: "All illness",
          headerShown: false,
        }}
      />
      {role ==="Clinic" &&(
         <Drawer.Screen
         name="addPromotion"
         component={AddPromotionScreen}
         options={{
           drawerLabel: "เพิ่มโปรโมชั่น",
           headerShown: true,
          headerTitl:"เพิ่มโปรโมชั่น"
         }}
       />
      )}
      
    </Drawer.Navigator>
  );
}
function NewillnessNavigator() {
  return(<Stack.Navigator name="home">
    <Stack.Screen 
    name = "home"
    component={HomeScreen}
    options={{
      headerShown: false
    }}/>
       <Stack.Screen 
    name="illness"
    component={AllIllness}
    options={{
      headerShown: false
    }}/>
    <Stack.Screen 
    name = "Illnessdetail"
    component={IllnessDetail}
    options={{
      headerShown: false
    }}/>

  </Stack.Navigator>);
  
  
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
        options={{
          headerShown: false,
        }}
      />
            <Stack.Screen
        name="illnew"
        component={NewillnessNavigator}
        options={{
          headerShown: false,
        }}
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
