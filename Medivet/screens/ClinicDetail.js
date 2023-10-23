import React, { Component, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
  Touchable,
} from "react-native";
import firebase from "../database/firebase";
import MapComponent from "../component/MapComponent";
import { Marker } from "react-native-maps";
import MapView from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";

class ClinicDetail extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      Name: "",
      clinicImage: "",
      vetName: "",
      tel: "",
      startTime: "",
      endTime: "",
      certificate: "",
      addressDescription: "",
      address: "",
    };
    this.mapRef = React.createRef();
    this.unsubscribe = null;
  }

  componentDidMount() {
    const {
      id,
      Name,
      address,
      clinicImage,
      vetName,
      tel,
      startTime,
      endTime,
      certificate,
      addressDescription,
    } = this.props.route.params;
    console.log("addres", address);

    // Initialize a reference to the Firestore document using the provided 'id'
    const subjDoc = firebase.firestore().collection("Clinic").doc(id);

    subjDoc.get().then((res) => {
      if (res.exists) {
        const subj = res.data();
        this.setState({
          id,
          Name,
          clinicImage,
          vetName,
          tel,
          startTime,
          endTime,
          certificate,
          addressDescription,
        });
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

  // Add any other logic or methods you need for your ClinicDetail component

  render() {
    return (
      <SafeAreaView style={styles.center}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.img}>
              <Image
                style={{ width: 350, height: 200,resizeMode: "contain" }}
                source={{ uri: this.state.clinicImage }}
              />
            </View>

            <SafeAreaView style={styles.layout}>
              <View style={styles.form}>
                <Text
                  style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}
                >
                  {" "}
                  ชื่อคลินิก: {this.state.Name}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "normal", marginTop: 10 }}
                >
                  {" "}
                  ที่อยู่: {this.state.addressDescription}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "normal", marginTop: 10 }}
                >
                  {" "}
                  เบอร์โทร: {this.state.tel}
                </Text>

                {/* Render other details using this.state properties */}
                {/* For example, you can render this.state.addressDescription, this.state.vetName, etc. */}
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: 385,
                    marginTop: 20,
                  }}
                />
                <Text
                  style={{ fontSize: 20, fontWeight: "normal", marginTop: 10 }}
                >
                  {" "}
                  ชื่อสัตว์แพทย์: {this.state.vetName}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}
                >
                  {" "}
                  ใบอนุญาติการทำงาน:
                </Text>
                <View style={styles.cer}>
                  <Image
                    style={{ width: 300, height: 250, resizeMode: "contain" }}
                    source={{ uri: this.state.certificate }}
                  />
                </View>
               
                {/* {this.state.address && (
                  <View>
                    <MapView
                      style={{ height: 300, width: 300 }}
                      initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                        
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: this.state.latitude,
                          longitude: this.state.longitude,
                        }}
                        title="Marker Title"
                        description="Marker Description"
                      />
                    </MapView>
                  </View>
                )} */}
                <View
                  style={{
                    borderBottomColor: "black",
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    width: 385,
                    marginTop: 20,
                  }}
                />
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}
                >
                  {" "}
                  เวลาทำการ:
                </Text>
                {/* Render clinic timings */}
                {/* For example, Mon-Fri Morning 8.00 am - 2.00 am */}
                {/* Add similar code to render other details */}
                <View style={{ flexDirection: "row", width: 200 }}>
                  <Text
                    style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}
                  ></Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 15,
                      marginTop: 13,
                      marginLeft: 30,
                    }}
                  >
                    {this.state.startTime} - {this.state.endTime}
                  </Text>
                </View>

                <View>
                  {/* <Button
                    color="#87D8C3"
                    title="จองคิว"
                    onPress={() =>
                      this.props.navigation.navigate("FormAppointment", {
                        todo: "addQueue",
                      })
                    }
                  /> */}
                  <TouchableOpacity style={styles.buttonContainer}>
                    <Text
                      style={{fontSize:20, color:"white"}}
                      onPress={() =>
                        this.props.navigation.navigate("FormAppointment", {
                          todo: "addQueue",
                        })
                      }
                    >
                      จองคิว
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAF1E4",
  },
  img: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation:5,
    resizeMode: "contain",
  },
  cer: {
    marginTop: 10,
    alignItems: "center",
    resizeMode: "contain",
    justifyContent: "center",
  },
  layout: {
    backgroundColor: "white",
    width: 420,
    height: 800,
    marginTop: 10,
    borderRadius: 30,
    alignItems: "stretch",
    elevation:5
  },
  form: {
    // width: 380,
    // height: 500,

    marginRight: 10,
    // marginTop: 10,
    padding: 20,
  },
  center: {
    alignItems: "center",
  },
  buttonContainer:{
    width:100,
    height:70,
    backgroundColor:"#87D8C3" ,
    alignItems:"center",
    justifyContent:"center",
    alignSelf:"center",
    margin:10,
    borderRadius:40,
    elevation:5
    
  }
});

export default ClinicDetail;
