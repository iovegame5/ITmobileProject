import React from "react";
import { View, Text, Image } from "react-native";
import Carousel from "react-native-snap-carousel-v4";
import PropTypes from "prop-types";

const Promotion = ({ promotions }) => {
  // Render the promotion cards inside the carousel
  const renderPromotionCard = ({ item }) => {
    const startDate = item.startDate.toDate().toLocaleDateString();
    const endDate = item.endDate.toDate().toLocaleDateString();

    return (
      <View style={styles.promotionCard}>
        <Image
          style={styles.promotionImage}
          source={{ uri: item.imageFilename }}
        />
        <Text style={styles.promotionTitle}>{item.promotionDetails}</Text>
        <Text>{item.clinicName}</Text>
        <Text>Start Date: {startDate.toString()}</Text>
        <Text>End Date: {endDate.toString()}</Text>
        {/* Render other promotion details as needed */}
      </View>
    );
  };

  return (
    <View>
      <Carousel
        layout={"default"}
        data={promotions}
        sliderWidth={350}
        itemWidth={320}
        renderItem={renderPromotionCard}
      />
    </View>
  );
};

const styles = {
  promotionCard: {
    width: 320,
    height: 350,
    padding: 20,
    margin: 10,

    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
    justifyItems: "center"
  },
  promotionImage: {
    alignSelf:"center",
    width: 300,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  promotionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
};

Promotion.propTypes = {
  promotions: PropTypes.array.isRequired,
};

export default Promotion;
