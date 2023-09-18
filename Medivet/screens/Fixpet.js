// import แบบ react-native
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    Button,
    TextInput,
    Pressable,
    Platform,
    SafeAreaView
  
  } from "react-native";
  import React, { useState } from "react";
  import Dropdown from "react-native-input-select";
  import DateTimePicker from "@react-native-community/datetimepicker";
  
  
  const FixPet = ({route, navigation}) => {
    const [dateOfbirth, setDateOfBirth] = useState("");
    const [country, setCountry] = React.useState();
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
  
    const toggleDatepicker = () => {
      setShowPicker(!showPicker);
    };
    const onChange = ({ type }, selectedDate) => {
      if (type == "set") {
        const currentDate = selectedDate;
        setDate(currentDate);
  
        if (Platform.OS === "android") {
          toggleDatepicker();
          setDateOfBirth(currentDate.toDateString());
        }
      } else {
        toggleDatepicker();
      }
    };
  
    return (
      <SafeAreaView style={styles.center}>
        <ScrollView> 
      <View style={styles.container}>
        <View style={styles.img}>
          <Image
            style={{ width: 250, height: 250 }}
            source={require("../pics/channels4_profile.jpg")}
          />
        </View>
        <Button title="addimg" />
  
            
            <SafeAreaView style={styles.layout}>
              <View style={styles.form}>
                <View>
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  ชื่อ
                </Text>
  
                <TextInput
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  // onChangeText={numberInputHandler}
                  // value={enteredValue}
                  //...เพิ่ม property value และ onChangeText...
                />
  
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 20,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  เพศ
                </Text>
  
                <Dropdown
                  placeholder="Gender"
                  options={[
                    { label: "Male", value: "ma" },
                    { label: "Female", value: "fe" },
                  ]}
                  selectedValue={country}
                  onValueChange={(value) => setCountry(value)}
                  primaryColor={"green"}
                />
  
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  พันธุ์
                </Text>
  
                <TextInput
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  // onChangeText={numberInputHandler}
                  // value={enteredValue}
                  //...เพิ่ม property value และ onChangeText...
                />
  
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  น้ำหนัก
                </Text>
  
                <TextInput
                  style={styles.input}
                  blurOnSubmit
                  autoCapitalize="none"
                  autoCorrect={false}
                  maxLength={20}
                  keyboardType="numeric"
                  // onChangeText={numberInputHandler}
                  // value={enteredValue}
                  //...เพิ่ม property value และ onChangeText...
                />
  
                <Text
                  style={{
                    fontSize: 20,
                    marginTop: 5,
                    fontWeight: "bold",
                    marginLeft: 5,
                  }}
                >
                  วันเกิด
                </Text>
  
                {!showPicker && (
                  <Pressable onPress={toggleDatepicker}>
                    <TextInput
                      style={styles.input}
                      placeholder="Sat Aug 21 2004"
                      value={dateOfbirth}
                      onChangeText={setDateOfBirth}
                      placeholderTextColor="#11182744"
                      editable={false}
                      // onChangeText={numberInputHandler}
                      // value={enteredValue}
                      //...เพิ่ม property value และ onChangeText...
                    />
                  </Pressable>
                )}
  
                {showPicker && (
                  <DateTimePicker
                    mode="date"
                    display="spinner"
                    value={date}
                    onChange={onChange}
                  />
                )}
  
                <View style={{ marginTop: 10 }}>
                  <Button title="Submit" onPress={() => navigation.navigate("MyPet")} />
                </View>
              </View>
  
              </View>
            </SafeAreaView>
            
        
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      height: 550,
      marginTop: 10,
      borderRadius: 20,
      alignItems: "center",
    },
    input: {
      height: 40,
      margin: 4,
      borderWidth: 1,
      padding: 10,
      width: 190,
    },
    form: {
      width: 200,
      height: 100,
      backgroundColor: "white",
      alignItems:"centerr"
    },
    center: {
      alignItems: 'center'
    }
  });
  
  
  
  export default FixPet;
  