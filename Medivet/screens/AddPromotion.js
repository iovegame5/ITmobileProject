import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import firebase from "../database/firebase";
import * as FileSystem from "expo-file-system";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//select data from firebase

// const fetchPromotions = async () => {
//     try {
//       const promotionsRef = firebase.firestore().collection("Promotions");
//       const querySnapshot = await promotionsRef.where("user_id", "==", "1").get();
//         // console.log(querySnapshot);
//       const promotions = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         promotions.push({
//           id: doc.id,
//           ...data,
//         });
//       });

//       // Now, "promotions" array contains documents where user_id is 1
//       console.log(promotions);
//     } catch (error) {
//       console.error("Error fetching promotions:", error);
//     }
//   };

const AddPromotionScreen = () => {
  const auth = firebase.auth();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [promotionDetails, setPromotionDetails] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDateText, setStartDateText] = useState(null);
  const [endDateText, setEndDateText] = useState(null);
  const [detailError, setDetailError] = useState(null);
  const [startDateError, setStartDateError] = useState(null);
  const [endDateError, setEndDateError] = useState(null);
  const [imageError, setImageError] = useState(null);
  useEffect(() => {
    detailValidation();
    startDateValidation();
    endDateValidation();
    imageValidation();
  });
  // validation
  const detailValidation = () => {
    if (!promotionDetails) {
      setDetailError("กรุณากรอกรายละเอียดโปรโมชั่น");
    } else {
      setDetailError(null);
    }
  };
  const startDateValidation = () => {
    if (!startDateText) {
      setStartDateError("กรุณาใส่วันที่เริ่มโปรโมชั่น");
    } else {
      setStartDateError(null);
    }
  };
  const endDateValidation = () => {
    if (!endDateText) {
      setEndDateError("กรุณาใส่วันที่สิ้นสุดโปรโมชั่น");
    } else {
      setEndDateError(null);
    }
  };
  const imageValidation = () => {
    if (!image) {
      setImageError("กรุณาเพิ่มรูป");
    } else {
      setImageError(null);
    }
  };

  // Function to handle image selection

  const handleSelectImage = async () => {
    console.log("selected image click");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      imageValidation();
    }
  };

  //upload media files

  const uploadMedia = async () => {
    setUploading(true);
    try {
      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          reject(new TypeError("Network request"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });
      const filename = image.substring(image.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);
      setUploading(false);
      Alert.alert("upload image!!");
      setImage(null);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  // Function to handle form submission
  const addPromotion = async () => {
    // Perform validation
    detailValidation();
    startDateValidation();
    endDateValidation();
    imageValidation();

    if (!detailError && !startDateError && !endDateError && !imageError) {
      // Proceed with adding the promotion if there are no validation errors
      const db = firebase.firestore();
      try {
        console.log("กำลังอัปข้อมูล");
        // Create a new document in the "Promotions" collection
        const docRef = await db.collection("Promotions").add({
          clinic_id: auth.currentUser.uid,
          startDate,
          endDate,
          promotionDetails,
          imageFilename: image
            ? image.substring(image.lastIndexOf("/") + 1)
            : null,
        });

        console.log("Document written with ID: ", docRef.id);
        // Optionally, you can reset the state after adding the promotion.
        setPromotionDetails(null);
        setStartDate(new Date());
        setEndDate(new Date());
        setStartDateText(null);
        setEndDateText(null);
        uploadMedia();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      // fetchPromotions(); // If you want to fetch promotions again after adding a new one.
    } else {
      console.error("กรุณาใส่ข้อมูลให้ครบ");
    }
  };

  const handleStartDateChange = (date) => {
    if (date) {
      setStartDate(date);
      setStartDateText(formatDate(date));
      startDateValidation();
    }
    setShowStartDatePicker(false); // Close the date picker after selecting a date
  };

  const handleEndDateChange = (date) => {
    if (date) {
      setEndDate(date);
      setEndDateText(formatDate(date));
      endDateValidation();
    }
    setShowEndDatePicker(false); // Close the date picker after selecting a date
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month < 10 ? `0${month}` : month}/${year}`;
  };
  // "#378985",
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
        <View style={styles.upperBox}>
          {imageError && (
            <Text
              style={[
                styles.errorText,
                { alignSelf: "flex-start", marginLeft: 40 },
              ]}
            >
              {imageError}
            </Text>
          )}
          <View
            style={[
              styles.imageContainer,
              imageError && { borderWidth: 2, borderColor: "red" },
            ]}
          >
            {!image && (
              <Image
                source={require("../assets/placeholderIMG.png")}
                style={{ width: 350, height: 200 }}
              />
            )}
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 350, height: 200 }}
              />
            )}
            <TouchableOpacity
              style={styles.addImgBtn}
              onPress={handleSelectImage}
            >
              <MaterialCommunityIcons
                name="image-plus"
                size={30}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.header}>เพิ่มโปรโมชั่น</Text>
        </View>
        <View style={styles.bottombox}>
          <View style={{ marginBottom: 10 }}>
            <TextInput
              placeholder="ใส่รายละเอียดโปรโมชั่น"
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              onChangeText={(text) => setPromotionDetails(text)}
              value={promotionDetails}
              onBlur={detailValidation}
              textAlignVertical="top"
              style={[
                {
                
                  padding:   10,
                  borderWidth: 1,
                  borderColor: "grey",
                  borderRadius: 10,
                  width: 300,
                },
                detailError && styles.inputError,
              ]}
            />
            {detailError && <Text style={styles.errorText}>{detailError}</Text>}
          </View>
          <View>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="วันที่เริ่ม"
                value={startDateText} // Format the date and set it to TextInput
                editable={false}
                onBlur={startDateValidation}
              />
              <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
                <AntDesign name="calendar" size={30} color="grey" />
              </TouchableOpacity>
              {showStartDatePicker && (
                <DateTimePickerModal
                  isVisible={showStartDatePicker}
                  mode="date"
                  date={startDate}
                  onConfirm={handleStartDateChange}
                  onCancel={() => setShowStartDatePicker(false)}
                />
              )}
            </View>
            {startDateError && (
              <Text style={styles.errorText}>{startDateError}</Text>
            )}
          </View>
          <View>
            <View style={styles.dateInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="วันสิ้นสุด"
                value={endDateText} // Format the date and set it to TextInput
                editable={false}
                onBlur={endDateValidation}
              />
              <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
                <AntDesign name="calendar" size={30} color="grey" />
              </TouchableOpacity>
              {showEndDatePicker && (
                <DateTimePickerModal
                  isVisible={showEndDatePicker}
                  mode="date"
                  date={endDate}
                  onConfirm={handleEndDateChange}
                  onCancel={() => setShowEndDatePicker(false)}
                />
              )}
            </View>
            {endDateError && (
              <Text style={styles.errorText}>{endDateError}</Text>
            )}
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, { width: 200 }]}
          onPress={addPromotion}
        >
          <Text style={styles.buttonText}>เพิ่มโปรโมชั่น</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    // flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    // padding: 30,
    margin: 0,
    padding: 0,
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  textInput: {
    width: 250,
    height: 40,
    // borderWidth: 1,
    // marginBottom: 10,
    paddingLeft: 5,
  },
  dateInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    borderWidth: 1,
    justifyContent: "center",
    borderColor: "gray",
    padding: 10,
    width: 300,
    borderRadius: 10,
  },
  header: {
    fontSize: 36,
    marginBottom: 10,
    color: "white",
  },
  addImgBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    borderWidth: 1,
    borderRadius: 25,
    padding: 5,
    backgroundColor: "darkgrey",
  },
  upperBox: {
    backgroundColor: "#378985",
    width: "100%",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    alignItems: "center",
    // paddingTop: 50,
  },
  bottombox: {
    paddingTop: 40,
  },
  button: {
    alignSelf: "center",
    marginTop: 20,
    width: 300,
    backgroundColor: "#378985",
    padding: 10,

    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    // marginLeft:20
    paddingTop: 5,
  },
});

export default AddPromotionScreen;
