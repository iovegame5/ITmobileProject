import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  View,
  TouchableOpacity,
  Alert,
  Linking,
  Text,
  TextInput,
  Button,
  Image,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-screens";

const GOOGLE_MAPS_API_KEY = "AIzaSyBGoG5IIsgjqFIejLzoeI2doLphb_xu02Q"; // Replace with your Google Maps API key

function MapComponent(
  {
    width,
    height,
    onLocationSelect,
    context,
    locations,
    search,
    currentPosition,
    searchBarPosition,
  },
  ref
) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [location, setLocation] = useState(null);
  const mapViewRef = useRef(null);
  const [havePermission, setHavePermission] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userLocation, setUserLocation] = useState(null);

  const handleSearch = async () => {
    // ส่ง api ไป googlemaps แล้วรีเทินข้อมูลสถานที่มา
    console.log("search");
    if (searchQuery) {
      try {
        const requestURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${GOOGLE_MAPS_API_KEY}`;
        const response = await fetch(requestURL);
        // console.log('Response:', response);

        if (!response.ok) {
          console.error("Error searching for location:", response.status);
          return;
        }

        const data = await response.json();
        console.log(data);
        if (data.results.length > 0) {
          // ถ้าเจอข้อมูลให้ pin map แล้วก็เลื่อนไปตรงนั้น
          const firstResult = data.results[0];
          const { lat, lng } = firstResult.geometry.location;
          goToPosition(lat, lng);
          // mapViewRef.current.animateToRegion({
          //   latitude: lat,
          //   longitude: lng,
          //   latitudeDelta: 0.0022,
          //   longitudeDelta: 0.0421,
          // });
        } else {
          console.log("Location not found.");
          Alert.alert("ไม่พบสถานที่นี้");
        }
      } catch (error) {
        console.error("Error searching for location:", error);
      }
    }
  };

  const getPermissions = async () => {
    // ขอ permission มือถือ
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      // console.log('Permission:', havePermission);
      setHavePermission(false);
      return;
    } else {
      setHavePermission(true);
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      // console.log('Location:', location);
      // console.log('Permission:', havePermission);
    }
  };
  useEffect(() => {
    getPermissions();
  }, []);

  useImperativeHandle(ref, () => ({
    goToPosition,
  }));

  const initialRegion = {
    latitude: 13.7,
    longitude: 100.7,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onMapPress = (e) => {
    // เมื่อคลิกบนแผนที่
    if (e) {
      if (context === "RegisterScreen") {
        // ถ้า context ทรี่ส่งใสเป็น RegisterScreen ให้ทำฟังก์ชันตามนี้เมื่อกดแแผนที่
        setSelectedLocation(e.nativeEvent.coordinate);
        
        onLocationSelect(e.nativeEvent.coordinate);
      }
    }
  };

  const onMarkerPress = (latitude, longtitude) => {
    // ถ้ากด Marker ให้ไป googlemaps สถานที่นั้น
    console.log("Press");
    // Ask the user for confirmation
    Alert.alert(
      "เปิดใน google maps?",
      "ต้องการเปิดสถานที่นี้ใน google maps หรือไม่",
      [
        {
          text: "ไม่",
          style: "cancel",
        },
        {
          text: "ใช่",
          onPress: () => openLocationInGoogleMaps(latitude, longtitude),
        },
      ]
    );
  };

  const openLocationInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url);
  };
  const goToPosition = (latitude, longitude) => {
    // ย้ายแผนที่ไปที่พิกัดทีี่กำหนด
    mapViewRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.00221,
    });
  };

  const goToCurrentLocation = async () => {
    console.log("gotocurrentclick");
    // ไปที่ตำแหน้งปัจจุบันของมือถือ
    getPermissions();
    if (!havePermission) {
      Alert.alert("กรุณาเปิดสิทธ์การใช้บริการตำแหน่งที่ตั้งบนอุปกรณ​์");
      return;
    }

    try {
      const currentLocation = await Location.getCurrentPositionAsync({});
      if (currentLocation) {
        const { latitude, longitude } = currentLocation.coords;
        setUserLocation({ latitude, longitude });

        goToPosition(latitude, longitude);
        console.log("userLocation:", userLocation);
      } else {
        console.log("Current location not available.");
      }
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  return (
    <View style={{ width, height }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={initialRegion}
        onPress={(e) => {
          onMapPress(e);
        }}
        ref={mapViewRef}
      >
        {/* ถ้ามีข้อมูล locations ส่งผ่าน property มา ให้ทำการ pin Marker ไว้บนแผนที่  */}
        {locations &&
          locations.map((location, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: location.address.latitude,
                longitude: location.address.longitude,
              }}
              title={location.name}
              description="คลิกเพื่อเปิดไป google maps"
              
            >
              {/* You can customize the marker's callout here */}
              <Callout
                onPress={() =>
                  onMarkerPress(
                    location.address.latitude,
                    location.address.longitude
                  )
                }
              >
                <Text>{location.name}</Text>
                
           
              </Callout>
            </Marker>
          ))}
        {userLocation && (
          // ถ้ามีพิกัดปัจจุบันของ user ให้เพิ่ม marker สีฟ้า
          <Marker coordinate={userLocation} title="ที่อยู่ของคุณ">
            <FontAwesome name="map-marker" size={36} color="#378985" />
          </Marker>
        )}
        {selectedLocation && (
          // ถ้ามีพิกีดที่เลือกไว้ให้ มี marker สีแดง
          <Marker
            coordinate={selectedLocation}
            title="Location"
            // onCalloutPress={onMarkerPress} // This should work on iOS
          >
            <Callout
              onPress={() =>
                onMarkerPress(
                  selectedLocation.latitude,
                  selectedLocation.longitude
                )
              }
            >
              <View>
                <Text>เลือกที่นี่</Text>
                <Text>คลิกเพื่อไปที่ google maps</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
      {search ? (
        <View
          style={{
            position: "absolute",
            top: searchBarPosition,
            left: 75,
            right: 20,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#fff9",
            borderWidth: 0.3,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              height: 40,
              borderColor: "gray",
              borderRadius: 5,
              padding: 10,
            }}
            placeholder="ค้นหาสถานที่"
            onChangeText={(text) => setSearchQuery(text)}
          />

          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              handleSearch();
            }}
          >
            <FontAwesome name="search" size={20} color="darkgrey" />
          </TouchableOpacity>
        </View>
      ) : null}
      {currentPosition ? (
        <View
          style={{ position: "absolute", top: searchBarPosition, left: 20 }}
        >
          <TouchableOpacity
            onPress={() => {
              goToCurrentLocation();
            }}
            style={{
              backgroundColor: "white",
              borderRadius: 50,
              padding: 10,
            }}
          >
            <FontAwesome name="location-arrow" size={24} color="#378985" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

export default forwardRef(MapComponent);
