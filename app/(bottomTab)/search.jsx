import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import IconSVG from "../../assets/svg";



const StockDetail = () => {
  return (
    <ScrollView style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View>
          <TouchableOpacity>
            <IconSVG name="profile" width={24} height={24} style={{ marginLeft: scale(10) }} />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity>
            <IconSVG name="add" width={28} height={28} style={{ marginRight: scale(10) }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={require("./../../assets/images/zomatologo.png")} style={styles.image} />
      </View>

      {/* Title Section */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Zomato CEO Deepinder Goyal’s Chief of Staff job listing sparks debate on personal
          branding & leadership roles
        </Text>
        <Text style={styles.subTitle}>
          Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
          Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
          job listing, the selected candidate would not receive a salary during the first year but
          would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
          amount would be donated to Feeding India, the company’s non-profit.
          Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
          Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
          job listing, the selected candidate would not receive a salary during the first year but
          would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
          amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
          Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
          job listing, the selected candidate would not receive a salary during the first year but
          would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
          amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
          Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
          job listing, the selected candidate would not receive a salary during the first year but
          would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
          amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
          Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
          job listing, the selected candidate would not receive a salary during the first year but
          would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
          amount would be donated to Feeding India, the company’s non-profit.
        </Text>
      </View>
    </ScrollView>
  );
};

export default StockDetail;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  headerContainer: {
    width: "100%",
    height: verticalScale(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  
    paddingHorizontal: scale(10),
    top: verticalScale(20),
  },
  iconText: {
    color: "white",
    fontSize: scale(16),
  },
  imageContainer: {
    width: scale(350),
    height: verticalScale(230),
    marginBottom: verticalScale(10),
    top: verticalScale(20),
  },
  image: {
    width: scale(350),
    height: verticalScale(230),
  },
  titleContainer: {
     height:'100%',
    width: scale(350),
    backgroundColor: "white",
    padding: scale(10), 
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: scale(14),
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(5),
    color: "#333",
  },
  subTitle: {
    fontFamily: "Poppins-Medium",
    fontSize: scale(12),
    color: "#555",
    lineHeight: verticalScale(18),
  },
});
