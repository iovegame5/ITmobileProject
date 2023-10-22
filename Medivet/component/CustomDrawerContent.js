import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import firebase from "../database/firebase";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../Auth/AuthContext";


function CustomDrawerContent(props) {
  const {logout} = useAuth();
    const navigation = useNavigation();
    const handleSignOut = async () => {
        try {
          await logout();
          
        } catch (error) {
          console.error("Error signing out:", error);
        }
        navigation.navigate("Main");
      }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={styles.signOutContainer}>
        <Button title="Sign Out" onPress={() => handleSignOut()} />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  signOutContainer: {
    marginTop: 20,
  },
});

export default CustomDrawerContent;
