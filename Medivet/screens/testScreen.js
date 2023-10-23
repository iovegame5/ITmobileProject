import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
} from "react-native";
import { Alert } from "react-native";
import firebase from "../database/firebase";
import MapComponent from "../component/MapComponent";
import { FontAwesome5 } from "@expo/vector-icons";

// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { RadioButton } from "react-native-paper";

const TestScreen = ({ navigation }) => {
  const [imageUrl, setImageUrl] = useState("");
  
  const storage = firebase.storage();
const storageRef = storage.ref();

// Reference to the image in Firebase Storage
const imageRef = storageRef.child('606526e7-91be-4495-b70c-399ab90362a6.jpeg');

// Get the download URL for the image
imageRef
  .getDownloadURL()
  .then((url) => {
   setImageUrl(url)

  })
  .catch((error) => {
    // Handle any errors, e.g., image not found
    console.error('Error getting image:', error);
  });

  return (
   <View style={styles.container}>
    <Image source={{ uri: imageUrl }} style={{ width: 200, height: 200 }} />
   </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  title: {
    fontSize: 30,
    marginTop: 0,
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  input1: {
    width: 150,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  input2: {
    // width: "97%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 30,
    paddingLeft: 10,
    marginTop: 5,
  },
  toggleText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 40,
  },
  inputField: {
    // backgroundColor: "yellow",
    flex: 1,
    marginTop: 10,
    paddingTop: 10,

    width: "100%",
    // backgroundColor:"red"

    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  logoContainer: {
    alignItems: "center",
  },
  loginButton: {
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#378985",
    padding: 10,
    width: 200, // Set the width of the button here
    alignItems: "center",
    borderRadius: 5,
  },
  buttonContainer: {
    height: 200,
    // backgroundColor:"green",
    justifyContent: "flex-start",
    alignItems: "center,",
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  inputArea: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red", // Change border color to red for validation error
  },
  errorText: {
    color: "red",
  },
  mapContainer: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
  mapButton: {
    alignSelf: "center",
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: "#378985",
    padding: 10,
    width: 100, // Set the width of the button here
    alignItems: "center",
    borderRadius: 5,
  },
});
export default TestScreen;
