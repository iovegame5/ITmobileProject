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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleLogin = () => {
    // Handle login logic here
    console.log("Login button pressed");
    // Dismiss the keyboard after login button press

    Keyboard.dismiss();
    navigation.navigate("RegisterPage");
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
            source={require("../pics/clinic.jpeg")} // Adjust the path to your logo image
            style={styles.logo}
          />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.title}>คลิกนิกรักสัตว์</Text>
            <Text style={styles.contentText}>ที่อยู่: 69/69 ถนนลำดวนเวย์ ตำบลหนองลำดวน อำเภอนวนนาง จังหวัด ชินโนะสุเกะ </Text>
            <Text style={styles.contentText}>เบอร์โทร: 99-999-9999 </Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>นายแพทย์ ดึกดุ๋ย ปุ๋ยปด</Text>
            <Text style={styles.contentText}>ประวัติการศึกษา: ฮอกวอทต์</Text>
            <Text style={styles.contentText}>อายุ: 69 ปี </Text>
            <Text style={styles.contentText}>ประสบการณ์: 70 ปี</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>เวลาทำการ</Text>
            <Text style={styles.contentText}>จันทร์-ศุกร์ </Text>
            <Text style={styles.contentText}>8:00น. - 18:00น.</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>โปรโมชั่น</Text>
            <TouchableOpacity style={styles.promotion}>
              <Image
                source={require("../pics/clinic.jpeg")} // Adjust the path to your logo image
                style={styles.promotionImg}
              />
              <Text style={styles.promotionText}>
                Description Description Description Description Description
              </Text>
              <Text style={styles.promotionText2}>
                1-30 กย. 2566
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.promotion}>
              <Image
                source={require("../pics/clinic.jpeg")} // Adjust the path to your logo image
                style={styles.promotionImg}
              />
              <Text style={styles.promotionText}>
                Description Description Description Description Description
              </Text>
              <Text style={styles.promotionText2}>
                1-30 กย. 2566
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF1E4",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 250, // Adjust the width as needed
    // Adjust the height as needed
    resizeMode: "contain",
    marginTop: 30,
    // backgroundColor: "red",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold",
  },

  toggleText: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 40,
  },
  contentContainer: {
    // backgroundColor: "yellow",
    flex: 1,
    marginTop: 30,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 10,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  logoContainer: {
    alignItems: "center",
  },
  content: {
    borderBottomWidth: 1,
    paddingBottom: 5,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  contentText: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 5,
  },
  promotion: {
    alignSelf: "center",
    width: "100%",
    // height:300,
    backgroundColor: "#ccc",
    alignItems: "center",
    // justifyContent:"center"
    borderRadius: 20,
    marginTop:20,
  },
  promotionImg: {
    borderRadius: 10,
    // marginTop: 20,
    width: "100%",
    // height: 150,
  },
  promotionText: {
    fontSize: 16,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 5,
    marginBottom: 20,
  },
  promotionText2: {
    fontSize: 12,
    alignSelf: "flex-start",
    paddingLeft: 20,
    paddingTop: 5,
    marginBottom: 20,
  },
});
export default LoginScreen;
