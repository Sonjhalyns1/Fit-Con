import { useNavigation, useRoute } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { useEffect, useState } from 'react';
import ExerciseList from '../components/ExerciseList';

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
        console.log("got data: ", data);
        setExercises(data)
    }


  return (
    <ScrollView>
      <Text>BodyPart</Text>
      <Text>Part Body: {bodyPart}</Text>
      <View className = "mb-10">
                <ExerciseList data = {exercises} />
            </View>
    </ScrollView>
  );
}