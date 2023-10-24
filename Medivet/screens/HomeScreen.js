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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "../database/firebase";
import * as Location from "expo-location";
import Promotion from "../component/PromotionComponent";
import { useNavigation } from "@react-navigation/native";

const auth = firebase.auth();
const HomeScreen = (props) => {
  const navigation = useNavigation();
  const [promotions, setPromotions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchPromotions();
    Location.requestForegroundPermissionsAsync();
  }, []);

  const fetchPromotions = async () => {
    setIsLoading(true);
  
    try {
      const promotionsRef = firebase.firestore().collection("Promotions");
      const querySnapshot = await promotionsRef.get();
  
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
                const clinicRef = firebase.firestore().collection("Clinic").doc(promotion.clinic_id);
                const clinicSnapshot = await clinicRef.get();
                const clinicData = clinicSnapshot.data();
  
                if (clinicData) {
                  promotion.clinicName = clinicData.name;
                  // Add more clinic details as needed
                } else {
                  console.error("Clinic data not found for promotion:", promotion);
                }
              });
  
              await Promise.all(clinicsPromises);
  
              console.log(promotionsData);
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
  

  console.log(auth.currentUser.uid);
  // const renderMealItem = (itemData) => {
  //   return (
  //     //เขียนโค้ดเพิ่ม
  //     <MealItem
  //       title={itemData.item.title}
  //       duration={itemData.item.duration}
  //       complexity={itemData.item.complexity}
  //       affordability={itemData.item.affordability}
  //       image={itemData.item.imageUrl}
  //       onSelectMeal={() => {
  //         props.navigation.navigate("MealDetail", {
  //           foodmenu: itemData.item.title,
  //           howto: itemData.item.steps,
  //         });
  //       }}
  //     />
  //   );
  // };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        // Show a loading indicator (e.g., ActivityIndicator) here.
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* // upcoming appointment */}
            <View>
              <Text style={styles.header}>Upcoming appointment</Text>

              <View style={styles.upcoming_box}>
                <View style={styles.infoappoint}>
                  <Text style={styles.txtinfoappoint}>ชื่อหมอ</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" size={20} color="black" />
                    <Text style={styles.txtinfoappoint}>
                      {" "}
                      30th July, 9.00 am
                    </Text>
                  </View>
                </View>
                <View style={styles.picappoint}>
                  <Image
                    source={require("../pics/Howlcastel.jpeg")}
                    style={styles.piconappoint}
                  />
                </View>
              </View>
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
                <Text style={styles.header}>Common illnesses</Text>
                <Text style={{ color: "blue" }} onPress={() => {navigation.navigate("ill")}}>
                  {" "}
                  all illnesses{" "}
                </Text>
              </View>

              <View style={{ flexDirection: "row", width: "90%", height: 150 }}>
                <View style={styles.commonill}>
                  <Image
                    source={require("../pics/Dog.jpeg")}
                    style={styles.picill}
                  />
                  <Text>Dog</Text>
                </View>
                <View style={styles.commonill}>
                  <Image
                    source={require("../pics/cat.jpeg")}
                    style={styles.picill}
                  />
                  <Text>Cat</Text>
                </View>
              </View>
            </View>

            {/* // Promotion clinic */}
            <View style={{ width: "90%" }}>
              <Text style={styles.header}>Promotion Clinic</Text>
              <Promotion promotions={promotions}></Promotion>
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
});

export default HomeScreen;
