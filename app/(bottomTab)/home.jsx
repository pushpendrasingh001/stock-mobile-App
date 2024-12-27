import React, { useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { BlurView } from 'expo-blur';

const { height: screenHeight } = Dimensions.get('window');

const SmoothSpringCarousel = () => {
  const carouselRef = useRef(null);

  const data = [
    { title: 'Item 1',subTitle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est debitis distinctio error nostrum repudiandae? Reprehenderit quos non architecto eveniet natus. Nobis, accusantium obcaecati aliquam perferendis iste quo voluptatem ab soluta libero accusamus ea nemo sed, facilis, temporibus amet nam? Recusandae explicabo sed at corrupti culpa odio perferendis id, dolores fugiat!', image: 'https://img.freepik.com/premium-photo/indian-asian-family-enjoying-beach-summer_466689-23029.jpg?w=996' },
    { title: 'Item 2',subTitle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est debitis distinctio error nostrum repudiandae? Reprehenderit quos non architecto eveniet natus. Nobis, accusantium obcaecati aliquam perferendis iste quo voluptatem ab soluta libero accusamus ea nemo sed, facilis, temporibus amet nam? Recusandae explicabo sed at corrupti culpa odio perferendis id, dolores fugiat!', image: 'https://img.freepik.com/premium-photo/people-sitting-rock-by-sea-against-sky-sunset_1048944-9262605.jpg?w=996' },
    { title: 'Item 3',subTitle:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Est debitis distinctio error nostrum repudiandae? Reprehenderit quos non architecto eveniet natus. Nobis, accusantium obcaecati aliquam perferendis iste quo voluptatem ab soluta libero accusamus ea nemo sed, facilis, temporibus amet nam? Recusandae explicabo sed at corrupti culpa odio perferendis id, dolores fugiat!', image: 'https://img.freepik.com/premium-vector/little-boy-waving-hand_1308-10905.jpg?w=360' },
  ];

  const renderItem = ({ item }) => {
    return (
      <View style={styles.parentContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subTitle}>{item.subTitle}</Text>
        </View>
        <ImageBackground
          source={{ uri: item.image }}
          style={styles.linkContainer}
          imageStyle={{ borderRadius: 10 }}
        >
          <BlurView   intensity={50}
            tint='dark'
            experimentalBlurMethod='gaussian'
            blurReductionFactor={2}
           reducedTransparencyFallbackColor="#000"
            style={styles.blurContainer}>
            <TouchableOpacity style={styles.linkContent}>
              <Text style={styles.linkTitle}>{item.title}</Text>
              <Text style={styles.linkSubTitle}>{item.title}</Text>
            </TouchableOpacity>
          </BlurView>
        </ImageBackground>
       
      </View>
    );
  };

  return (
    <Carousel
      ref={carouselRef}
      data={data}
      renderItem={renderItem}
      sliderHeight={screenHeight}
      itemHeight={screenHeight}
      vertical={true}
      loop={true}
      swipeThreshold={0.15 * screenHeight}
      layout={'spring'}
      // optional
       layoutCardOffset={18}
        activeSlideOffset={10}
         callbackOffsetMargin={20}
          enableSnap={true}
           lockScrollTimeoutDuration={1000}
            scrollEnabled={true} 
          
            overScrollMode={'never'}
             bounces={true}
             decelerationRate={'fast'} 
             scrollEventThrottle={16} 
      />
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    position: 'relative',
    backgroundColor: '#fed760',
    height: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: 250,
    top: 0,
  },
  contentContainer: {
    position: 'absolute',
    padding:10,
    width: '100%',
    height: '100%',
    top: 245,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
    paddingLeft: 15,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
  },
  subTitle: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'SpaceMono-Regular',
    color: 'gray',
  },
  linkContainer: {
    position: 'absolute',
    width: '100%',
    height: 80,
    bottom: 40,
    objectFit: 'fill',
  },
  blurContainer: {
    flex: 1,
    borderRadius: 10,
  },
  linkContent: {
    flex: 1,
    justifyContent: 'center',
     paddingLeft:15
    
  },
  linkTitle:{
  color:'#fff',
  fontSize:16,
  fontFamily:'Poppins-Medium'
  },
  linkSubTitle:{
  color:'#fff',
  fontSize:14,
  fontFamily:'Poppins-Regular'
  }
});

export default SmoothSpringCarousel;