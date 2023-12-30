import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { useEffect, useState } from 'react';
import ExerciseList from '../components/ExerciseList';
import tw from "twrnc"
import { COLORS } from '../constants/theme';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function BodyPart() {
    const navigation = useNavigation();
    const[exercises, setExercises] = useState([])
    const route = useRoute();
    const { bodyPart } = route.params;
    useEffect(() => {
        if(bodyPart) getExercises(bodyPart);

    }, [bodyPart])
    const getExercises = async(bodypart) => {
        let data = await fetchExercisesByBodypart(bodypart);
        // console.log("got data: ", data);
        setExercises(data)
    }


  return (
    <ScrollView style = {tw`flex flex-1 pt-20 px-5 bg-[${COLORS.primary}]`}>
      
      <Text style = {[{fontSize: hp(2.4)}, tw`text-center font-bold text-[${COLORS.darkBrown}]`]}>{bodyPart} Workouts</Text>
      <View className = "mb-10">
                <ExerciseList data = {exercises} />
            </View>
    </ScrollView>
  );
}