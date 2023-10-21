import React, { useState, useEffect } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { RadioButton } from "react-native-paper";

const RegisterScreen = ({ navigation }) => {
  // Owner senction
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checked, setChecked] = React.useState("Patient");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");

  // Clinic Section
  const [clinicOpenTime, setClinicOpenTime] = useState(null);
  const [clinicCloseTime, setClinicCloseTime] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedInput, setSelectedInput] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicDescription, setClinicDescription] = useState("");
  const [clinicTel, setClinicTel] = useState("");
  const [veterinarianName, setVeterinarianName] = useState("");
  const [ClinicAddressDescription, setClinicAddressDescription] = useState("");

  const [clinicNameError, setClinicNameError] = useState(null);
  const [clinicDescriptionError, setClinicDescriptionError] = useState(null);
  const [clinicTelError, setClinicTelError] = useState(null);
  const [veterinarianNameError, setVeterinarianNameError] = useState(null);
  const [clinicAddressError, setClinicAddressError] = useState(null);

  const showTimePicker = (input) => {
    setSelectedInput(input);
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (date) => {
    if (selectedInput === "openTime") {
      setClinicOpenTime(date);
    } else if (selectedInput === "closeTime") {
      setClinicCloseTime(date);
    }
    hideTimePicker();
  };
  const formatTime = (time) => {
    return time
      ? `${time.getHours().toString().padStart(2, "0")}:${time
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "เลือกเวลา";
  };

  // error
  const [error, setError] = useState(null);
  const [firstNameError, setFirstNameError] = useState(null);
  const [lastNameError, setlastNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [birthDateError, setBirthDateError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

  // Map
  const [showMap, setShowMap] = useState(false); // State to control MapComponent visibility
  const [clinicAddress, setClinicAddress] = useState(null);
  const saveClinicAddress = async (location) => {
    // Save the selected location to the clinic address field
    if (location) {
      await setClinicAddress(location); // Update the clinic address state with the selected location
      // You can format the address as needed
      console.log("Latitude: ", clinicAddress.latitude);
      console.log("Longitude: ", clinicAddress.longitude);
    }
    // Hide the MapComponent
    setShowMap(false);
  };
  const auth = firebase.auth();
  // this.subjCollection = firebase.firestore().collection("students");

  const allErrorcheck = () => {
    if (checked === "Patient") {
      firstNameValidation();
      lastNameValidation();
      phoneValidation();
      birthDateValidation();
      emailValidation();
      passwordValidation();
      confirmPasswwordValidation();
      if (
        firstNameError ||
        lastNameError ||
        phoneError ||
        birthDateError ||
        emailError ||
        passwordError ||
        confirmPasswordError
      ) {
        setError("กรุณาใส่ข้อมูลให้ครบ");
      } else {
        setError(null);
      }
    } else if (checked === "Vet") {
      emailValidation();
      passwordValidation();
      confirmPasswwordValidation();
      clinicNameValidation();
      clinicDescriptionValidation();
      clinicTelValidation();
      veterinarianNameValidation();
      clinicAddressValidation();
      if (
        emailError ||
        passwordError ||
        confirmPasswordError ||
        clinicNameError || // Include Vet section validation checks
        clinicDescriptionError ||
        clinicTelError ||
        veterinarianNameError||
        clinicAddressError
      ) {
        setError("กรุณาใส่ข้อมูลให้ครบ");
      } else {
        setError(null);
      }
    }
  };
  const handleRegister = () => {
    if (checked === "Patient") {
      console.log("Owner Register");
      allErrorcheck();
     if(error){
      return;
     }
      console.log("Register Button click");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setError(null);
          const user = userCredential.user;
          const newUserId = user.uid;
          const db = firebase.firestore();
          const ownerData = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            birthDate: birthDate,
            email: email,
            // Add more fields as needed
          };

          db.collection("Owner")
            .doc(newUserId) // Use the user's UID as the document ID
            .set(ownerData)
            .then(() => {
              Alert.alert("Register Success!!");
              console.log("Registration successful");
              console.log("New User ID:", newUserId);
              Keyboard.dismiss();
            })
            .catch((e) => {
              console.error("Error adding data to Firestore: ", e);
            });
        })
        .catch((e) => {
          console.log(e.code);
          if (e.code === "auth/email-already-in-use") {
            setEmailError("อีเมลล์นี้ถูกใช้แล้ว");
            setError("กรุณาใส่ข้อมูลให้ถูกต้อง");
          }
        });
    } else if (checked === "Vet") {
      console.log("Vet Register");
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          setError(null);
          const user = userCredential.user;
          const newUserId = user.uid;
          const db = firebase.firestore();
          const clinicdata = {
            name:clinicName,
            address:clinicAddress,
            addressDescription:ClinicAddressDescription,
            tel:clinicTel,
            vetName:veterinarianName,
            certificate:"test",
            startTime:formatTime(clinicOpenTime),
            endTime:formatTime(clinicCloseTime),
            clinicImage:"testimg",
            // Add more fields as needed
          };

          db.collection("Clinic")
            .doc(newUserId) // Use the user's UID as the document ID
            .set(clinicdata)
            .then(() => {
              Alert.alert("สมัครคลินิกสำเร็จ");
              console.log("Registration successful");
              console.log("New User ID:", newUserId);
              Keyboard.dismiss();
            })
            .catch((e) => {
              console.error("Error adding data to Firestore: ", e);
            });
        })
        .catch((e) => {
          console.log(e.code);
          if (e.code === "auth/email-already-in-use") {
            setEmailError("อีเมลล์นี้ถูกใช้แล้ว");
            setError("กรุณาใส่ข้อมูลให้ถูกต้อง");
          }
        });

    }
  };

  // Validation
  const firstNameValidation = () => {
    // ห้ามว่าง
    if (!firstName) {
      setFirstNameError("กรุณากรอกชื่อ");
    } else {
      setFirstNameError(null);
    }
   
    // console.log(!firstName);
  };
  const lastNameValidation = () => {
    // ห้ามว่าง
    if (!lastName) {
      setlastNameError("กรุณากรอกนามสกุล");
    } else {
      setlastNameError(null);
    }
  
  };
  const emailValidation = () => {
    // ห้ามว่าง
    if (!email) {
      setEmailError("กรุณากรอกอีเมลล์");
    } else {
      setEmailError(null);
    }
   
  };
  const birthDateValidation = () => {
    // ห้ามว่าง
    if (!birthDate) {
      setBirthDateError("กรุณากรอกวันเกิด");
    } else {
      setBirthDateError(null);
    }

  };

  const phoneValidation = () => {
    // ห้ามว่าง ต้อง 10 ตัวอักษร
    if (!phone) {
      setPhoneError("กรุณากรอกหมายเลขโทรศัพท์");
    } else if (phone.length != 10) {
      setPhoneError("กรุณาใส่หมายเลขโทรศัพท์ให้ถูกต้อง");
    } else {
      setPhoneError(null);
    }

  };
  const passwordValidation = () => {
    // ไม่ต่ำกว่า 8 ตัวอักษร
    if (!password) {
      setPasswordError("กรุณาใส่รหัสผ่าน");
    } else if (password.length < 8) {
      setPasswordError("รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษณ");
    } else {
      setPasswordError(null);
    }
   
  };
  const confirmPasswwordValidation = () => {
    if (confirmPasswword != password) {
      setConfirmPasswordError("รหัสผ่านต้องเหมือนกัน");
    } else {
      setConfirmPasswordError(null);
    }

  };
  const clinicNameValidation = () => {
    if (!clinicName) {
      setClinicNameError("กรุณากรอกชื่อคลินิก");
    } else {
      setClinicNameError(null);
    }
 
  };

  const clinicDescriptionValidation = () => {
    if (!clinicDescription) {
      setClinicDescriptionError("กรุณากรอกรายละเอียดคลินิก");
    } else {
      setClinicDescriptionError(null);
    }
    
  };

  const clinicTelValidation = () => {
    if (!clinicTel) {
      setClinicTelError("กรุณากรอกหมายเลขโทรศัพท์คลินิก");
    } else if (clinicTel.length !== 10) {
      setClinicTelError("กรุณาใส่หมายเลขโทรศัพท์ให้ถูกต้อง (10 หลัก)");
    } else {
      setClinicTelError(null);
    }
    
  };

  const veterinarianNameValidation = () => {
    if (!veterinarianName) {
      setVeterinarianNameError("กรุณากรอกชื่อสัตวแพทย์");
    } else {
      setVeterinarianNameError(null);
    }
    
  };

  const clinicAddressValidation = () => {
    if (!clinicAddress) {
      setClinicAddressError("เลือกทีี่ตั้งของคลินิคบนแผนที่");
    } else {
      setClinicAddressError(null);
    }
   
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
        <Text style={styles.title}>สร้างบัญชีผู้ใช้</Text>

        <View style={styles.inputField}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              height: 50,
              borderBottomWidth: 1,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor:
                  checked === "Patient" ? "green" : "transparent",
              }}
              onPress={() => {
                setChecked("Patient");
              }}
            >
              <Text>เจ้าของสัตว์เลี้ยง</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
                textAlign: "center",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: checked === "Vet" ? "green" : "transparent",
              }}
              onPress={() => {
                setChecked("Vet");
              }}
            >
              <Text>คลินิก</Text>
            </TouchableOpacity>
          </View>
          {/* <Text>ชื่อ</Text> */}
          <TextInput
            style={[styles.input2, emailError && styles.inputError]}
            placeholder="อีเมลล์"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
            value={email}
            onBlur={emailValidation}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}

          {/* <Text>Create a passwoed</Text> */}

          <TextInput
            style={[styles.input2, passwordError && styles.inputError]}
            placeholder="must be 8 characters"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            onBlur={passwordValidation}
            value={password}
          />
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
          {/* <Text>Confirm password</Text> */}

          <TextInput
            style={[styles.input2, confirmPasswordError && styles.inputError]}
            placeholder="Confirm password"
            secureTextEntry
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPasswword}
            onBlur={confirmPasswwordValidation}
          />
          {confirmPasswordError && (
            <Text style={styles.errorText}>{confirmPasswordError}</Text>
          )}
          {checked === "Patient" && (
            <View>
              <TextInput
                style={[styles.input2, firstNameError && styles.inputError]}
                placeholder="ชื่อของคุณ"
                onChangeText={(text) => {
                  setFirstName(text);
                }}
                onBlur={firstNameValidation}
                value={firstName}
              />
              {firstNameError && (
                <Text style={styles.errorText}>{firstNameError}</Text>
              )}

              {/* <Text>นามสกุล</Text> */}

              <TextInput
                style={[styles.input2, lastNameError && styles.inputError]}
                placeholder="นามสกุลของคุณ"
                onChangeText={(text) => setLastName(text)}
                onBlur={lastNameValidation}
                value={lastName}
              />
              {lastNameError && (
                <Text style={styles.errorText}>{lastNameError}</Text>
              )}

              {/* <Text>หมายเลขโทรศัพท์</Text> */}
              <TextInput
                maxLength={10}
                style={[styles.input2, phoneError && styles.inputError]}
                placeholder="your phone number"
                keyboardType="phone-pad"
                onChangeText={(text) => setPhone(text)}
                onBlur={phoneValidation}
                value={phone}
              />
              {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
              {/* <Text>Birth Date</Text> */}

              <TextInput
                style={[styles.input2, birthDateError && styles.inputError]}
                placeholder="วัน/เดือน/ปี เกิด"
                onChangeText={(text) => setBirthDate(text)}
                onBlur={birthDateValidation}
                value={birthDate}
              />
              {birthDateError && (
                <Text style={styles.errorText}>{birthDateError}</Text>
              )}
              {/* <Text>Email</Text> */}
            </View>
          )}
        </View>

        <View>
          {checked === "Vet" && (
            <View>
              <TextInput
                style={[styles.input2, clinicNameError && styles.inputError]}
                placeholder="ชื่อคลินิก"
                onChangeText={(text) => setClinicName(text)}
                onBlur={clinicNameValidation}
                value={clinicName}
              />
              {clinicNameError && (
                <Text style={styles.errorText}>{clinicNameError}</Text>
              )}

              <TextInput
                style={[
                  styles.input2,
                  clinicDescriptionError && styles.inputError,
                ]}
                placeholder="รายละเอียดคลินิก"
                onChangeText={(text) => setClinicDescription(text)}
                onBlur={clinicDescriptionValidation}
                value={clinicDescription}
              />
              {clinicDescriptionError && (
                <Text style={styles.errorText}>{clinicDescriptionError}</Text>
              )}

              <TextInput
                style={[styles.input2, clinicTelError && styles.inputError]}
                placeholder="หมายเลขโทรศัพท์คลินิก"
                keyboardType="phone-pad"
                onChangeText={(text) => setClinicTel(text)}
                onBlur={clinicTelValidation}
                value={clinicTel}
              />
              {clinicTelError && (
                <Text style={styles.errorText}>{clinicTelError}</Text>
              )}

              <TextInput
                style={[
                  styles.input2,
                  veterinarianNameError && styles.inputError,
                ]}
                placeholder="ชื่อสัตวแพทย์"
                onChangeText={(text) => setVeterinarianName(text)}
                onBlur={veterinarianNameValidation}
                value={veterinarianName}
              />
              {veterinarianNameError && (
                <Text style={styles.errorText}>{veterinarianNameError}</Text>
              )}

            
              <View></View>
              <Text>รายละเอียดที่อยู่</Text>
              <TextInput
                style={styles.inputArea}
                numberOfLines={4}
                multiline
                placeholder="Clinic Address"
                onChangeText={(text) => setClinicAddressDescription(text)}
                value={ClinicAddressDescription}
              />
               {clinicAddressError&& (
                <Text style={styles.errorText}>{clinicAddressError}</Text>
              )}
             
              <View style={styles.mapContainer}>
             
                <MapComponent
                  width={350}
                  height={200}
                  onLocationSelect={(location) => {
               
                    saveClinicAddress(location); // You can choose to save the clinic address immediately or separately
                  }}
                  context="RegisterScreen" // Pass the context prop
                />
                {/* <TouchableOpacity
                    style={styles.mapButton}
                    onPress={saveClinicAddress}
                  >
                    <Text>ยืนยันที่อยู่</Text>
                  </TouchableOpacity> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={styles.input1}
                  value={formatTime(clinicOpenTime)}
                  onFocus={() => showTimePicker("openTime")}
                />

                <Text style={{ fontSize: 34, textAlign: "center" }}> - </Text>

                <TextInput
                  style={styles.input1}
                  value={formatTime(clinicCloseTime)}
                  onFocus={() => showTimePicker("closeTime")}
                />
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                  locale="th" // Set the locale to Thai
                />
              </View>
            </View>
          )}
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
            style={[styles.loginButton, { width: 200 }]}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Create account</Text>
          </TouchableOpacity>
          <Text
            style={styles.toggleText}
            onPress={() => navigation.navigate("LoginPage")}
          >
            มีบัญชีอยู่แล้ว? เข้าสู่ระบบ
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
    borderColor: "#ccc",
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 2,
    marginLeft: 10,
    marginRight: 30,
    paddingLeft: 10,
    marginTop: 10,
    fontSize: 18,
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
    // backgroundColor:"#FFADAD"
  },
  errorText: {
    color: "red",
    marginLeft: 20,
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
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
});
export default RegisterScreen;
