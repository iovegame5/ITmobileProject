import React, { Component } from "react";
import { ScrollView, Image, SafeAreaView, FlatList, View, Text, StyleSheet, Pressable, StatusBar} from "react-native";
import firebase from "../database/firebase";



class Allillness extends Component {
  constructor() {
    super();

    this.subjCollection = firebase.firestore().collection("illness");

    this.state = {
      illness_list: [],
    };
  }

  getCollection = (querySnapshot) => {
    const all_data = [];
    querySnapshot.forEach((res) => {
      //   console.log("res: ", res);
      //   console.log("res.data() : ", res.data());

      const { illnessName, Symytoms, Detail, Cause, Image } = res.data();
      all_data.push({
        key: res.id,
        illnessName,
        Symytoms,
        Detail,
        Cause,
        Image,
      });
    });
    // console.log("all_data : ", all_data);
    this.setState({
      illness_list: all_data,
    });
  };

  componentDidMount() {
    this.unsubscribe = this.subjCollection.onSnapshot(this.getCollection);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

    renderFlatListItem = ({ item }) => {
      const {navigation} = this.props
    
    return (
      <SafeAreaView>
      <ScrollView>
       
              
                <View style={styles.card}>
                  <View style={styles.layoutimage}>
                    <Image source= {{ uri : item.Image}} style={styles.image} />
                  </View>
                  <View style={styles.text}>
                    <Text style={{ fontSize: 16.5 }}>โรค: {item.illnessName}</Text>
                  </View>
                  <View style={{ width: 100, marginLeft: 150, marginTop: 5 }}>
                    <Pressable
                      style={[styles.button, styles.buttonOpen]}
                      onPress={ () => { navigation.navigate("IllnessDetail", {key:item.key, illnessName: item.illnessName, Symytoms: item.Symytoms, Detail: item.Detail, Cause: item.Cause, Image: item.Image }); } }
                    >
                      <Text style={styles.textStyle}>ดูข้อมูล</Text>
                    </Pressable>
                  </View>
                </View>
              
            
      </ScrollView>
      </SafeAreaView>
    );
  }

  render() {
    return (
      <FlatList
      data={this.state.illness_list}
      renderItem={this.renderFlatListItem}
      keyExtractor={(item) => item.key} 
      />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    alignItems: "stretch",
  },
  scrollview: {
    padding: 4,
  },
  child: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    margin: 5,
    borderWidth: 3,
    borderRadius: 20,
    backgroundColor: "orange",
  },
  header: {
    width: "100%",
    height: 120,
    backgroundColor: "#6495ed",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    resizeMode: 'stretch',
    width: 350,
    height: 200,
    borderRadius:20,
  },
  text: {
    marginLeft: 20,
    marginTop: 10
  },
  card: {
    width: 400,
    height: 300,
    backgroundColor: "#F9F9F9",
    marginTop: 20,
    marginBottom:20,
    marginLeft: 5,
    borderRadius: 20,
    elevation:5,
    justifyContent:"ce"
  },
  arrow : {
      marginLeft: 30,
      marginTop: 20
  },
  layoutimage :{
      width: "100%",
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',

      marginTop: 10,
      backgroundColor: "#F9F9F9"


  },
  button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#87D8C3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      width:300,
      height: 300,
      alignItems:'stretch',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      }
  },
  modalText: {
      marginBottom: 15,
      marginTop: 20,
      marginLeft: 10,
      fontSize: 20

    },
    buttonClose: {
      backgroundColor: 'red',
    },
});

export default Allillness;
