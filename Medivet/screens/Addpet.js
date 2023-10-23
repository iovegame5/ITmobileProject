import React, { useState, useEffect } from "react";
import {
  View,
  Text,   
  StyleSheet,
  ScrollView,
  Image,
  Button,
  TextInput,
  SafeAreaView,
  Alert,
  Pressable,
  TouchableOpacity, 
  Modal, 
  FlatList
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "../database/firebase";


import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const Addpet = () => {
  const [showAllSpecies, setShowAllSpecies] = useState(false);

  const Speciedog = [
    { label: "เชา เชา", value: "เชา เชา" },
    { label: "ไซบีเรียน ฮัสกี้", value: "ไซบีเรียน ฮัสกี้" },
    { label: "คอลลี่", value: "Orange" },
    { label: "เซนต์เบอร์นาร์ด", value: "เซนต์เบอร์นาร์ด" },
    { label: "ชิวาวา", value: "ชิวาวา" },
    { label: "โกลเด้น รีทรีฟเวอร์", value: "โกลเด้น รีทรีฟเวอร์" },
    { label: "ซามอยด์", value: "ซามอยด์" },
    { label: "ร็อตไวเลอร์", value: "ร็อตไวเลอร์" },
    { label: "ชิสุ", value: "ชิสุ" },
    // Add more species options here
  ];
  const Speciecat = [
    { label: "บริติช ช็อตแฮร์", value: "บริติช ช็อตแฮร์" },
    { label: "อะบิสซิเนียน", value: "อะบิสซิเนียน" },
    { label: "เอ็กซ์โซติก ช็อตแฮร์", value: "เอ็กซ์โซติก ช็อตแฮร์" },
    { label: "แมวขาวมณี", value: "แมวขาวมณี" },
    { label: "สก๊อตทิช โฟลด์", value: "สก๊อตทิช โฟลด์" },
    { label: "แมวเปอร์เซีย", value: "แมวเปอร์เซีย" },
    { label: "แมววิเชียรมาศ", value: "แมววิเชียรมาศ" },
    { label: "แมวนอร์วีเจียน ฟอเรสต์", value: "แมวนอร์วีเจียน ฟอเรสต์" },
    { label: "อเมริกันช็อตแฮร์", value: "อเมริกันช็อตแฮร์" },
    
    // Add more species options here
  ];
  
  const[userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [speciesModalVisible, setSpeciesModalVisible] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // To display only the first 5 species items
  const initialSpeciesList = showAllSpecies ? Speciecat : Speciecat.slice(0, Speciecat.length);

  const [speciesList, setSpeciesList] = useState(initialSpeciesList);

  // ... Rest of your code ...

  const toggleShowAllSpecies = () => {
  setShowAllSpecies(!showAllSpecies);
};

  const toggleSpeciesModal = () => {
    setSpeciesModalVisible(!speciesModalVisible);
  };

  const selectSpecies = (item) => {
    setSelectedSpecies(item);
    toggleSpeciesModal();
    setValue(item. value)
  };

  const renderSpeciesItem = ({ item }) => (
    <TouchableOpacity onPress={() => selectSpecies(item)}>
      <View style={styles.modalItemContainer}>
        <Text style={styles.modalItem}>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );


  const [date, setDate] = useState(new Date());

  const [datetxt, onChangedatetxt] = React.useState("");

  const [showDate, setShowDate] = useState(false);
  const [name, setName] = useState("");

  const [species, setSpecies] = useState("");
  const [sex, setSex] = useState("");

  const [weight, setWeight] = useState(0);
  const [Sex, onChangeSex] = useState([
    { label: "Female", value: "female", key: "female" },
    { label: "Male", value: "male", key: "male" },
  ]);
  const [opensex, setOpensex] = useState(false);
  const [valuesex, setValuesex] = useState(null);


  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [pettype, setpettype] = useState("");
  const [type, onChangetype] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ]);
  const [opentype, setOpentype] = useState(false);
  const [valuetype, setValuetype] = useState(null);

  const [detail, setDetail] = useState("");

  const subjCollection = firebase.firestore().collection("Pet");

  const toggleDatePicker = () => {
    setShowDate(!showDate);
  };

  const onchange = ({ type }, selectDate) => {
    console.log(type);
    console.log(selectDate);
    if (type == "set") {
      const currentdate = selectDate;
      setDate(currentdate);

      if (Platform.OS == "android") {
        setShowDate();
        onChangedatetxt(formatDate(currentdate));
      }
    } else {
      selectDate();
    }
  };

  const confirmIosDate = () => {
    onChangedateText(formatDate(date));
    toggleDatePicker();
  };

  const formatDate = (rawDate) => {
    const formattedDate = `${rawDate.getDate()}/${
      rawDate.getMonth() + 1
    }/${rawDate.getFullYear()}`;
    return formattedDate;
  };

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

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
    }
  };


  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserId(user.uid);
         // Set the user ID
      }
    };

    fetchUserData();
  }, []);
  useEffect(() => {
    if (pettype === "Cat") {
      setSpeciesList(Speciecat);
    } else if (pettype === "Dog") {
      setSpeciesList(Speciedog);
    }
  }, [pettype]);

  // const uploadMedia = async () => {
  //   setUploading(true);
  //   try {
  //     const { uri } = await FileSystem.getInfoAsync(image);
  //     const blob = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = () => {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = (e) => {
  //         reject(new TypeError("Network request"));
  //       };
  //       xhr.responseType = "blob";
  //       xhr.open("GET", uri, true);
  //       xhr.send(null);
  //     });
  //     const filename = image.substring(image.lastIndexOf("/") + 1);
  //     const ref = firebase.storage().ref().child(filename);

  //     await ref.put(blob);
  //     setUploading(false);
  //     Alert.alert("upload image!!");
  //     setImage(null);
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //   }
  // };

  const storeSubject = async () => {
    try {
      if (!image) {
        Alert.alert("Please select an image.");
        return;
      }

      if (!datetxt || !name || !sex || !weight || !value) {
        Alert.alert("Please fill in all required fields.");
        return;
      }

      setUploading(true);

      // Upload the image
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

      // After successful image upload, add the data to Firestore
      const result = await subjCollection.add({
        DateofBirth: datetxt,
        Detail: detail,
        Gender: sex,
        Image: filename,
        Name: name,
        OwnerID: userId,
        PetID: 2,
        PetType: pettype,
        Type: value,
        Weight: weight,
      });
      

      setUploading(false);
      Alert.alert("Success", "Pet and image uploaded successfully!");

      // Reset the form fields
      onChangedatetxt("");
      setName("");
      setSpecies(null);
      setSex(null);
      setWeight(0);
      setDetail("");
      setImage(null);
      setpettype("")
    } catch (error) {
      console.error("Error adding pet: ", error);
      setUploading(false);
      Alert.alert(
        "Error",
        "An error occurred while uploading the pet and image."
      );
    }
  };

  return (
    <ScrollView style={styles.container2}>
     
        <View style={styles.container}>
          <View style={styles.img}>
            <View style={styles.imageContainer}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 350, height: 200 }}
                />
              )}
            </View>

            <Button title="เพิ่มรูปสัตว์เลี้ยง" onPress={handleSelectImage} />
          </View>

          <View style={styles.layout}>
            <View style={styles.form}>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 12,
                  marginLeft: 5,
                }}
              >
                ประเภท
              </Text>

              <DropDownPicker
                open={opentype}
                value={pettype}
                items={type}
                setOpen={setOpentype}
                setValue={setpettype}
                setItems={onChangetype}
                style={styles.dropdown}
                placeholder="ประเภทของสัตว์เลี้ยง"
              />
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  marginLeft: 5,
                }}
              >
                ชื่อ
              </Text>

              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="ชื่อสัตว์เลี้ยง"
              />

              <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 5 }}>
                เพศ
              </Text>
              <DropDownPicker
                open={opensex}
                value={sex}
                items={Sex}
                setOpen={setOpensex}
                setValue={setSex}
                setItems={onChangeSex}
                style={styles.dropdown}
                placeholder="เพศของสัตว์เลี้ยง"
              />

              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                  marginLeft: 5,
                }}
              >
                น้ำหนัก
              </Text>
              <TextInput
                style={styles.input}
                value={weight.toString()} // Convert the number to a string
                onChangeText={(text) => setWeight(Number(text))} // Convert the input value back to a number
                placeholder="น้ำหนักสัตว์เลี้ยง"
                keyboardType="numeric"
              />

<Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
          พันธุ์
        </Text>
        <TouchableOpacity onPress={toggleSpeciesModal}>
          <Text style={styles.input}>
            {selectedSpecies ? selectedSpecies.label : "Select Species"}
          </Text>
        </TouchableOpacity>
       <Modal
  animationType="slide"
  transparent={true}
  visible={speciesModalVisible}
>
  <View style={styles.centeredView}>
    <View style={styles.modalView}>
      <ScrollView style={{maxHeight: 300}}>
        <FlatList
          data={speciesList}
          keyExtractor={(item) => item.value}
          renderItem={renderSpeciesItem}
        />
      </ScrollView>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={toggleSpeciesModal}
      >
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal> 
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 10,
                  marginLeft: 5,
                }}
              >
                วันเกิด
              </Text>
              {showDate && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onchange}
                  style={styles.datepicker}
                />
              )}

              <Pressable onPress={toggleDatePicker}>
                <TextInput
                  style={styles.input}
                  onChangeText={onChangedatetxt}
                  value={datetxt}
                  placeholder="Date"
                  editable={false}
                  onPressIn={toggleDatePicker}
                />
              </Pressable>
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 20,
                  marginLeft: 5,
                }}
              >
                ข้อมูลเพิ่มเติม
              </Text>

              <TextInput
                style={styles.inputarea}
                value={detail}
                onChangeText={setDetail}
                placeholder="ข้อมูลเพิ่มเติม"
                multiline={true}
                numberOfLines={4}
              />
              <View style={{ marginTop: 10 }}>
                <Button title="เพิ่ม" onPress={storeSubject} />
              </View>
            </View>
          </View>
        </View>
    
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    backgroundColor: "#FAF1E4",
  },
  container: {
    alignItems: "center",
    backgroundColor: "#FAF1E4",
  },
  img: {
    width: 250,
    height: 260,
    marginTop: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  layout: {
    backgroundColor: "white",
    width: 420,
    height: 850,
    marginTop: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  input: {
    height: 40,
    margin: 4,
    borderWidth: 0.5,
    padding: 10,
    width: 190,
    borderRadius: 10,
  },
  form: {
    width: 200,
    height: 100,
    backgroundColor: "white",
    alignItems: "centerr",
  },
  center: {
    alignItems: "center",
    flex: 1,
  },
  dropdown: {
    height: 40,
    borderWidth: 0.5,
    borderRadius: 10,
    marginVertical: 10,
  },
  inputarea: {
    height: 150,
    borderWidth: 0.5,
  },
  imageContainer: {
    marginVertical: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalItem: {
    fontSize: 18,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
  },

});

export default Addpet;