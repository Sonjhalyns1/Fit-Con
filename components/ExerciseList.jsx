import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function ExerciseList({ data }) {
  const navigation = useNavigation();

  const handleCardPress = (item) => {
    navigation.navigate('BodyPart', { bodyPart: item.name });
  };

  return (
    <View style={{ margin: 4 }}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item, index }) => <ExerciseCard onPress={() => handleCardPress(item)} index={index} item={item} />}
      />
    </View>
  );
}

const ExerciseCard = ({ item, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={{ flex: 1, paddingVertical: 10 }}>
        <View style={{ backgroundColor: '#E5E5E5', borderRadius: 25, overflow: 'hidden' }}>
          <Image
            source={{ uri: item.gifUrl }}
            resizeMode="cover"
            style={{ width: wp(40), height: wp(48), borderRadius: 25 }}
          />
        </View>
        <Text
          style={{ fontSize: hp(1.7), color: '#333', fontWeight: 'bold', marginLeft: 5, marginTop: 5 }}
        >
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};