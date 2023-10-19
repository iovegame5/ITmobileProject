import React, { useRef, useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapComponent from "../component/MapComponent";
import firebase from "../database/firebase";

const ExampleMap = () => {
  const mapRef = useRef(null);
  const [locations, setLocations] = useState([
    {
      location_name: "Location A",
      latitude: 16.7262233,
      longitude: 100.769905,
    },
    { location_name: "Location_B", latitude: 34, longitude: 20 },
    // Add more locations as needed
  ]);

  const goToLocation = (latitude, longitude) => {
    // เป็นฟังชั่นที่เอาไว้เรียกใช้ ฟังก์ชัน goToPosition  ของ map component

    mapRef.current.goToPosition(latitude, longitude); // Pass your desired latitude and longitude
  };
  return (
    <View style={styles.container}>
      {/* การเรียกใช้ Map Component */}
      {/* จะมี property คือ ความสูงและความกว้าง locations คือเอาไว้เก็บ object ของสถานที่ ที่จะให้ pin ไว้ในแมปตลอด  */}
      {/* ref คือ ที่เอาไว้เข้าถึง child component ที่เรียนๆกันใส่ๆไปเหอะอธิบายไม่ถูก */}
      {/* onLocationSelect เป็น callback funnction ที่เอาไว้รองรับว่ามันจะทำอะไรแล้วแต่ที่จะกำหนดในแต่ละ Screen */}
      {/* context คือค่าที่ส่งไว้ว่าจะให้เราทำอะไรตอนที่คลิกบนแผนที่อันนี้คือทำแยกไว้แบบว่า ในหน้าสมัครอยากให้กดคลิกบนแผนที่แล้วจะ pin ตรงที่้เลือก แต่อีกหน้าไม่ต้อง
      เลยใช้ อันนี้แยก โดยจะกำหนดฟังก์ชั่นที่ทำในไฟล์ mapComponent */}
      <MapComponent
        width={"100%"}
        height={"40%"}
        locations={locations}
        onLocationSelect={() => {}}
        ref={mapRef}
      />
      {locations.map((location, index) => (
        <TouchableOpacity style={styles.goButton}
          key={index}
          onPress={() => goToLocation(location.latitude, location.longitude)}
        >
          <Text style={{color:"white"}}>กดเพื่อไปที่ {location.location_name}</Text>
        </TouchableOpacity>
      ))}
      {/* เลือกสถานที่ในแมปส่งในฟอร์ม */}
      <MapComponent
        width={"100%"}
        height={"40%"}
        onLocationSelect={(location) => {
          // setClinicLocation(location);
          // saveClinicAddress(location); // You can choose to save the clinic address immediately or separately
        }}
        context="RegisterScreen" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  goButton:{
    backgroundColor:"black",
    borderWidth:1,
    marginBottom:5,
    height:20,
  }
});

export default ExampleMap;
