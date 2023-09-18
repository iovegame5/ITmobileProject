
import { View, Animated, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import React, { useRef } from "react";
import { Easing } from 'react-native-reanimated';


const HomePageScreen = ({navigation}) => {

  const opacity = useRef(new Animated.Value(0)).current;
  const fadeIn = () => { Animated.timing(opacity, {
  toValue: 1,
  duration: 1000, useNativeDriver: true,
  easing:Easing.inOut(Easing.ease),
  }).start(); };


  React.useEffect(() => {
    fadeIn();
       // Set a timeout to navigate to the Login screen after 4 seconds
       const navigationTimeout = setTimeout(() => {
        navigation.navigate("LoginPage"); // Replace "Login" with your actual Login screen name
      }, 1500); // 4 seconds in milliseconds
  
      // Clear the timeout when the component unmounts (cleanup)
      return () => clearTimeout(navigationTimeout);
    }, [navigation]);
  
  

  
  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../pics/logo.png')} // Adjust the path to your logo image
        style={[styles.logo, { opacity }]}
      />
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"#AAFBDC",
    

  },
  logo: {
    width: 300, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    objectFit:"contain",
    
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    width: 200,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default HomePageScreen;
