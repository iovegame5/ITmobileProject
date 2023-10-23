import React, { useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapComponent from '../component/MapComponent';
import firebase from '../database/firebase';

function TestMapScreen() {
  const mapComponentRef = useRef(null);


  return (
    <View style={styles.container}>
      <MapComponent width={400} height={400}/>
   
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TestMapScreen;
