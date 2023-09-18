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
// import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { RadioButton } from "react-native-paper";

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = React.useState("Patient");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login button pressed");
    // Dismiss the keyboard after login button press
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.select({
        ios: 0,
        android: -500, // You might need to adjust this value based on your layout
      })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.inputField}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{}}>
              <Text>First Name</Text>
              <TextInput
                style={styles.input1}
                placeholder="your first name"
                onChangeText={(text) => setEmail(text)}
                value={email}
              />
            </View>
            <View style={{}}>
              <Text>Last Name</Text>
              <TextInput style={styles.input1} placeholder="your last name" />
            </View>
          </View>
          <Text>Phone</Text>
          <TextInput
           maxLength={10}
            style={styles.input2}
            placeholder="your phone number"
            keyboardType="phone-pad"
          />
          <Text>Birth Date</Text>
          <TextInput style={styles.input2} placeholder="Date Of Birth" />
          <Text>Email</Text>
          <TextInput
            style={styles.input2}
            placeholder="example@gmail.com"
            keyboardType="email-address"
          />
          <Text>Create a passwoed</Text>
          <TextInput
            style={styles.input2}
            placeholder="must be 8 characters"
            secureTextEntry
          />
          <Text>Confirm password</Text>
          <TextInput
            style={styles.input2}
            placeholder="Confirm password"
            secureTextEntry
          />
       
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center"  }}>
            <Text>Patient</Text>
            <RadioButton.Android
              value="Patient"
              status={checked === "Patient" ? "checked" : "unchecked"}
              onPress={() => setChecked("Patient")}
            />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>Vet</Text>
            <RadioButton.Android
              value="Vet"
              status={checked === "Vet" ? "checked" : "unchecked"}
              onPress={() => setChecked("Vet")}
            />
          </View>
        </View>
        <View >{checked === "Vet" &&(
           <View >
           <Text >Clinic Name</Text>
           <TextInput style={styles.input2} placeholder="Date Of Birth" />
           <Text>Description</Text>
           <TextInput
             style={styles.input2}
             placeholder="Description"

           />
             
             <Text>Address</Text>
           <TextInput style={styles.inputArea} numberOfLines={4} multiline placeholder="Clinic Address" />
        
             
           <View
             style={{ flexDirection: "row", justifyContent: "space-around" }}
           >
             <View style={{}}>
               <Text>Tel.</Text>
               <TextInput
                 style={styles.input1}
                 placeholder="Clinic Telephone Number"
                 onChangeText={(text) => setEmail(text)}
                 value={email}
               />
             </View>
             <View style={{}}>
               <Text>Office Hours</Text>
               <TextInput style={styles.input1} placeholder="4:00 PM" />
             </View>
           </View>
           
           <Text>Veterian Name</Text>
           <TextInput style={styles.input2} placeholder="Veterian Name" />
           <View
             style={{ flexDirection: "row", justifyContent: "space-around" }}
           >
             <View style={{}}>
               <Text>Education</Text>
               <TextInput
                 style={styles.input1}
                 placeholder="Education"
                 onChangeText={(text) => setEmail(text)}
                 value={email}
               />
             </View>
             <View style={{}}>
               <Text>Birth Date</Text>
               <TextInput style={styles.input1} placeholder="Birth Date" />
             </View>
           </View>
           </View>
        )}</View>
       
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.loginButton, { width: 200 }]}
            // onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
          <Text
            style={styles.toggleText}
            onPress={() =>   navigation.navigate("LoginPage")}
          >
           Already have an account? Sign In
          </Text>
        </View>
      
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputArea:{
  
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 5,
    paddingLeft: 10,
    marginTop: 5,
  },
});
export default RegisterScreen;
