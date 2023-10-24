import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import firebase from "../database/firebase";
import { useAuth } from "../Auth/AuthContext";
import Promotion from "../component/PromotionComponent";
import { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps";

import Loading from "../component/LoadingComponent";

const ClinicDetail = ({ route, navigation }) => {
  const [clinicData, setClinicData] = useState({
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
  });
  const [promotions, setPromotions] = useState(null);
  const [currentPromotion, setCurrentPromotion] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { user, isAuthenticated, role } = useAuth();

  useEffect(() => {
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
    } = route.params;

    // Initialize a reference to the Firestore document using the provided 'id'
    const subjDoc = firebase.firestore().collection("Clinic").doc(id);

    subjDoc.get().then((res) => {
      if (res.exists) {
        const subj = res.data();
        setClinicData({
          id,
          Name,
          clinicImage,
          vetName,
          tel,
          startTime,
          endTime,
          certificate,
          addressDescription,
          address,
        });
        console.log(id);
      } else {
        console.log("Document does not exist!!");
      }
    });
  }, []);

  useEffect(() => {
    fetchPromotions();
  }, [clinicData]);
  const fetchPromotions = async () => {
    setIsLoading(true);
    try {
      const promotionsRef = firebase.firestore().collection("Promotions");
      const querySnapshot = await promotionsRef
        .where("clinic_id", "==", clinicData.id)
        .get();
      // console.log(querySnapshot);
      const promotionsData = [];
      const fetchImagePromises = querySnapshot.docs.map(async (doc) => {
        const data = doc.data();
        console.log(data);
        // console.log(data);
        const storageRef = firebase.storage().ref().child(data.imageFilename);
        try {
          const url = await storageRef.getDownloadURL();
          promotionsData.push({
            id: doc.id,
            clinic_id: data.clinic_id,
            imageFilename: url,
            promotionDetails: data.promotionDetails,
            startDate: data.startDate,
            endDate: data.endDate,

            // Add more fields as needed
          });
        } catch (error) {
          console.error("Error fetching image:", error);
          setIsLoading(false);
        }
      });
      await Promise.all(fetchImagePromises);

      if (promotionsData.length > 0) {
        setPromotions(promotionsData);
      } else {
      }
      console.log(promotions);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };
  const renderPromotionCard = ({ item }) => {
    const startDate = item.startDate.toDate().toLocaleDateString();
    const endDate = item.endDate.toDate().toLocaleDateString();

    return (
      <View style={styles.promotionCard}>
        <Image
          style={styles.promotionImage}
          source={{ uri: item.imageFilename }}
        />
        <Text style={styles.promotionTitle}>{item.promotionDetails}</Text>
        <Text>Start Date: {startDate.toString()}</Text>
        <Text>End Date: {endDate.toString()}</Text>
        {/* Render other promotion details as needed */}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.center}>
      {!isLoading ? (
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.img}>
              <Image
                style={{
                  width: 350,
                  height: 200,
                  resizeMode: "contain",
                  borderRadius: 20,
                }}
                source={{ uri: clinicData.clinicImage }}
              />
            </View>

            <SafeAreaView style={styles.layout}>
              <View style={styles.form}>
                <Text
                  style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}
                >
                  {" "}
                  ชื่อคลินิก: {clinicData.Name}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "normal", marginTop: 10 }}
                >
                  {" "}
                  ที่อยู่: {clinicData.addressDescription}
                </Text>
                <Text
                  style={{ fontSize: 18, fontWeight: "normal", marginTop: 10 }}
                >
                  {" "}
                  เบอร์โทร: {clinicData.tel}
                </Text>
                {clinicData.address && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <MapView
                      provider={PROVIDER_GOOGLE}
                      scrollEnabled={false}
                      style={{ height: 200, width: 350, marginTop: 20 }}
                      initialRegion={{
                        latitude: clinicData.address.latitude,
                        longitude: clinicData.address.longitude,
                        latitudeDelta: 0.00422,
                        longitudeDelta: 0.00421,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: clinicData.address.latitude,
                          longitude: clinicData.address.longitude,
                        }}
                        title={clinicData.Name}
                        description="คลิกเพื่อเปิดไป google maps"
                      >
                        <Callout
                          onPress={() => {
                            Alert.alert(
                              "เปิดใน google maps?",
                              "ต้องการหาเส้นทางไปคลินิกด้วย google maps ใช่หรือไม่?",
                              [
                                {
                                  text: "ไม่",
                                  style: "cancel",
                                },
                                {
                                  text: "ใช่",
                                  onPress: () => {
                                    const lat = clinicData.latitude;
                                    const lng = clinicData.longitude;
                                    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                                    Linking.openURL(url);
                                  },
                                },
                              ]
                            );
                          }}
                        ></Callout>
                      </Marker>
                    </MapView>
                  </View>
                )}
                {/* Render other details using clinicData properties */}
                {/* For example, you can render clinicData.addressDescription, clinicData.vetName, etc. */}
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
                  ชื่อสัตว์แพทย์: {clinicData.vetName}
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
                    source={{ uri: clinicData.certificate }}
                  />
                </View>
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
                <View style={{ flexDirection: "row", width: 200 }}>
                  <Text
                    style={{ fontSize: 15, marginLeft: 10, marginTop: 10 }}
                  ></Text>
                  <Text
                    style={{
                      fontSize: 16,
                      marginLeft: 15,
                      marginTop: 13,
                    }}
                  >
                    จันทร์ - เสาร์ {clinicData.startTime} - {clinicData.endTime}
                  </Text>
                </View>
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
                  โปรโมชั่น
                </Text>
                {promotions && promotions.length > 0 ? (
                  <Promotion promotions={promotions} />
                ) : (
                  <Text> ไม่มีโปรโมชั่น </Text>
                )}
                {user && clinicData.id === user.uid ? (
                  <View>
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Text
                        style={{ fontSize: 20, color: "white" }}
                        onPress={() => {
                          navigation.navigate("addPromotion");
                          console.log("add Promotion clicked");
                        }}
                      >
                        เพิ่มโปรโมชั่น
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View></View>
                )}
                {role === "Owner" && (
                  <View>
                    <TouchableOpacity style={styles.buttonContainer}>
                      <Text
                        style={{ fontSize: 20, color: "white" }}
                        onPress={() => {
                          navigation.navigate("FormAppointment", {
                            todo: "addQueue",
                            ClinicID: clinicData.id,
                            clinicName: clinicData.Name,
                          });
                          console.log("eiei");
                        }}
                      >
                        จองคิว
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </SafeAreaView>
          </View>
        </ScrollView>
      ) : (
        <Loading></Loading>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FAF1E4",
    justifyContent: "center",
  },
  img: {
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    resizeMode: "contain",
    borderRadius: 20,
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
    marginTop: 10,
    borderRadius: 30,
    alignItems: "stretch",
    elevation: 5,
  },
  form: {
    // marginRight: 10,
    padding: 10,
  },
  center: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  buttonContainer: {
    width: 200,
    height: 70,
    backgroundColor: "#87D8C3",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    margin: 10,
    borderRadius: 40,
    elevation: 5,
    zIndex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
  },
  promotionCard: {
    width: 320,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  promotionImage: {
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default ClinicDetail;
