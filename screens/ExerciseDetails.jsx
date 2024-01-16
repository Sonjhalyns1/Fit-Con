import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';

export default function ExerciseDetails() {
  const route = useRoute();
  const { Exercise } = route.params;
  

  return (
    <View style={tw`flex flex-1 pb-5`}>
      <View style={tw`shadow-md bg-neutral-200 rounded-b-[40px]`}>
        <Image
          source={{ uri: Exercise.gifUrl }}
          contentFit='cover'
          style={[{ width: wp(100), height: hp(40) }, tw`rounded-b-[40px]`]}
        />
      </View>

      <ScrollView style={[tw`bg-[${COLORS.primary}]`, { paddingBottom: 200 }]} showsVerticalScrollIndicator={false}>
        <Text style={[{ fontSize: hp(3.5) }, tw`font-semibold text-neutral-800 p-4 text-[${COLORS.darkBrown}]`]}>
          {Exercise.name}
        </Text>
        <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}>
          Equipment: <Text style={tw`font-bold text-neutral-800 px-4 text-[${COLORS.green}]`}>{Exercise?.equipment}</Text>
        </Text>
        <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}>
          Secondary Muscles: <Text style={tw`font-bold text-neutral-800 text-[${COLORS.green}]`}>{Exercise?.secondaryMuscles}</Text>
        </Text>
        <Text style={[{ fontSize: hp(2) }, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}>
          Target Muscles: <Text style={tw`font-bold text-neutral-800 text-[${COLORS.green}]`}>{Exercise?.target}</Text>
        </Text>
        <Text style={[{ fontSize: hp(3) }, tw`font-semibold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}>
          Instructions
        </Text>
        <Text style={[{fontSize: hp(2)},tw`px-4 pb-2 text-[${COLORS.dark}]`]}>
          { String(Exercise.instructions).split(',').map((instructions, index) => (
            <Text key={index} >
              {`\n${index+1}) ${instructions}\n`}
            </Text>
          ))}
        </Text>
        
      </ScrollView>
    </View>
  );
}
