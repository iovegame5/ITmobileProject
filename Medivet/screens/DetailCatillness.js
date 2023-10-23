import React, { Component } from "react";
import { ScrollView, Image, SafeAreaView, FlatList, View, Text, StyleSheet, Pressable, StatusBar} from "react-native";
import firebase from "../database/firebase";
import { ListItem } from "react-native-elements";


class DetailCatillness extends Component {
  constructor() {


    super();

    this.state = {
        key: "",
        illnessName: "",
        Symytoms: "",
        Detail: "",
        Cause: "",
        Image: ""
      };

  


  }

  componentDidMount() {
    const {key, illnessName , Symytoms, Detail, Cause, Image} = this.props.route.params
    const subjDoc = firebase
      .firestore()
      .collection("Catillness")
      .doc(key);
    subjDoc.get().then((res) => {
        if (res.exists) {
            const subj = res.data();
            this.setState({
                key: key,
                illnessName: illnessName,
                Symytoms: Symytoms,
                Detail: Detail,
                Cause: Cause,
                Image: Image
            });
            console.log(this.state.Image)
      } else {
        console.log("Document does not exist!!");
      }
    });
  }

//   getCollection = (querySnapshot) => {
//     const all_data = [];
//     querySnapshot.forEach((res) => {
//       //   console.log("res: ", res);
//       //   console.log("res.data() : ", res.data());

//       const { illnessName, Symytoms, Detail, Cause, Image } = res.data();
//       all_data.push({
//         key: res.id,
//         illnessName,
//         Symytoms,
//         Detail,
//         Cause,
//         Image,
//       });
//     });
//     // console.log("all_data : ", all_data);
//     this.setState({
//       illness_list: all_data,
//     });
//   };

//   componentDidMount() {
//     this.unsubscribe = this.subjCollection.onSnapshot(this.getCollection);
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

    render() {
        
    return (
        <View>
          <ScrollView>

                
                <Image source= {{ uri : this.state.Image}} style={styles.image} />

              <View style={styles.detail}>
              <Text style={{marginBottom: 10}}><Text style={styles.headText}>โรค:</Text><Text style={{fontSize: 19}}> {this.state.illnessName}</Text></Text>
                <Text style={{marginBottom: 10}} > <Text style={styles.headText}>รายละเอียด:</Text> <Text style={{fontSize: 16}}>{this.state.Detail}</Text></Text>
                <Text style={{marginBottom: 10}} > <Text style={styles.headText}>สาเหตุ :</Text> <Text style={{fontSize: 16}}>{this.state.Cause}</Text></Text>
                <Text> <Text style={styles.headText}>อาการ :</Text> <Text style={{fontSize: 16}}>{this.state.Symytoms}</Text></Text>
                </View>
                </ScrollView>

        </View>
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
    width: 375,
    height: 200,
    
    marginTop: 20,
    marginBottom: 20, 
    marginLeft: 12,
    resizeMode: "contain"
  },
  text: {
    marginLeft: 20,
    marginTop: 10
  },
  card: {
    width: 390,
    height: 600,
    backgroundColor: "grey",
    marginLeft: 1,
    marginTop: 30,
    
    borderRadius: 20,
  },
  arrow : {
      marginLeft: 30,
      marginTop: 20
  },
  layoutimage :{
      width: 300,
      height: 200,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 48,
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
    headText : {
      fontSize: 20,
      fontWeight: "bold",
      
      

    },
    detail:{
      width: 300,
      height: 800,
      marginLeft: 40

    }
});

export default DetailCatillness;