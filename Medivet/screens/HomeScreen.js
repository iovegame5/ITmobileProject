import React from "react";
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Switch ,Image} from "react-native";

const HomeScreen = (props) => {
  return (
    <View style={styles.container}>
      
    <View style={styles.container_IT}>
    <Image
      style={styles.logo}
      source={require('../pics/IT_Logo.png')}
    />
          <Text style={styles.header}>คณะเทคโนโลยีสารสนเทศ</Text>
          <Text>สถาบันเทคโนโลยีพระจอมเกล้าคุณทหารลาดกระบัง</Text>

    </View>

   
    <StatusBar style="auto" />
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_IT:{
      // backgroundColor: 'red',
      flex:1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    container_button:{
      // backgroundColor: 'green',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap:20,
      marginBottom: 40,
      width: 300,
    },
    logo:{
      width: 150,
      height: 200,
      marginBottom:0,
      objectFit: 'contain'
      // backgroundColor: 'yellow',
      
    },
    header:{
      fontSize: 20,
      textAlign:'center'
    },
    subHeader:{
  
    },
  
  });
  
export default HomeScreen;
