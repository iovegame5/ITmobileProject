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
    try {
      const db = firebase.firestore();
      const clinicsRef = db.collection("Clinic");

      const querySnapshot = await clinicsRef.get();

      const clinicData = [];

      // Create an array of promises to fetch image URLs
      const fetchImagePromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        // console.log(data);
        const storageRef = firebase.storage().ref().child(data.clinicImage);
        try {
          const url = await storageRef.getDownloadURL();
          clinicData.push({
            id: doc.id,
            name: data.name,
            address: data.address,
            clinicImage: url,
            vetName: data.vetName,
            // distance:calculateDistance(userLocation, data.address),
            // Add more fields as needed
          });
          setClinics(clinicData);
          console.log(clinics);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      });

      // Wait for all image URLs to be fetched before updating state
      await Promise.all(fetchImagePromises);

      setClinics(clinicData);
      setIsLoading(false); // Set isLoading to false here
      // console.log(clinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
      setIsLoading(false); // Ensure to set isLoading to false in case of an error
    }
  };
  const goToLocation = (latitude, longitude) => {
    // เป็นฟังชั่นที่เอาไว้เรียกใช้ ฟังก์ชัน goToPosition  ของ map component
    console.log(latitude, longitude);
    console.log(user);
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
      const currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation) {
        setUserLocation(currentLocation.coords);
        console.log("userLocation : ", currentLocation.coords); // Log within this function
      } else {
        console.log("Current location not available.");
      }
    } catch (error) {
      console.error("Error getting current location:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("auth", auth)
    console.log("user:", user);
    console.log("rold", role);

    const fetchData = async () => {
      await getCurrentLocation();
      await fetchClinics();
      console.log(isLoading);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.container}>
      {isLoading ? ( // Show loading indicator when isLoading is true
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 20 }}>Loading...</Text>
        </View>
      ) : (
        <View>
          <MapComponent
            width={"100%"}
            height={"50%"}
            locations={clinics}
            onLocationSelect={() => {}}
            ref={mapRef}
          />
          <View
            style={{
              height: "50%",
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
              <Text style={{ fontSize: 24, color: "white" }}>
                คลินิกใกล้ฉัน
              </Text>
            </View>
            <ScrollView>
              <View>
                <FlatList
                  data={clinics}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => {
                    return (
                      <View style={{ backgroundColor: "white" }}>
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
                                      navigation.navigate("Clinicdetail");
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
                              style={{ borderWidth: 1 }}
                              onPress={() => {
                                goToLocation(
                                  item.address.latitude,
                                  item.address.longitude
                                );
                              }}
                            >
                              <Text>go in maps</Text>
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
            </ScrollView>
          </View>
        </View>
      )}
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
    width: 380,
    height: 150,
    backgroundColor: "#F9F9F9",
    // backgroundColor:"red",
    // marginTop: 50,
    marginLeft: 15,
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
  },
});
export default Allclinic;
