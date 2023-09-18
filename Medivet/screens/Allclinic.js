// import แบบ react-native
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    StatusBar,
    SafeAreaView,
    Button,
    Pressable,
    
  } from "react-native";
  import React from "react";
  import { AntDesign } from '@expo/vector-icons';
  import Pet  from "./Addpet";
  import { SearchBar } from '@rneui/themed';
  import { useState } from "react";
  import { Ionicons } from '@expo/vector-icons'; 
  import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
  
  
  const Allclinic = ({navigation}) => {
 
const [search, setSearch] = useState("");

const updateSearch = (search) => {
  setSearch(search);
};
    const petData = [
      {
        id: 1,
        img: require("../pics/clinicPhoto.png"),
        clinicname: "ลาดกระบังคลีนิค",
        doctorname: "Tuna",

      },
      {
        id: 2,
        img: require("../pics/clinicPhoto.png"),
        clinicname: "Sira Medical Clinic",
        doctorname: "Ploy",

      },
      {
        id: 3,
        img: require("../pics/clinicPhoto.png"),
        clinicname: "RW CLINIC",
        doctorname: "Kolo",

      },
      {
        id: 4,
        img: require("../pics/clinicPhoto.png"),
        clinicname: "Eli Clinic",
        doctorname: "Bob",

      },
    ];
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={{width: 380,  marginLeft: 20}}>
            <SearchBar
      placeholder="Type Here..."
      onChangeText={updateSearch}
      value={search}
      platform="android"
    />
    </View>

        <FlatList
          data={petData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                
                <View style={styles.card}>
                  <View style={{ flexDirection: "row" }}>
                    <Image source={item.img} style={styles.image} />
                    <View style={styles.text}>
                      <Text style={{ fontSize: 15 }}> ชื่อคลินิก: {item.clinicname}</Text>
                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ fontSize: 14 }}> ชื่อหมอ: {item.doctorname}</Text>
                        <View style={styles.arrow}>
                          <Pressable onPress={ () => { navigation.navigate("Clinicdetail"); }}>
                            <Text>
                        <Ionicons name="arrow-forward" size={24} color="black" />
                        </Text>
                        </Pressable>
                        </View>
                        
                        </View>
  
           
                  
                    </View> 
                  </View>
                </View>
                
              </View>
            );
          }}
        />

      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      alignItems: "stretch",
    },
    scrollview: {
      padding: 4,
    },
    child: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      height: 150,
      margin: 5,
      borderWidth: 3,
      borderRadius: 20,
      backgroundColor: "orange",
    },
    header: {
      width: "100%",
      height: 120,
      backgroundColor: "#6495ed",
      flexDirection: "row",
      alignItems: "center",
    },
    image: {
      width: 150,
      height: 150,
      marginTop: 25,
      marginLeft: 10,
      flexDirection: "row",
    },
    text: {
      marginLeft: 10,
      marginTop: 30,
    },
    card: {
      width: 380,
      height: 200,
      backgroundColor: "#F9F9F9",
      marginTop: 50,
      marginLeft: 15,
      borderRadius: 20,
    },
    arrow : {
        marginLeft: 80,
        marginTop: 20
    }
  });
  export default Allclinic;
  