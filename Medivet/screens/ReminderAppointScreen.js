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
import QueueOwner from "../components/QueueOwner";

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
          <View style={styles.alllist}>
            <QueueOwner></QueueOwner>
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
  alllist: {
    width: "100%",
    alignItems: "center",
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
