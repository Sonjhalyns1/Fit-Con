import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { bodyParts } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function BodyParts() {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate('BodyPart', { bodyPart: item.name });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Exercises
      </Text>
      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item, index }) => <BodyPartCard onPress={() => handleCardPress(item)} index={index} item={item} />}
      />
    </View>
  );
}

const BodyPartCard = ({ item, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress} style={styles.card}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={styles.cardImage}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={styles.cardText}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
  title: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: '#555',
  },
  flatListContainer: {
    paddingBottom: 50,
    paddingTop: 20,
  },
  cardContainer: {
    marginBottom: 10,
  },
  card: {
    width: wp(44),
    height: wp(52),
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  cardImage: {
    width: wp(44),
    height: wp(52),
    borderRadius: 35,
    position: 'absolute',
  },
  gradientOverlay: {
    width: wp(44),
    height: hp(15),
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  cardText: {
    fontSize: hp(2.3),
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});
