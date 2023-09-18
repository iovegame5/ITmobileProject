import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Image,
  Linking,
  ScrollView,
  Button,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const ReminderAppoint = ({ route, navigation }) => {
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
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* // upcoming appointment */}
          <Text style={styles.header}>คิวเข้ารักษา</Text>
          <View style={styles.alllist}>
            <View style={styles.eachbox}>
              <View style={styles.upcoming_box}>
                <View style={styles.picappoint}>
                  <Image
                    source={require("../pics/promo1.jpeg")}
                    style={styles.piconappoint}
                  />
                </View>
                <View style={styles.infoappoint}>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์เลี้ยง</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์แแพทย์</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" size={20} color="black" />
                    <Text style={styles.txtinfoappoint}>
                      {" "}
                      30th July, 9.00 am
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container_button}>
                <Button
                  onPress={() => {
                    navigation.navigate("FormAppointment");
                  }}
                  title="Edit"
                  color="#76655A"
                />
                <Button onPress={""} title="Delete" color="#E0A7BB" />
              </View>
            </View>
            <View style={styles.eachbox}>
              <View style={styles.upcoming_box}>
                <View style={styles.picappoint}>
                  <Image
                    source={require("../pics/promo2.jpeg")}
                    style={styles.piconappoint}
                  />
                </View>
                <View style={styles.infoappoint}>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์เลี้ยง</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์แแพทย์</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" size={20} color="black" />
                    <Text style={styles.txtinfoappoint}>
                      {" "}
                      30th July, 9.00 am
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container_button}>
                <Button
                  onPress={() => {
                    navigation.navigate("FormAppointment");
                  }}
                  title="Edit"
                  color="#76655A"
                />
                <Button onPress={""} title="Delete" color="#E0A7BB" />
              </View>
            </View>
            <View style={styles.eachbox}>
              <View style={styles.upcoming_box}>
                <View style={styles.picappoint}>
                  <Image
                    source={require("../pics/promo3.jpeg")}
                    style={styles.piconappoint}
                  />
                </View>
                <View style={styles.infoappoint}>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์เลี้ยง</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์แแพทย์</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" size={20} color="black" />
                    <Text style={styles.txtinfoappoint}>
                      {" "}
                      30th July, 9.00 am
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container_button}>
                <Button
                  onPress={() => {
                    navigation.navigate("FormAppointment");
                  }}
                  title="Edit"
                  color="#76655A"
                />
                <Button onPress={""} title="Delete" color="#E0A7BB" />
              </View>
            </View>
            <View style={styles.eachbox}>
              <View style={styles.upcoming_box}>
                <View style={styles.picappoint}>
                  <Image
                    source={require("../pics/promo4.jpeg")}
                    style={styles.piconappoint}
                  />
                </View>
                <View style={styles.infoappoint}>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์เลี้ยง</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อคลินิก</Text>
                  <Text style={styles.txtinfoappoint}>ชื่อสัตว์แแพทย์</Text>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="calendar" size={20} color="black" />
                    <Text style={styles.txtinfoappoint}>
                      {" "}
                      30th July, 9.00 am
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.container_button}>
                <Button
                  onPress={() => {
                    navigation.navigate("FormAppointment");
                  }}
                  title="Edit"
                  color="#76655A"
                />
                <Button onPress={""} title="Delete" color="#E0A7BB" />
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
    borderRadius: 20,
    height: 150,
    padding: 10,
    alignItems: "center",
    width: "90%",
  },
  alllist: {
    width: "100%",
    alignItems: "center",
  },
  infoappoint: {
    flex: 7,
    paddingLeft: 10,
  },
  picappoint: {
    flex: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingRight: 5,
  },
  piconappoint: {
    width: "auto",
    height: "85%",
  },
  txtinfoappoint: {
    lineHeight: 24,
    paddingVertical: 4,
  },
  container_button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
    alignContent: "center",
  },
  eachbox: {
    backgroundColor: "#F9F9F9",
    marginVertical: 20,
    borderRadius: 20,
    elevation: 10
  },
  logo: {
    width: 150,
    height: 200,
    marginBottom: 0,
    objectFit: "contain",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10
  },
});

export default ReminderAppoint;
