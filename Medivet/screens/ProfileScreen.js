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

const ProfileScreen = () => {
    let Aname = "Thanakorn"
    let Asurname = "Amatrawet"
    let Aphone = "0922467684"
    let AbirthDate = "06/01/2546"
    let Aemail = '64070024@kmitl.ac.th'
    let Apassword = '11111111'

  const [email, setEmail] = useState(Aemail);
  const [password, setPassword] = useState(Apassword);
  const [name, setName] = useState(Aname)
 const [surname, setSurname] = useState(Asurname)
 const [birthDate, setBirthDate] = useState(AbirthDate)
 const [phone, setPhone] = useState(Aphone)
 


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
        <Text style={styles.title}>Profile</Text>
        <View style={styles.inputField}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <View style={{}}>
              <Text>First Name</Text>
              <TextInput
                style={styles.input1}
                placeholder="your first name"
                onChangeText={(text) => setName(text)}
                value={name}
              />
            </View>
            <View style={{}}>
              <Text>Last Name</Text>
              <TextInput  value = {surname} style={styles.input1} placeholder="your last name" onChangeText={(text) => setSurname(text)} />
            </View>
          </View>
          <Text>Phone</Text>
          <TextInput
           maxLength={10}
            style={styles.input2}
            placeholder="your phone number"
            keyboardType="phone-pad"
            onChangeText={(text) => setPhone(text)}
            value={phone}

          />
          <Text>Birth Date</Text>
          <TextInput style={styles.input2} placeholder="Date Of Birth"   value = {birthDate}
            onChangeText={(text) => setBirthDate(text)} />
          <Text>Email</Text>
          <TextInput
            style={styles.input2}
            placeholder="example@gmail.com"
            keyboardType="email-address"
          value={email}

          onChangeText={(text) => setEmail(text)}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input2}
            placeholder="must be 8 characters"
            secureTextEntry
            value="11111111"
          />
       
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
        
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
    marginBottom: 20,
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
    marginBottom: 20,
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
    paddingTop: 40,

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
});
export default ProfileScreen;
