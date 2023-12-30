import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { bodyParts } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import { FlatList } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';

export default function BodyParts() {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate('BodyPart', { bodyPart: item.name });
  };

  return (
    <View style={{ margin: 4 }}>
      <Text style={{ fontSize: hp(3), fontWeight: 'bold', color: '#555' }}>
        Exercises
      </Text>
      <FlatList
        data={bodyParts}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
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
    <View>
      <TouchableOpacity onPress={onPress} style={{ width: wp(44), height: wp(52), flex: 1, justifyContent: 'flex-end', padding: 10, marginBottom: 10 }}>
        <Image
          source={item.image}
          resizeMode="cover"
          style={{ width: wp(40), height: wp(48), borderRadius: 35, position: 'absolute' }}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={{ width: wp(40), height: hp(15), position: 'absolute', bottom: 0, borderBottomLeftRadius: 35, borderBottomRightRadius: 35 }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Text style={{ fontSize: hp(2.0), color: COLORS.brown, fontWeight: 'bold', textAlign: 'center', marginTop: 8 }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};