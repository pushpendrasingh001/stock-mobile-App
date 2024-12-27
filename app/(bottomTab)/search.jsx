// import React from "react";
// import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
// import { scale, verticalScale } from "react-native-size-matters";
// import IconSVG from "../../assets/svg";



// const StockDetail = () => {
//   return (
//     <ScrollView style={styles.parentContainer}>
//       {/* Header Section */}
//       <View style={styles.headerContainer}>
//         <View>
//           <TouchableOpacity>
//             <IconSVG name="profile" width={24} height={24} style={{ marginLeft: scale(10) }} />
//           </TouchableOpacity>
//         </View>
//         <View>
//           <TouchableOpacity>
//             <IconSVG name="add" width={28} height={28} style={{ marginRight: scale(10) }} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Image Section */}
//       <View style={styles.imageContainer}>
//         <Image source={require("./../../assets/images/zomatologo.png")} style={styles.image} />
//       </View>

//       {/* Title Section */}
//       <View style={styles.titleContainer}>
//         <Text style={styles.title}>
//           Zomato CEO Deepinder Goyal’s Chief of Staff job listing sparks debate on personal
//           branding & leadership roles
//         </Text>
//         <Text style={styles.subTitle}>
//           Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
//           Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
//           job listing, the selected candidate would not receive a salary during the first year but
//           would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
//           amount would be donated to Feeding India, the company’s non-profit.
//           Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
//           Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
//           job listing, the selected candidate would not receive a salary during the first year but
//           would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
//           amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
//           Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
//           job listing, the selected candidate would not receive a salary during the first year but
//           would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
//           amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
//           Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
//           job listing, the selected candidate would not receive a salary during the first year but
//           would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
//           amount would be donated to Feeding India, the company’s non-profit.Zomato CEO Deepinder Goyal’s recent post about the unconventional way to hire a Chief of
//           Staff (CoS) raised a furore of viewpoints and questions on social media.According to the
//           job listing, the selected candidate would not receive a salary during the first year but
//           would instead need to contribute Rs 20 lakh for the “opportunity” to work at Zomato. This
//           amount would be donated to Feeding India, the company’s non-profit.
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// export default StockDetail;

// const styles = StyleSheet.create({
//   parentContainer: {
//     flex: 1,
//     backgroundColor: "#121212",
//   },
//   headerContainer: {
//     width: "100%",
//     height: verticalScale(55),
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
  
//     paddingHorizontal: scale(10),
//     top: verticalScale(20),
//   },
//   iconText: {
//     color: "white",
//     fontSize: scale(16),
//   },
//   imageContainer: {
//     width: scale(350),
//     height: verticalScale(230),
//     marginBottom: verticalScale(10),
//     top: verticalScale(20),
//   },
//   image: {
//     width: scale(350),
//     height: verticalScale(230),
//   },
//   titleContainer: {
//      height:'100%',
//     width: scale(350),
//     backgroundColor: "white",
//     padding: scale(10), 
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     marginBottom: verticalScale(10),
//   },
//   title: {
//     fontSize: scale(14),
//     fontFamily: "Poppins-SemiBold",
//     marginBottom: verticalScale(5),
//     color: "#333",
//   },
//   subTitle: {
//     fontFamily: "Poppins-Medium",
//     fontSize: scale(12),
//     color: "#555",
//     lineHeight: verticalScale(18),
//   },
// });
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import IconSVG from '../../assets/svg';
import { router } from "expo-router";

const stocks = [
  { id: 1, name: "Zomato", image: require("./../../assets/images/zomatologo.png") },
  { id: 2, name: "Billie Eilish", image: require("./../../assets/images/zomatologo.png") },
  { id: 3, name: "Kanye West", image: require("./../../assets/images/zomatologo.png") },
  { id: 4, name: "Ariana Grande", image: require("./../../assets/images/zomatologo.png") },
  { id: 5, name: "Lana Del Rey", image: require("./../../assets/images/zomatologo.png") },
  { id: 6, name: "BTS", image: require("./../../assets/images/zomatologo.png") },
  { id: 7, name: "Drake", image: require("./../../assets/images/zomatologo.png") },
  { id: 8, name: "Harry Styles", image: require("./../../assets/images/zomatologo.png") },
  { id: 9, name: "One Direction", image: require("./../../assets/images/zomatologo.png") },
  { id: 10, name: "Rihanna", image: require("./../../assets/images/zomatologo.png") },
  { id: 11, name: "Ed Sheeran", image: require("./../../assets/images/zomatologo.png") },
  { id: 12, name: "The Weeknd", image: require("./../../assets/images/zomatologo.png") },
  { id: 13, name: "Dua Lipa", image: require("./../../assets/images/zomatologo.png") },
];

const CreateAccount = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStocks, setSelectedStocks] = useState([]);

  // Filter stocks
  const filteredStocks = stocks.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle stock selection
  const handleStockSelection = (stock) => {
    setSelectedStocks(prevSelected => {
      // If already selected, remove
      if (prevSelected.some(s => s.id === stock.id)) {
        return prevSelected.filter(s => s.id !== stock.id);
      }
      
      // If not already selected and less than 3 selected, add
      if (prevSelected.length < 3) {
        return [...prevSelected, stock];
      }
      
      // If 3 already selected, replace the first one
      return [...prevSelected.slice(1), stock];
    });
  };

  // Check if a stock is selected
  const isSelected = (stockId) => {
    return selectedStocks.some(stock => stock.id === stockId);
  };

  return (
    <View style={styles.parentContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => {
          router.push('/(home)/Signup_4');
        }}>
          <IconSVG name="backbutton" width={32} height={32} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.text}>Choose 1 or more stocks you like</Text>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.textInputWrapper}>
          <IconSVG name="search" width={20} height={20} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Search..."
            placeholderTextColor="#aaa"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
      </View>

      {/* Scrollable Cards */}
      <ScrollView style={styles.scrollableArea}>
        <View style={styles.grid}>
          {filteredStocks.map((stock) => (
            <TouchableOpacity 
              key={stock.id} 
              style={[styles.card, isSelected(stock.id) && styles.selectedCard]}
              onPress={() => handleStockSelection(stock)}
            >
              <Image source={stock.image} style={styles.image} />
              <Text style={styles.name}>{stock.name}</Text>
              {isSelected(stock.id) && (
                <View style={styles.tickMark}>
                  <Text style={styles.tickMarkText}>✓</Text> {/* Ensuring the checkmark is wrapped in <Text> */}
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedStocks.length >= 1 ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => {
          if (selectedStocks.length >= 1) {
            router.replace("/(bottomTab)/home");
          }
        }}
        disabled={selectedStocks.length < 1}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  text: {
    marginLeft: moderateScale(15),
    color: "#fff",
    fontSize: scale(16),
  },
  header: {
    top: verticalScale(42),
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginLeft: moderateScale(15),
  },
  inputContainer: {
    marginTop: verticalScale(70),
    paddingHorizontal: moderateScale(16),
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: scale(10),
    paddingHorizontal: moderateScale(10),
    height: verticalScale(48),
  },
  searchIcon: {
    marginRight: moderateScale(8),
  },
  textInput: {
    flex: 1,
    fontSize: scale(14),
  },
  scrollableArea: {
    flex: 1,
    marginTop: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: 'space-around',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    width: 80,
    height: 120,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
  },
  selectedCard: {
    opacity: 0.7,
  },
  image: {
    width: 88,
    height: 90,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    color: "#fff",
    fontSize: scale(10),
    textAlign: "center",
  },
  tickMark: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'green',
    borderRadius: 15,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tickMarkText: {
    color: 'white',
    fontWeight: 'bold',
  },
  continueButton: {
    position: 'absolute',
    bottom: 10,
    left: '25%',
    paddingHorizontal: moderateScale(20),
    width: scale(179),
    height: verticalScale(49),
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  activeButton: {
    backgroundColor: "#1ED760",
  },
  inactiveButton: {
    backgroundColor: '#535353',
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: scale(12),
  },
});
