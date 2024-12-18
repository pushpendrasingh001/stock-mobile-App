// Carousel.js
import React from 'react';
import { View, Image, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const CarouselComponent = () => {
  const data = [
    { id: 1, image: 'https://picsum.photos/200/300', title: 'Slide 1' },
    { id: 2, image: 'https://picsum.photos/200/301', title: 'Slide 2' },
    { id: 3, image: 'https://picsum.photos/200/302', title: 'Slide 3' },
    { id: 4, image: 'https://picsum.photos/200/303', title: 'Slide 4' },
    { id: 5, image: 'https://picsum.photos/200/304', title: 'Slide 5' },
  ];

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Carousel
        width={300}
        height={200}
        data={data}
        renderItem={({ item }) => (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 200, height: 150, borderRadius: 10 }}
            />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>
              {item.title}
            </Text>
          </View>
        )}
        sliderWidth={300}
        itemWidth={200}
        inactiveSlideScale={0.8}
        inactiveSlideOpacity={0.5}
        activeSlideAlignment={'center'}
        activeAnimationType={'spring'}
        activeAnimationOptions={{
          friction: 4,
          tension: 40,
        }}
      />
    </View>
  );
};

export default CarouselComponent;