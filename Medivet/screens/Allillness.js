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
    Alert,
    Modal,
    Pressable
    
  } from "react-native";
  import React from "react";
  import { AntDesign } from '@expo/vector-icons';
  import Pet  from "./Addpet";
  import { SearchBar } from '@rneui/themed';
  import { useState } from "react";
  import { Ionicons } from '@expo/vector-icons'; 
  
  
  const Allillness = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const petData = [
      {
        id: 1,
        img: require("../pics/dog.jpg"),
        clinicname: "โรคไต",
        doctorname: "Male",

      },
      {
        id: 2,
        img: require("../pics/dog.jpg"),
        clinicname: "โรคหมอนรองกระดูกทับเส้นประสาท",
        doctorname: "Female",

      },
      {
        id: 3,
        img: require("../pics/dog.jpg"),
        clinicname: "โรคหูอักเสบ",
        doctorname: "Male",

      },
      {
        id: 4,
        img: require("../pics/dog.jpg"),
        clinicname: "โรคเนื้องอกในหัวใจสุนัข",
        doctorname: "ปัจจุบันโรคเนื้องอกสามารถเกิดในร่างกายได้ทุกที่เลยนะคะ เนื้องอกหัวใจก็เช่นกัน “โรคเนื้องอกหัวใจ”",

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
                 <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}> ชื่อโรค : {item.clinicname}</Text>
            <Text style={styles.modalText}> อาการ : {item.doctorname}</Text>

            <View style={{width:100 , marginLeft: 95}}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>ปิด</Text>
            </Pressable>
            </View>
          </View>
        </View>
      </Modal>        
                <View style={styles.card}>
                  <View style={styles.layoutimage}>
                    <Image source={item.img} style={styles.image} />

                  </View>
                  <View style={styles.text}>
                    <Text style={{fontSize: 18}}>โรค: {item.clinicname}</Text>
                    </View>
                    <View style={{width: 100, marginLeft: 125, marginTop: 5}}>
                    <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(true)}>
                    <Text style={styles.textStyle}>ดูข้อมูล</Text>
                    </Pressable>
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
      width: 250,
      height: 200,
    },
    text: {
      marginLeft: 50,
      marginTop: 10
    },
    card: {
      width: 380,
      height: 300,
      backgroundColor: "#F9F9F9",
      marginTop: 50,
      marginLeft: 15,
      borderRadius: 20,
    },
    arrow : {
        marginLeft: 30,
        marginTop: 20
    },
    layoutimage :{
        width: 300,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 40,
        marginTop: 10


    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#87D8C3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width:300,
        height: 300,
        alignItems:'stretch',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        }
    },
    modalText: {
        marginBottom: 15,
        marginTop: 20,
        marginLeft: 10,
        fontSize: 20

      },
      buttonClose: {
        backgroundColor: 'red',
      },
  });
  export default Allillness;
  