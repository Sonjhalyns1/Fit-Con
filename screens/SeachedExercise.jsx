import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { fetchExercisesByName } from '../api/exerciseDB';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';
import ExerciseList from '../components/ExerciseList';
export default function SeachedExercise() {
    const [exercises, setExercises] = useState([]);
    const route = useRoute();
    const { search } = route.params;
  
    useEffect(() => {
      if (search) {
        getExercises(search);
      }
    }, [search]);
  
    const getExercises = async (name) => {
      try {
        let data = await fetchExercisesByName(name);
        setExercises(data);
      } catch (error) {
        console.error('Error fetching exercises by name:', error.message);
      }
    };
  
    return (
      <View style={tw`flex`}>
        <Text style={tw`text-center font-bold text-[${COLORS.darkBrown}]`}>
          Exercises for: {search}
        </Text>
        <ExerciseList data={exercises} />
      </View>
    );
  }