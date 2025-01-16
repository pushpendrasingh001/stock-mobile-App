import React, { useEffect, useState } from 'react';
import { View,StyleSheet, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { router } from "expo-router";

const SplashScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
     router.replace('/(home)/HomePage');
    }, 2900); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Image
       animation="bounceIn" duration={3000} delay={300} direction='alternate-reverse' easing='ease-in-out-cubic' iterationDelay={3000}
        source={require('../../assets/images/splash-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />     
     <ActivityIndicator size='large' color="#1ed760" style={styles.loader} />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
  
  },
  loader: {
    position:'absolute',
    top:500,
    
  },
});

export default SplashScreen;
