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
  Pressable
  
} from "react-native";
import React from "react";
import { AntDesign } from '@expo/vector-icons';



const Mypet = ({navigation}) => {
  const petData = [
    {
      id: 1,
      img: require("../pics/channels4_profile.jpg"),
      name: "Alice",
      gender: "Male",
      weight: 10,
      breed: "Rottweiler",
    },
    {
      id: 2,
      img: require("../pics/channels4_profile.jpg"),
      name: "Bob",
      gender: "Female",
      weight: 10,
      breed: "Shih tzu",
    },
    {
      id: 3,
      img: require("../pics/channels4_profile.jpg"),
      name: "Mata",
      gender: "Male",
      weight: 10,
      breed: "Jack Russell",
    },
    {
      id: 4,
      img: require("../pics/channels4_profile.jpg"),
      name: "Mata",
      gender: "Female",
      weight: 10,
      breed: "Chihuahua",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
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
                    <Text style={{ fontSize: 20 }}> ชื่อ: {item.name}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Text style={{ fontSize: 15 }}> เพศ: {item.gender}</Text>
                      <Text style={{ marginLeft: 5, fontSize: 15 }}>
                        {" "}
                        น้ำหนัก: {item.weight} กก.
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                      <Text style={{ fontSize: 15 }}>
                        {" "}
                        พันธุ์: {item.breed}
                      </Text>
                      <Text style={{ marginLeft: 5, fontSize: 15 }}>
                        {" "}
                        อายุ: {item.weight} ปี
                      </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                    <Button title="แก้ไขข้อมูล" onPress={ () => { navigation.navigate("Edit animal information"); } } />
                    </View>
                  </View> 
                </View>
              </View>
              
            </View>
          );
        }}
      />
      <View style={{ height: 85, marginLeft: 330}}>
        
         <Pressable
         
         onPress={ () => { navigation.navigate("AddPet"); } }>
          <Text>
        <AntDesign name="pluscircle" size={70} color="#FFF48E" />
        </Text>

      </Pressable>
      </View>

      {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
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
});
export default Mypet;
