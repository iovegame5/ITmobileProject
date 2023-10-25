import React, { useState, useEffect } from "react";
import { ScrollView, Image, SafeAreaView, FlatList, View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
import firebase from "../database/firebase";

function AllIllness({ route, navigation }) {
  const { type } = route.params;
  const [illnessList, setIllnessList] = useState([]);
  console.log(type)

  useEffect(() => {
    const subjCollection = firebase.firestore().collection("illness");

    const unsubscribe = subjCollection.onSnapshot((querySnapshot) => {
      const allData = [];
      querySnapshot.forEach((res) => {
        const { illnessName, Symytoms, Detail, Cause, Image, Type } = res.data();
        if (Type === type) {
          allData.push({
            key: res.id,
            illnessName,
            Symytoms,
            Detail,
            Cause,
            Image,
            Type
          });
        }
        console.log(Type)
      });

      setIllnessList(allData);
    });

    return () => {
      unsubscribe();
    };
  }, [type]);

  const renderFlatListItem = ({ item }) => {
    return (
      <SafeAreaView>
        <ScrollView>
          <View style={styles.card}>
            <View style={styles.layoutimage}>
              <Image source={{ uri: item.Image }} style={styles.image} />
            </View>
            <View style={styles.text}>
              <Text style={{ fontSize: 16.5 }}>ชื่อโรค: {item.illnessName}</Text>
            </View>
            <View style={{ width: 100, marginLeft: 150, marginTop: 5 }}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  navigation.navigate("IllnessDetail", {
                    key: item.key,
                    illnessName: item.illnessName,
                    Symytoms: item.Symytoms,
                    Detail: item.Detail,
                    Cause: item.Cause,
                    Image: item.Image,
                  });
                }}
              >
                <Text style={styles.textStyle}  onPress={ () => { navigation.navigate("IllnessDetail", {key:item.key, illnessName: item.illnessName, Symytoms: item.Symytoms, Detail: item.Detail, Cause: item.Cause, image: item.Image }); } }>ดูข้อมูล</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <FlatList
      data={illnessList}
      renderItem={renderFlatListItem}
      keyExtractor={(item) => item.key}
    />
  );
}

const styles = StyleSheet.create({
  // Your style definitions remain the same

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

export default AllIllness;
















// import React, { useState, useEffect } from "react";
// import { ScrollView, Image, SafeAreaView, FlatList, View, Text, StyleSheet, Pressable, StatusBar } from "react-native";
// import firebase from "../database/firebase";

// function AllIllness({ navigation }) {
//   const { type } = route.params;
//   const [illnessList, setIllnessList] = useState([]);

//   useEffect(() => {
//     const subjCollection = firebase.firestore().collection("illness");

//     const unsubscribe = subjCollection.onSnapshot((querySnapshot) => {
//       const allData = [];
//       querySnapshot.forEach((res) => {
//         const { illnessName, Symytoms, Detail, Cause, Image, Type } = res.data();
//         allData.push({
//           key: res.id,
//           illnessName,
//           Symytoms,
//           Detail,
//           Cause,
//           Image,
//           Type
//         });
//       });

//       setIllnessList(allData);
//     });

//     return () => {
//       unsubscribe();
//     };
//   }, [type]);

//   const renderFlatListItem = ({ item }) => {
//     return (
//       <SafeAreaView>
//         <ScrollView>
//           <View style={styles.card}>
//             <View style={styles.layoutimage}>
//               <Image source={{ uri: item.Image }} style={styles.image} />
//             </View>
//             <View style={styles.text}>
//               <Text style={{ fontSize: 16.5 }}>ชื่อโรค: {item.illnessName}</Text>
//             </View>
//             <View style={{ width: 100, marginLeft: 150, marginTop: 5 }}>
//               <Pressable
//                 style={[styles.button, styles.buttonOpen]}
//                 onPress={() => {
//                   navigation.navigate("IllnessDetail", {
//                     key: item.key,
//                     illnessName: item.illnessName,
//                     Symytoms: item.Symytoms,
//                     Detail: item.Detail,
//                     Cause: item.Cause,
//                     Image: item.Image,
//                   });
//                 }}
//               >
//                 <Text style={styles.textStyle}  onPress={ () => { navigation.navigate("IllnessDetail", {key:item.key, illnessName: item.illnessName, Symytoms: item.Symytoms, Detail: item.Detail, Cause: item.Cause, image: item.Image }); } }>ดูข้อมูล</Text>
//               </Pressable>
//             </View>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     );
//   };

//   return (
//     <FlatList
//       data={illnessList}
//       renderItem={renderFlatListItem}
//       keyExtractor={(item) => item.key}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   // Your style definitions remain the same

//   container: {
//         flex: 1,
//         paddingTop: StatusBar.currentHeight,
//         alignItems: "stretch",
//       },
//       scrollview: {
//         padding: 4,
//       },
//       child: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         height: 150,
//         margin: 5,
//         borderWidth: 3,
//         borderRadius: 20,
//         backgroundColor: "orange",
//       },
//       header: {
//         width: "100%",
//         height: 120,
//         backgroundColor: "#6495ed",
//         flexDirection: "row",
//         alignItems: "center",
//       },
//       image: {
//         resizeMode: 'stretch',
//         width: 350,
//         height: 200,
//         borderRadius:20,
//       },
//       text: {
//         marginLeft: 20,
//         marginTop: 10
//       },
//       card: {
//         width: 400,
//         height: 300,
//         backgroundColor: "#F9F9F9",
//         marginTop: 20,
//         marginBottom:20,
//         marginLeft: 5,
//         borderRadius: 20,
//         elevation:5,
//         justifyContent:"ce"
//       },
//       arrow : {
//           marginLeft: 30,
//           marginTop: 20
//       },
//       layoutimage :{
//           width: "100%",
//           height: 200,
//           alignItems: 'center',
//           justifyContent: 'center',
    
//           marginTop: 10,
//           backgroundColor: "#F9F9F9"
    
    
//       },
//       button: {
//           borderRadius: 20,
//           padding: 10,
//           elevation: 2,
//         },
//         buttonOpen: {
//           backgroundColor: '#87D8C3',
//         },
//         textStyle: {
//           color: 'white',
//           fontWeight: 'bold',
//           textAlign: 'center',
//         },
//         centeredView: {
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           marginTop: 22,
//         },
//         modalView: {
//           margin: 20,
//           backgroundColor: 'white',
//           borderRadius: 20,
//           width:300,
//           height: 300,
//           alignItems:'stretch',
//           shadowColor: '#000',
//           shadowOffset: {
//             width: 0,
//             height: 2,
//           }
//       },
//       modalText: {
//           marginBottom: 15,
//           marginTop: 20,
//           marginLeft: 10,
//           fontSize: 20
    
//         },
//         buttonClose: {
//           backgroundColor: 'red',
//         },

  
// });

// export default AllIllness;
