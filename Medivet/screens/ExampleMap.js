import React, { useRef, useState } from "react";
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapComponent from "../component/MapComponent";
import firebase from "../database/firebase";

const ExampleMap = () => {
  const mapRef = useRef(null);
  const [clinics, setClinics] = useState([
    {
      address: { latitude: 37.41330556511386, longitude: -122.12723068892957 },
      clinicImage:
        "https://firebasestorage.googleapis.com/v0/b/medivet-db13a.appspot.com/o/3dcac2da-2082-400b-95ac-9e865f2d12f6.jpeg?alt=media&token=7e6fd525-633e-4a08-b7a6-72fe296b5c1c",
      id: "nFQYdn56bJUxiJrIBwqU3V0xVlm2",
      name: "eee",
      vetName: "Mr.asd",
    },
  ]);
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
        locations={clinics}
        onLocationSelect={() => {}}
        ref={mapRef}
      />
      {clinics.map((location, index) => (
        <TouchableOpacity
          style={styles.goButton}
          key={index}
          onPress={() => goToLocation(location.address.latitude, location.address.longitude)}
        >
          <Text style={{ color: "white" }}>
            กดเพื่อไปที่ {location.name}
          </Text>
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
  goButton: {
    backgroundColor: "black",
    borderWidth: 1,
    marginBottom: 5,
    height: 20,
  },
});

export default ExampleMap;
