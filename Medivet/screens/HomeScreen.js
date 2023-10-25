import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  Linking,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Pressable
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../database/firebase";
import * as Location from "expo-location";
import Promotion from "../component/PromotionComponent";
import { useNavigation } from "@react-navigation/native";
import Loading from "../component/LoadingComponent";
import { useAuth } from "../Auth/AuthContext";
const auth = firebase.auth();
const HomeScreen = (props) => {
  const { user, role, login, logout } = useAuth();
  const navigation = useNavigation();
  const [alldbappoint, setalldbappoint] = useState(null);
  const [promotions, setPromotions] = useState(null);
  const [namedb, setnamedb] = useState("");
  const [detaildb, setdetaildb] = useState("");
  const [datecoming, setdatecoming] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // const getCollection = (querySnapshot) => {
  //   const all_data = [];
  //   querySnapshot.forEach((res) => {
  //     const { ClinicID, OwnerID, PetID, Date, Time } = res.data();
  //     if (OwnerID === user.uid) {
  //       all_data.push({
  //         ClinicID,
  //         PetID,
  //         Date,
  //         Time,
  //       });
  //     } else if (ClinicID === user.uid) {
  //       all_data.push({
  //         OwnerID,
  //         PetID,
  //         Date,
  //         Time,
  //       });
  //     }
  //   });

  //   if (all_data.length > 0) {
  //     // The array is not empty, you can perform actions here
  //     setalldbappoint(all_data); // This sets the state with the data
  //   } else {
  //     // The array is empty
  //     // You can handle this case if needed
  //   }
  // };

 /*  useEffect(() => {
    if (alldbappoint.length > 0) {
      if (role === "Owner") {
        const clinicID = alldbappoint[0].ClinicID;

        // Fetch clinic data
        firebase
          .firestore()
          .collection("Clinic")
          .doc(clinicID)
          .get()
          .then((res) => {
            if (res.exists) {
              const clinicname = res.data();
              setnamedb(clinicname.name);
            } else {
              console.log("Document does not exist!!");
            }
          });
      } else if (role === "Clinic") {
        const ownerID = alldbappoint[0].OwnerID;
        console.log(alldbappoint[0].OwnerID);
        // Fetch owner data
        firebase
          .firestore()
          .collection("Owner")
          .doc(ownerID)
          .get()
          .then((res) => {
            if (res.exists) {
              const ownname = res.data();
              setdetaildb(ownname.firstName);
              console.log(detaildb);
            } else {
              console.log("Document does not exist!!");
            }
          });
      }
    }
  }, [alldbappoint, role]); */
  // useEffect(() => {
  //   const unsubscribe = firebase
  //     .firestore()
  //     .collection("Appointment")
  //     .orderBy("Datestamp")
  //     .onSnapshot(getCollection);
  // }, []);
  useEffect(() => {
    const unsubscribe = firebase.firestore()
      .collection("Promotions")
      .onSnapshot(fetchPromotions);

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.firestore()
    .collection("Appointment")
    .onSnapshot(fetchAppointment);

    return () => {
      unsubscribe();
    }
  }, []);
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate("Main");
    } else {
      fetchAppointment();
      fetchPromotions();
      Location.requestForegroundPermissionsAsync();
    }
  }, [isAuthenticated]);

  const fetchPromotions = async () => {
    setIsLoading(true);

    try {
      const promotionsRef = firebase.firestore().collection("Promotions");
      const querySnapshot = await promotionsRef.get();
      if (querySnapshot.empty) {
        // Check if there are no promotions
        setIsLoading(false); // Set isLoading to false
        return;
      }
      const promotionsData = [];
      const counter = { count: 0 }; // Counter to track the number of promotions fetched

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        const storageRef = firebase.storage().ref().child(data.imageFilename);

        try {
          const url = await storageRef.getDownloadURL();
          const promotion = {
            id: doc.id,
            clinic_id: data.clinic_id,
            imageFilename: url,
            promotionDetails: data.promotionDetails,
            startDate: data.startDate,
            endDate: data.endDate,
            // Add more fields as needed
          };

          promotionsData.push(promotion);
          counter.count++;

          if (counter.count === querySnapshot.size) {
            // All promotions have been fetched
            if (promotionsData.length > 0) {
              setPromotions(promotionsData);

              // Fetch clinic details for each promotion
              const clinicsPromises = promotionsData.map(async (promotion) => {
                const clinicRef = firebase
                  .firestore()
                  .collection("Clinic")
                  .doc(promotion.clinic_id);
                const clinicSnapshot = await clinicRef.get();
                const clinicData = clinicSnapshot.data();

                if (clinicData) {
                  promotion.clinicName = clinicData.name;
                  // Add more clinic details as needed
                } else {
                  console.error(
                    "Clinic data not found for promotion:",
                    promotion
                  );
                }
              });

              await Promise.all(clinicsPromises);

              setIsLoading(false);
            }
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  const fetchAppointment = async () => {
    setIsLoading(true);

    try {
      const appointRef = firebase.firestore().collection("Appointment").orderBy("Date");
      const querySnapshot = await appointRef.get();
      if (querySnapshot.empty) {
        // Check if there are no promotions
        setIsLoading(false); // Set isLoading to false
        return;
      }
      const appointData = [];
      const counter = { count: 0 }; // Counter to track the number of promotions fetched

      querySnapshot.forEach(async (doc) => {
        const data = doc.data();
        try {
          /* const url = await storageRef.getDownloadURL(); */
            if (user.uid === data.OwnerID || user.uid === data.ClinicID) {
              const allappointment = {
                id: doc.id,
                ClinicID: data.ClinicID,
                Date: data.Date,
                OwnerID: data.OwnerID,
                PetID: data.PetID,
                Status: data.Status,
                StatusClinic: data.StatusClinic,
                Time: data.Time
                // Add more fields as needed
              };
              appointData.push(allappointment);
            }
         
          counter.count++;

          if (counter.count === querySnapshot.size) {
            // All promotions have been fetched
            if (appointData.length > 0) {

              // Fetch clinic details for each promotion
              const Promises = appointData.map(async (queue) => {
                const clinicRef = firebase
                  .firestore()
                  .collection("Clinic")
                  .doc(queue.ClinicID);
                const clinicSnapshot = await clinicRef.get();
                const clinicData = clinicSnapshot.data();
                const storageimgclinic = firebase.storage().ref().child(clinicData.clinicImage);
                const url = await storageimgclinic.getDownloadURL();
                
                const petRef = firebase
                  .firestore()
                  .collection("Pet")
                  .doc(queue.PetID);
                const petSnapshot = await petRef.get();
                const petData = petSnapshot.data();
                const storageimgpet = firebase.storage().ref().child(petData.Image);
                const urlpet = await storageimgpet.getDownloadURL();

                const ownerRef = firebase
                  .firestore()
                  .collection("Owner")
                  .doc(queue.OwnerID);
                const ownerSnapshot = await ownerRef.get();
                const ownerData = ownerSnapshot.data();

                if (clinicData && petData) {
                  queue.clinicName = clinicData.name;
                  queue.clinicImage = url
                  queue.pettype = petData.PetType
                  queue.type = petData.Type
                  queue.petImage = urlpet
                  queue.petName = petData.Name
                  queue.ownerName = ownerData.firstName + " " + ownerData.lastName
                  // Add more clinic details as needed
                } else {
                  console.error(
                    "Clinic data not found for promotion:",
                    queue
                  );
                  console.error(
                    "Pet data not found", queue
                  )
                }

              });

              await Promise.all(Promises);
              setIsLoading(false);
              setalldbappoint(appointData);
            }
          }
        } catch (error) {
          console.error("Error fetching image:", error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error fetching promotions:", error);
    }
  };

  // if (alldbappoint.length > 0) {
  //   // console.log("-------------------")
  //   // console.log(alldbappoint[0])
  //   if (role === "Owner") {
  //     const clinicName = firebase
  //     .firestore()
  //     .collection("Clinic")
  //     .doc(alldbappoint[0].ClinicID);
  //   clinicName.get().then((res) => {
  //     if (res.exists) {
  //       const clinicname = res.data();
  //       setnamedb(clinicname.name);
  //       // console.log(namedb);
  //     } else {
  //       console.log("Document does not exist!!");
  //     }
  //   });
  //   } else if (role === "Clinic") {
  //     const ownerName = firebase
  //     .firestore()
  //     .collection("Owner")
  //     .doc(alldbappoint[0].OwnerID);
  //     ownerName.get().then((res) => {
  //     if (res.exists) {
  //       const ownname = res.data();
  //       setdetaildb(ownname.firstName);
  //       console.log(detaildb);
  //     } else {
  //       console.log("Document does not exist!!");
  //     }
  //   });
  //   }

  //   const PetName = firebase
  //     .firestore()
  //     .collection("Pet")
  //     .doc(alldbappoint[0].PetID);
  //   PetName.get().then((res) => {
  //     if (res.exists) {
  //       const petname = res.data();
  //       setdetaildb(petname.Name);
  //       console.log(detaildb);
  //     } else {
  //       console.log("Document does not exist!!");
  //     }
  //   });

  // }

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? ( // Show loading indicator when isLoading is true
        <Loading></Loading>
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* // upcoming appointment */}
            <View>
              <Text style={styles.header}>การนัดที่กำลังมาถึง</Text>
              {alldbappoint === null && (
                   <View style={styles.upcoming_box}>
                   <View style={styles.infoappoint}>
                     <Text style={styles.txtinfoappoint}></Text>
                     <Text style={{fontSize:14, alignSelf:"center"}}>
                     ไม่มีการนัดหมาย
                     </Text>
                     <View
                       style={{ flexDirection: "row", alignItems: "center" }}
                     >
                       <Text style={styles.txtinfoappoint}>
                         {" "}
                      
                       </Text>
                     </View>
                   </View>
                
                 </View>
              )}
              {alldbappoint !== null && 
                  role === "Owner" && (
                    <View style={styles.upcoming_box}>
                      <View style={styles.infoappoint}>
                        <Text style={styles.txtinfoappoint}>{alldbappoint[0].clinicName}</Text>
                        <Text style={styles.txtinfoappoint}>
                          {"ชื่อสัตว์เลี้ยง : " + alldbappoint[0].petName}
                        </Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <AntDesign name="calendar" size={20} color="black" />
                          <Text style={styles.txtinfoappoint}>
                            {" "}
                            {alldbappoint[0].Date +
                              " , " +
                              alldbappoint[0].Time.substring(0, 5) }
                          </Text>
                        </View>
                      </View>
                      <View style={styles.picappoint}>
                        <Image
                          source={{uri: alldbappoint[0].clinicImage}}
                          style={styles.piconappoint}
                        />
                      </View>
                    </View>
                  )}

                  {alldbappoint !== null && role === "Clinic" && (
                    <View style={styles.upcoming_box}>
                      <View style={styles.infoappoint}>
                        <Text style={styles.txtinfoappoint}>
                          เจ้าของ : {alldbappoint[0].ownerName}
                        </Text>
                        <Text style={styles.txtinfoappoint}>พันธุ์ : {alldbappoint[0].type}</Text>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <AntDesign name="calendar" size={20} color="black" />
                          <Text style={styles.txtinfoappoint}>
                            {" "}
                            {alldbappoint[0].Date +
                              ", " +
                              alldbappoint[0].Time.substring(0, 5) }
                          </Text>
                        </View>
                      </View>
                      <View style={styles.picappoint}>
                        <Image
                          source={require("../pics/channels4_profile.jpg")}
                          style={styles.piconappoint}
                        />
                      </View>
                    </View>
                  )}
                </View>
              
            

            {/* // common illnesses */}
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text style={styles.header}>โรคที่มักพบเจอ</Text>
                <Text
                  style={{ color: "blue" }}
                  onPress={() => {
                    navigation.navigate("ill");
                  }}
                >
                  {" "}
                  ทั้งหมด{" "}
                </Text>
              </View>

              <View style={{ flexDirection: "row", width: "90%", height: 150 }}>


              <Pressable
          onPress={() => {
            navigation.navigate("illness", { type: 'Dog' });
          }}
        >
                <View style={styles.commonill}>
                    <Image
                    source={require("../pics/dog.jpg")}
                    style={styles.picill}
                  />
                  <Text>Dog</Text>
                </View>
            </Pressable>
       
            <Pressable
          onPress={() => {
            navigation.navigate("illness", { type: "Cat" });
          }}
        >
                <View style={styles.commonill}>
                  <Image
                    source={require("../pics/catill.jpeg")}
                    style={styles.picill}
                  />
                  <Text>Cat</Text>
                </View>
                </Pressable>
              </View>
            </View>

            {/* // Promotion clinic */}
            <View style={{width: "90%"}}>
            <Text style={styles.header}>โปรโมชั่นคลินิก</Text>
            </View>
            <View style={{ width: "100%", justifyContent: "center" }}>
              
              {promotions ? (
                <Promotion promotions={promotions}></Promotion>
              ) : (
                <View style={{ height: 300 }}>
                  <Text> ไม่มีโปรโมชั่นขณะนี้</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  upcoming_box: {
    flexDirection: "row",
    backgroundColor: "#AAFBDC",
    borderRadius: 20,
    height: 150,
    padding: 10,
    alignItems: "center",
    width: "90%",
  },
  infoappoint: {
    flex: 7,
  },
  picappoint: {
    flex: 5,
  },
  piconappoint: {
    width: "auto",
    height: "80%",
  },
  txtinfoappoint: {
    lineHeight: 32,
    paddingVertical: 6,
  },
  commonill: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flex: 6,
    width: "auto",
  },
  picill: {
    width: "90%",
    height: "75%",
    borderRadius: 20,
  },
  promotion: {
    flexDirection: "row",
    backgroundColor: "#EDEDED",
    borderRadius: 20,
    height: 150,
    padding: 10,
    alignItems: "center",
    width: "90%",
  },
  allpromo: {
    backgroundColor: "#EDEDED",
    height: "auto",
    width: "80%",
    marginVertical: 10,
  },
  promotionbox: {
    alignItems: "center",
  },
  promopic: {
    resizeMode: "cover",
    width: "100%",
    height: 120,
  },
  txtpromo: {
    lineHeight: 32,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  header: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 20,
  },
});

export default HomeScreen;
