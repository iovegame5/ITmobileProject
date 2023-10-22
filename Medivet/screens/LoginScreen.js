import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import firebase from "../database/firebase";
import { useAuth } from "../Auth/AuthContext";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const auth = firebase.auth();

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("all"); // Navigate to the 'Home' screen when the user is already authenticated
      }
    });

    // Make sure to unsubscribe when the component unmounts
    return unsubscribe;
  }, [auth, navigation]);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      // Login was successful, you can navigate to another screen here
    } catch (error) {
      // Handle the login error, e.g., show an alert
      Alert.alert("เข้าสู่ระบบไม่สำเร็จ", "อีเมลล์หรือรหัสผ่านไม่ถูกต้อง");
      setError("อีเมลล์หรือรหัสผ่านไม่ถูกต้อง");
    }
  };

  // Inside the fetchOwnerData function after fetching owner data
  const fetchOwnerData = (uid) => {
    const db = firebase.firestore();
    db.collection("Owner")
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const ownerData = doc.data();
          console.log(ownerData);

          // Navigate to another page and pass owner data as a parameter
          // navigation.navigate('homePage', { ownerData });
        } else {
          console.log("Owner data not found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching owner data: ", error);
      });
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
          <Text style={styles.title}>เข้าสู่ระบบ</Text>
          <View style={styles.inputContainerStyle}>
            <AntDesign
              name="user"
              size={24}
              color="#378985"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>
          <View style={styles.inputContainerStyle}>
            <FontAwesome
              name="lock"
              size={24}
              color="#378985"
              style={styles.icon}
            />

            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>

          <Text
            style={styles.toggleText}
            onPress={() => navigation.navigate("RegisterPage")}
          >
            ยังไม่มียัญชี? สมัตรเลย
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {error && (
            <Text
              style={{
                color: "red",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              {error}
            </Text>
          )}
          <TouchableOpacity
            style={[styles.loginButton]}
            onPress={() => {
              handleLogin(email, password);
            }}
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
    fontWeight: "bold",
  },
  input: {
    flex: 1,
  },
  toggleText: {
    marginTop: 10,
    color: "#378985",
    // textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 40,
  },
  inputField: {
    // backgroundColor: "yellow",
    flex: 1,
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    width: "100%",
    // backgroundColor:"red"
  },
  logoContainer: {
    alignItems: "center",
  },
  loginButton: {
    alignSelf: "center",
    marginTop: 20,
    width: 300,
    backgroundColor: "#378985",
    padding: 10,

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
  inputContainerStyle: {
    flexDirection: "row", // Arrange icon and input horizontally
    alignItems: "center",
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 40,
    marginBottom: 10,
    marginLeft: 10,
    paddingLeft: 15,
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
});
export default LoginScreen;
