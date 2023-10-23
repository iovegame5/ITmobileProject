import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  TextInput,
  Alert,
  Pressable,
  ScrollView
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "../database/firebase";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";


const formatDateForTextInput = (date) => {
  if (date instanceof Date && !isNaN(date)) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  } else {
    return ""; // Handle invalid date input gracefully
  }
};

const Fixpet = ({ route, navigation }) => {
  const [species, setSpecies] = useState("");

  const Speciedog = [
    { label: "เชา เชา", value: "เชา เชา" },
    { label: "ไซบีเรียน ฮัสกี้", value: "ไซบีเรียน ฮัสกี้" },
    { label: "คอลลี่", value: "คอลลี่" },
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


  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [userId, setUserId] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [changeImage, setChangeImage] = useState(false);

  const [date, setDate] = useState(new Date());

  const [datetxt, onChangedatetxt] = useState(
    formatDateForTextInput(new Date())
  );

  const [showDate, setShowDate] = useState(false);
  const [name, setName] = useState("");

  const [sex, setSex] = useState("");
  const [weight, setWeight] = useState(0);

  const [Sex, onChangeSex] = useState([
    { label: "Female", value: "female", key: "female" },
    { label: "Male", value: "male", key: "male" },
  ]);
  const [opensex, setOpensex] = useState(false);

  const [pettype, setpettype] = useState("");
  const [type, onChangetype] = useState([
    { label: "Dog", value: "Dog" },
    { label: "Cat", value: "Cat" },
  ]);
  const [opentype, setOpentype] = useState(false);
  const [valuetype, setValuetype] = useState(null);

  const [detail, setDetail] = useState("");

  const subjCollection = firebase.firestore().collection("Pet");

  const [Specie, onChangeSpecie] = useState([
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const toggleDatePicker = () => {
    setShowDate(!showDate);
    if (!showDate) {
      const dateArray = datetxt.split("/");
      const day = parseInt(dateArray[0], 10);
      const month = parseInt(dateArray[1], 10) - 1; // Months are 0-based
      const year = parseInt(dateArray[2], 10);

      if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
        const selectedDate = new Date(year, month, day);
        setDate(selectedDate);
      } else {
        // Handle invalid date components here (e.g., show an error message)
      }
    }
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
      setChangeImage(true);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        setUserId(user.uid);
      }
    };

    fetchUserData();
  }, []);

  const handlePetTypeChange = (petType) => {
    setpettype(petType);
    // Dynamically set the species options based on the selected pet type
    if (petType === "Dog") {
      setSpeciesOptions(Speciedog);
      setSpecies(Speciedog[0].value); // Set a default value for dog species
    } else if (petType === "Cat") {
      setSpeciesOptions(Speciecat);
      setSpecies(Speciecat[0].value); // Set a default value for cat species
    }
  };

  useEffect(() => {
    if (route.params) {
      const { PetType } = route.params;
      setpettype(PetType); // Make sure to set the pet type
      if (PetType === "Cat") {
        setSpeciesOptions(Speciecat);
      } else {
        setSpeciesOptions(Speciedog);
      }
    }
  }, [route.params]);
  

  const storeSubject = async () => {
    try {
      if (!datetxt || !name || !sex || !weight || !species) {
        Alert.alert("โปรดกรอกข้อมูลให้ครบ");
        return;
      }

      setUploading(true);
      // ถ้าไม่เปลี่ยนรูป
      if (!changeImage) {
        console.log("ไม่เปลี่ยนรูป");
        if (route.params && route.params.key) {
          await subjCollection.doc(route.params.key).update({
            DateofBirth: datetxt,
            Detail: detail,
            Gender: sex,
            Name: name,
            PetType: pettype,
            Weight: weight,
            Type: species,
          });

          Alert.alert("สำเร็จ!!", "ัอัปเดตข้อมูลสัตว์เลี้ยงเสร็จสิ้น", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("MyPet"); // Navigate back to the pet list
              },
            },
          ]);
        } else {
          Alert.alert("อัปเดตไม่สำเร็จ ไม่พบข้อมูลสัตว์เลี้ยง");
        }
      } else if (changeImage) {
        console.log("เปลี่ยนรูป");
        let imageUrl = image; // Use the existing image URL or initialize with a default value
        if (image) {
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
          imageUrl = filename; // Update imageUrl with the new image URL
        }

        const datetxtString = formatDateForTextInput(datetxt);

        if (route.params && route.params.key) {
          await subjCollection.doc(route.params.key).update({
            DateofBirth: datetxt,
            Detail: detail,
            Gender: sex,
            Image: imageUrl, // Use the updated imageUrl
            Name: name,
            PetType: pettype,
            Weight: weight,
            Type: species,
          });

          setUploading(false);
          Alert.alert("แก้ไขเสร็จเรียบร้อย", "ข้อมูลสัตว์เลี้ยงถุกอัปเดตเรียบร้อย", [
            {
              text: "OK",
              onPress: () => {
                navigation.navigate("MyPet");
              },
            },
          ]);
        } else {
          setUploading(false);
          Alert.alert(
            "No existing pet found",
            "There is no existing pet with the provided information."
          );
        }
      }
    } catch (error) {
      console.error("Error adding/updating pet: ", error);
      setUploading(false);
      Alert.alert(
        "Error",
        "An error occurred while uploading/updating the pet data."
      );
    }
  };
  const deletePet = async () => {
    try {
      if (route.params && route.params.key) {
        // Delete the image from Firebase Storage
        if (image && image !== route.params.Image) {
          await firebase.storage().ref().child(route.params.Image).delete();
        }

        // Delete the pet data from Firestore
        await subjCollection.doc(route.params.key).delete();

        Alert.alert("สำเร็จ", "ข้อมูลสัตว์เลี้ยงถูกลบแล้ว", [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("MyPet"); // Navigate back to the pet list
            },
          },
        ]);
      } else {
        Alert.alert(
          "No existing pet found",
          "There is no existing pet with the provided information."
        );
      }
    } catch (error) {
      console.error("Error deleting pet: ", error);
      Alert.alert("Error", "An error occurred while deleting the pet.");
    }
  };

  useEffect(() => {
    const {
      key,
      Name,
      Gender,
      Type,
      Detail,
      Image,
      PetType,
      DateofBirth,
      Weight,
    } = route.params;
    console.log(DateofBirth);
    setpettype(PetType);
    setName(Name);
    setSex(Gender);
    onChangedatetxt(DateofBirth);
    setSpecies(Type);
    setDate(DateofBirth);
    setImage(Image);
    setWeight(Weight);
    setDetail(Detail)
    const parsedDate = new Date(DateofBirth);

    if (!isNaN(parsedDate.getTime())) {
      setDate(parsedDate);
      onChangedatetxt(formatDateForTextInput(parsedDate));
    }
  }, [route.params]);

  return (
      <View style={styles.container2}>
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.img}>
            <View style={styles.imageContainer}>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 350, height: 200, borderRadius: 25 }}
                />
              )}
            </View>
            <Button title="เปลี่ยนรูป" onPress={handleSelectImage} />
          </View>

          <View style={styles.layout}>
            <View style={styles.form}>
            <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                    ประเภท
                  </Text>
                  <DropDownPicker
      open={opentype}
      value={pettype}
      items={type}
      setOpen={setOpentype}
      setValue={handlePetTypeChange}
      setItems={onChangetype}
      style={{
        container: {
          width: 100,
          marginBottom: 10,
        },
        item: {
          justifyContent: 'flex-start',
        },
        dropDownContainer: {

          borderRadius: 10,
        },
        labelStyle: {
          fontSize: 16,
        },
        selectedLabelStyle: {
          fontSize: 16,
        },
        style: {
          backgroundColor: 'white',
        },
      }}
      placeholder="ประเภทของสัตว์เลี้ยง"
                  />
              <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 5 }}>
                ชื่อ
              </Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="ชื่อสัตว์เลี้ยง"
              />
              
                 
                  <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                    เพศ
                  </Text>
                  <DropDownPicker
                    open={opensex}
                    value={sex}
                    items={Sex}
                    setOpen={setOpensex}
                    setValue={setSex}
                    setItems={onChangeSex}
                    style={{
                      container: {
                        width: 100,
                        marginBottom: 10,
                      },
                      item: {
                        justifyContent: 'flex-start',
                      },
                      dropDownContainer: {
              
                        borderRadius: 10,
                      },
                      labelStyle: {
                        fontSize: 16,
                      },
                      selectedLabelStyle: {
                        fontSize: 16,
                      },
                      style: {
                        backgroundColor: 'white',
                      },
                    }}
                    placeholder="เพศของสัตว์เลี้ยง"
                  />

                <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                  น้ำหนัก
                </Text>
                <TextInput
                  style={styles.input}
                  value={weight.toString()}
                  onChangeText={(text) => {
                    if (text === "" || !isNaN(text)) {
                      setWeight(text === "" ? 0 : parseInt(text));
                    }
                  }}
                  placeholder="น้ำหนักสัตว์เลี้ยง"
                  keyboardType="numeric"
                />

                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 10,

                    marginLeft: 5,
                  }}
                >
                  พันธุ์
                </Text>

                <DropDownPicker
                  items={speciesOptions}
                open={open}
                value={species}
                setOpen={setOpen}
                setValue={setSpecies}
                setItems={onChangeSpecie}
                placeholder="พันธ์ของสัตว์เลี้ยง"
                style={{
                  container: {
                    width: 100,
                    marginBottom: 10,
                  },
                  item: {
                    justifyContent: 'flex-start',
                  },
                  dropDownContainer: {
        
                    borderRadius: 10,
                  },
                  labelStyle: {
                    fontSize: 16,
                  },
                  selectedLabelStyle: {
                    fontSize: 16,
                  },
                  style: {
                    backgroundColor: 'white',
                  },
                }}
                />
              <Text style={{ fontSize: 20, marginTop: 10, marginLeft: 5 }}>
                วันเกิด
              </Text>
              {showDate && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={(event, selectedDate) => {
                    setShowDate(false);
                    if (selectedDate) {
                      setDate(selectedDate);
                      onChangedatetxt(formatDateForTextInput(selectedDate));
                    }
                  }}
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
                />
              </Pressable>
              <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 5 }}>
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
              <View style={{ marginTop: 10, width: 100 }}>
                <Button title="เพิ่ม" onPress={storeSubject} />
                {/* <Button title="ลบ" onPress={deletePet} /> */}
              </View>
              <View style={{ marginTop: 10, width: 100 }}>
             
                <Button title="ลบ" color={"red"} onPress={deletePet} />
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
       
      </View>


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
    marginTop: 20,
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
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    width: 150
  },
  form: {
    width: 200,
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
  },
  dropdown: {
    height: 40,

    borderRadius: 10,
    marginVertical: 10,
    width: 160,
    marginLeft:20
  },
  inputarea: {
    height: 150,
    borderWidth: 0.5,
  },
  imageContainer: {
    marginVertical: 20,
  },
});

export default Fixpet;
