import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';
import AntIcon from "react-native-vector-icons/AntDesign";
import { ScrollView } from 'react-native-gesture-handler';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import tw from "twrnc"
import { COLORS } from '../constants/theme';

export default function ExerciseDetails() {
    const route = useRoute();
    const { Exercise } = route.params;
    
  return (
    <View className = "flex flex-1">
      <View className = " shadow-md bg-neutral-200 rounded-b-[40px] ">
        <Image
          source={{uri: Exercise.gifUrl}}
          contentFit='cover'
          style = {[{width: wp(100), height: wp(100)}, tw`rounded-b-[40px]`]}
          
          />



      </View>
      
      <ScrollView className = "mx-4 space-y-2 mt-3 p-3" showsVerticalScrollIndicator = {false} contentContainerStyle = {{paddingBottom: 80}} style = {tw` bg-[${COLORS.primary}]`}>
        <Text 
          style = {[{fontSize: hp(3.5)}, tw`font-semibold text-neutral-800 tracking-wider p-4 text-[${COLORS.darkBrown}]`]}
          
        >
    {Exercise.name}
        </Text>
        <Text 
          style = {[{fontSize: hp(2)}, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}
          
        >Equipment: <Text style = {tw`font-bold text-neutral-800 px-4 text-[${COLORS.green}]`}>{Exercise?.equipment}</Text>
        </Text>
        <Text 
          style = {[{fontSize: hp(2)}, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}
          
        >Secondary Muscles: <Text style = {tw`font-bold text-neutral-800 text-[${COLORS.green}]`}>{Exercise?.secondaryMuscles}</Text>
        </Text>
        <Text 
          style = {[{fontSize: hp(2)}, tw`font-bold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}
          
        >Target Muscles: <Text style = {tw`font-bold text-neutral-800 text-[${COLORS.green}]`}>{Exercise?.target}</Text>
        </Text>
        <Text 
          style = {[{fontSize: hp(3)}, tw`font-semibold text-neutral-700 px-4 pb-2 text-[${COLORS.dark}]`]}
          >
            Instructions
          </Text>
          <Text style = {tw`px-4 pb-2 text-[${COLORS.dark}]`}>
            {Exercise.instructions}
          </Text>
          
      </ScrollView>
      
    </View>
  )
}