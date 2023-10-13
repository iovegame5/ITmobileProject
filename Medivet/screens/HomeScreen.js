import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, Switch, Image, Linking, ScrollView, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons'; 


const HomeScreen = (props) => {
  const renderMealItem = (itemData) => {
    return (
      //เขียนโค้ดเพิ่ม
      <MealItem
        title={itemData.item.title}
        duration={itemData.item.duration}
        complexity={itemData.item.complexity}
        affordability={itemData.item.affordability}
        image={itemData.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate("MealDetail", {
            foodmenu: itemData.item.title,
            howto: itemData.item.steps,
          });
        }}
      />
    );
  };

  return (
    <View style={{flex: 1}}>

      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
           {/* // upcoming appointment */}
      <View>
        <Text style={styles.header}>Upcoming appointment</Text>

        <View style={styles.upcoming_box}>
          <View style={styles.infoappoint}>
            <Text style={styles.txtinfoappoint}>ชื่อหมอ</Text>
            <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <AntDesign name="calendar" size={20} color="black" />
            <Text style={styles.txtinfoappoint}> 30th July, 9.00 am</Text>
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
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
          <Text style={styles.header}>Common illnesses</Text>
          <Text
            style={{ color: "blue"}}
            onPress={() => Linking.openURL("http://google.com")}
          >
            {" "}
            all illnesses{" "}
          </Text>
        </View>

        <View style={{ flexDirection: "row", width: "90%", height: 150 }}>
          <View style={styles.commonill}>
            <Image source={require("../pics/Dog.jpeg")} style={styles.picill} />
            <Text>Dog</Text>
          </View>
          <View style={styles.commonill}>
            <Image source={require("../pics/cat.jpeg")} style={styles.picill} />
            <Text>Cat</Text>
          </View>
        </View>
      </View>

      {/* // Promotion clinic */}
      <View style={{width: '90%'}}>       
        <Text style={styles.header}>Promotion Clinic</Text>
        
        <View style={styles.promotionbox}>
          <View style={styles.allpromo}>
            <Image
              source={require("../pics/promo1.jpeg")}
              style={styles.promopic}
            />
            <Text style={styles.txtpromo}>ชื่อโปรโมชั่น</Text>
            <Text style={styles.txtpromo}>ชื่อคลินิก</Text>
          </View>

          <View style={styles.allpromo}>
            <Image
              source={require("../pics/promo2.jpeg")}
              style={styles.promopic}
            />
            <Text style={styles.txtpromo}>ชื่อโปรโมชั่น</Text>
            <Text style={styles.txtpromo}>ชื่อคลินิก</Text>
          </View>

          <View style={styles.allpromo}>
            <Image
              source={require("../pics/promo3.jpeg")}
              style={styles.promopic}
            />
            <Text style={styles.txtpromo}>ชื่อโปรโมชั่น</Text>
            <Text style={styles.txtpromo}>ชื่อคลินิก</Text>
          </View>

          <View style={styles.allpromo}>
            <Image
              source={require("../pics/promo4.jpeg")}
              style={styles.promopic}
            />
            <Text style={styles.txtpromo}>ชื่อโปรโมชั่น</Text>
            <Text style={styles.txtpromo}>ชื่อคลินิก</Text>
          </View>
        </View>
      </View>
        </View>
      </ScrollView>

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
    borderRadius: 20
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
    height: 'auto',
    width: '80%',
    marginVertical: 10
  },
  promotionbox: {
    alignItems: "center",
  },
  promopic: {
    resizeMode: 'cover',
    width: '100%',
    height: 120
  },
  txtpromo: {
    lineHeight: 32,
    paddingHorizontal: 6,
    paddingVertical: 3 
  },
  header: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 10
  },
});

export default HomeScreen;