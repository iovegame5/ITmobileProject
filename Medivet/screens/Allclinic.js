import { useEffect, useRef } from "react";
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
  Alert,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import firebase from "../database/firebase";
import * as Location from "expo-location";
import * as geolib from "geolib";
import MapComponent from "../component/MapComponent";
import { useAuth } from "../Auth/AuthContext";
import { FontAwesome } from "@expo/vector-icons";
import Loading from "../component/LoadingComponent";
const Allclinic = ({ navigation }) => {
  // Authten !important
  //
  //
  //

  // important มากๆจ้า
  //
  //

  const { user, role, isAuthenticated, login, logout } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [clinics, setClinics] = useState([]);
  const [search, setSearch] = useState("");
  // const [havePermission, setHavePermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [test, setTest] = useState("before");
  const mapRef = useRef(null);
  const fetchClinics = async () => {
    console.log("fetching clinics function cal");
    try {
      setIsLoading(true);

      // Wait for the current location to be obtained before proceeding

      const db = firebase.firestore();
      const clinicsRef = db.collection("Clinic");

      const querySnapshot = await clinicsRef.get();

      const clinicData = [];

      // Create an array of promises to fetch image URLs
      const fetchImagePromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        // console.log(data);
        const storageRef = firebase.storage().ref().child(data.clinicImage);
        const storageRef2 = firebase.storage().ref().child(data.certificate);
        try {
          const url = await storageRef.getDownloadURL();
          const url2 = await storageRef2.getDownloadURL();
          clinicData.push({
            id: doc.id,
            name: data.name,
            address: data.address,
            clinicImage: url,
            vetName: data.vetName,
            distance: calculateDistance(userLocation, data.address),
            tel: data.tel,
            startTime: data.startTime,
            endTime: data.endTime,
            certificate: url2,
            addressDescription: data.addressDescription,

            // Add more fields as needed
          });
        } catch (error) {
          console.error("Error fetching image:", error);
          setIsLoading(false);
        }
      });

      // Wait for all image URLs to be fetched before updating state
      await Promise.all(fetchImagePromises);
      console.log("fetching clinics");
      console.log("userLocatiom : ", userLocation); // Log within this function

      const sortedClinics = clinicData.slice().sort((clinicA, clinicB) => {
        const distanceA = geolib.getDistance(
          {
            latitude: clinicA.address.latitude,
            longitude: clinicA.address.longitude,
          },
          { latitude: userLocation.latitude, longitude: userLocation.longitude }
        );
        const distanceB = geolib.getDistance(
          {
            latitude: clinicB.address.latitude,
            longitude: clinicB.address.longitude,
          },
          { latitude: userLocation.latitude, longitude: userLocation.longitude }
        );
        return distanceA - distanceB;
      });
      setClinics(sortedClinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setIsLoading(false);
    }
    setIsLoading(false);
  };
  const goToLocation = (latitude, longitude) => {
    // เป็นฟังชั่นที่เอาไว้เรียกใช้ ฟังก์ชัน goToPosition  ของ map component
    console.log(latitude, longitude);
    // console.log("EIEIEIEIEI")
    mapRef.current.goToPosition(latitude, longitude); // Pass your desired latitude and longitude
  };

  const calculateDistance = (userLocation, clinicLocation) => {
    if (userLocation && clinicLocation) {
      const distance = geolib.getDistance(
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        {
          latitude: clinicLocation.latitude, // Assuming that clinicLocation contains latitude and longitude
          longitude: clinicLocation.longitude,
        }
      );
      return (distance / 1000).toFixed(2) + " km";
    } else {
      return "N/A"; // or any other value to indicate distance is not available
    }
  };

  const getCurrentLocation = async () => {
    setIsLoading(true);
    try {
      console.log("get Location Curret");
      if (!userLocation) {
        const currentLocation = await Location.getCurrentPositionAsync({});
        if (currentLocation) {
          await setUserLocation(currentLocation.coords);
          console.log("ไม่เจอ user location ขอท่อยู่");
          if (!userLocation) {
            console.log("ผิดพลาด")

          }
          else{
            
          }
        } else {
          console.log("Error Current location not available.");
        }
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
  useEffect(() => {
    if (userLocation) {
      fetchClinics();
    }
    if (!userLocation) {
      getCurrentLocation();
    }
  }, [userLocation]); // Add a new useEffect to log userLocation when it changes

  // เรียงตามระยะ

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      <View>
        <MapComponent
          width={"100%"}
          height={"50%"}
          locations={clinics}
          search={true}
          currentPosition={true}
          searchBarPosition={50}
          onLocationSelect={() => {}}
          ref={mapRef}
        />
        <View
          style={{
            height: "45%",
            width: "100%",
            backgroundColor: "transparent",
            borderRadius: 50,
            borderBottomEndRadius: 0,
            borderBottomStartRadius: 0,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 60,
              backgroundColor: "#378985",
              width: "100%",
              alignItems: "center",
              borderRadius: 50,
              borderBottomEndRadius: 0,
              borderBottomStartRadius: 0,
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 24, color: "white" }}>คลินิกใกล้ฉัน</Text>
          </View>
          {isLoading ? ( // Show loading indicator when isLoading is true
         <Loading></Loading>
          ) : (
            <View style={{ padding: 10 }}>
              <FlatList
                data={clinics}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  return (
                    <View style={{ width: "100%" }}>
                      <View style={styles.card}>
                        <View style={{ flexDirection: "row" }}>
                          <Image
                            source={{ uri: item.clinicImage }}
                            style={styles.image}
                          />
                          <View style={styles.text}>
                            <Text style={{ fontSize: 15 }}>
                              {" "}
                              ชื่อคลินิก: {item.name}
                            </Text>
                            <View style={{ marginTop: 10 }}>
                              <Text style={{ fontSize: 14 }}>
                                {" "}
                                ชื่อหมอ: {item.vetName}
                              </Text>

                              <View style={styles.arrow}>
                                <Pressable
                                  onPress={() => {
                                    navigation.navigate("Clinicdetail", {
                                      id: item.id,
                                      addressDescription:
                                        item.addressDescription,
                                      certificate: item.certificate,
                                      clinicImage: item.clinicImage,
                                      endTime: item.endTime,
                                      startTime: item.startTime,
                                      tel: item.tel,
                                      vetName: item.vetName,
                                      Name: item.name,
                                      address: item.address,
                                    });
                                  }}
                                >
                                  <Text>
                                    <Ionicons
                                      name="arrow-forward"
                                      size={24}
                                      color="black"
                                    />
                                  </Text>
                                </Pressable>
                              </View>
                            </View>
                          </View>
                        </View>
                        <View style={styles.distance}>
                          <TouchableOpacity
                            style={{}}
                            onPress={() => {
                              goToLocation(
                                item.address.latitude,
                                item.address.longitude
                              );
                            }}
                          >
                            <FontAwesome
                              name="map-marker"
                              size={24}
                              color="#378985"
                            />
                          </TouchableOpacity>
                          <Text>
                            {calculateDistance(userLocation, item.address)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    // alignItems: "stretch",
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
    width: 100,
    height: 90,
    marginTop: 25,
    marginLeft: 10,
    // flexDirection: "row",
  },
  text: {
    marginLeft: 10,
    marginTop: 30,
  },
  card: {
    width: 360,
    height: 130,
    backgroundColor: "#F9F9F9",
    // backgroundColor:"red",
    // marginTop: 50,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 20,
    elevation: 5,
    marginBottom: 10,
  },
  // arrow: {
  //   marginLeft: 80,
  //   marginTop: 20,
  // },
  distance: {
    position: "absolute",
    bottom: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize:20,
  },
});
export default Allclinic;
