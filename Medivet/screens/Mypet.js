import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  SafeAreaView,
  Button,
  Pressable,
} from "react-native";
import React, { Component } from "react";
import { AntDesign } from '@expo/vector-icons';
import firebase from "../database/firebase";

function calculateAge(dateString) {
  if (!dateString || typeof dateString !== 'string') {
    return 0; // or some default value if date is not available
  }
  
  const parts = dateString.split('/');
  if (parts.length !== 3) {
    return 0; // Handle invalid date format
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - birthDate;
  const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
  return Math.floor(ageInYears);
}

class Mypet extends Component {
  constructor() {
    super();

    this.subjCollection = firebase.firestore().collection('Pet');

    this.state = {
      Mypet_list: [],
    };
  }

  async componentDidMount() {
    this.unsubscribe = this.subjCollection.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getCollection = async (querySnapshot) => {
    const all_data = [];

    const fetchImage = async (imagePath) => {
      try {
        if (imagePath && imagePath !== "") {
          const url = await firebase.storage().ref(imagePath).getDownloadURL();
          return url;
        } else {
          return null;
        }
      } catch (error) {
        console.error('Error fetching image from Firebase Storage:', error);
        return null;
      }
    };

    // Access this.currentUser if it's defined
    const currentUser = firebase.auth().currentUser;

    for (const res of querySnapshot.docs) {
      const { Name, Type, PetType, Weight, Image, Gender, Detail, DateofBirth, OwnerID } = res.data();

      // Check if the pet belongs to the current user
      if (currentUser && currentUser.uid === OwnerID) {
        const imageUrl = await fetchImage(Image);

        const age = calculateAge(DateofBirth);
        console.log(DateofBirth)

        all_data.push({
          key: res.id,
          Name,
          Detail,
          Gender,
          Image: imageUrl,
          PetType,
          Type,
          Weight,
          DateofBirth,
          Age: age,
        });
      }
    }

    this.setState({
      Mypet_list: all_data
    });
  };

  render() {
    const { navigation } = this.props;
    const { Mypet_list } = this.state;
    const isDataEmpty = Mypet_list.length === 0;

    return (
      <SafeAreaView style={styles.container} >
        <FlatList
          data={this.state.Mypet_list}
          renderItem={({ item }) => (
            <SafeAreaView style={styles.cardContainer}>
              <View>
                <View style={styles.card}>
                  <View style={{ flexDirection: 'row' }}>
                    {item.Image ? (
                      <Image source={{ uri: item.Image }} style={styles.image} />
                    ) : (
                      <Image
                        source={require("../pics/dog.jpg")} // Provide a default image
                        style={styles.image}
                      />
                    )}
                    <View style={styles.text}>
                      <Text style={{ fontSize: 20 }}> ชื่อ: {item.Name}</Text>
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 15 }}> เพศ: {item.Gender}</Text>
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>
                          {' '}
                          น้ำหนัก: {item.Weight} กก.
                        </Text>
                      </View>
                      <View style={{ flexDirection: 'row', marginTop: 10 }}>
                        <Text style={{ fontSize: 15 }}> พันธุ์: {item.Type}</Text>
                        <Text style={{ marginLeft: 5, fontSize: 15 }}>
                          {' '}
                          อายุ: {item.Age} ปี
                        </Text>
                      </View>
                      <View style={{ marginTop: 10 }}>
                        <Button title="แก้ไขข้อมูล"  onPress={ () => { navigation.navigate("Edit animal information", {key:item.key, Name: item.Name, Detail: item.Detail,  Gender: item.Gender, Image: item.Image, PetType : item.PetType,  Type : item.Type, DateofBirth: item.DateofBirth, Weight : item.Weight}); } } />
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              
            </SafeAreaView>
            
          )}
          keyExtractor={(item) => item.key}
        />
       <View style={styles.centeredButtonContainer}>
            <Pressable
              style={styles.centeredButton}
              onPress={() => {
                navigation.navigate("AddPet");
              }}
            >
              <AntDesign name="pluscircle" size={50} color="black" />
            
            </Pressable>
          </View>
          <View style={{height:75}}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    width: 150,
    height: 150,
    marginTop: 25,
    marginLeft: 10,
  },
  text: {
    marginLeft: 10,
    marginTop: 30,
  },
  card: {
    width: 380,
    height: 200,
    backgroundColor: '#F9F9F9',
    marginTop: 20,
    marginLeft: 15,
    borderRadius: 20,
  },
  plusButton: {
    position: 'absolute',
    bottom: 150,
    right: 5,
    backgroundColor: 'transparent',
  },
  centeredButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position:"absolute",
    bottom:-10,
    right:-10
  },
  centeredButton: {
    backgroundColor: 'black',
    padding: 25,
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 35,
    textAlign: "center",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor: 'transparent',
  },
  cardContainer:{
    // backgroundColor:"red"
  }
});

export default Mypet;
