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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

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
        <View style={styles.logoContainer}>
          <Image
            source={require("../pics/logo.png")} // Adjust the path to your logo image
            style={styles.logo}
          />
        </View>
        <View style={styles.inputField}>
          <Text style={styles.title}>Login</Text>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="********"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Text
            style={styles.toggleText}
            onPress={() =>   navigation.navigate("RegisterPage")}
          >
            Don't have an account? Sign Up
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.loginButton, ]}
            onPress={handleLogin}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
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
  },
  logo: {
    width: 250, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    resizeMode: "contain",
    marginTop: 70,
    // backgroundColor: "red",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight:"bold"
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft:15,
    marginTop:15,
  },
  toggleText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
    alignSelf:"flex-end",
    marginRight:20,
    marginBottom:40,
    
  },
  inputField: {
    // backgroundColor: "yellow",
    flex: 1,
    marginTop: 30,
   paddingLeft:30,
   paddingRight:30,
    width:"100%",
    // backgroundColor:"red"
  },
  logoContainer:{
    alignItems:"center"

  },
  loginButton: {
    alignSelf: "center",
    marginTop: 20,
    width:300,
    backgroundColor: "#378985",
    padding: 10,

    alignItems: "center",
    borderRadius: 5,
  },
  buttonContainer:{
    height:200,
    // backgroundColor:"green",
    justifyContent:"flex-start",
    alignItems:'center,'
  },
  buttonText:{
    fontSize:20,
    color:"white",
  }
});
export default LoginScreen;
