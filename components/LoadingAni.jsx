import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image } from 'react-native';
import LottieView from 'lottie-react-native';
import { COLORS } from '../constants/theme';


export default function LoadingAni() {
  return (
    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
      <Image
        source={require('../assets/LoadingD.gif')} // Replace with the correct Lottie animation file
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary, // Change the background color and opacity as needed
    zIndex: 1,
  },
});
