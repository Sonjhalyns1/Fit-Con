import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function WorkoutCard({workout, id}) {
    const navigation = useNavigation();

    const handleCardPress = () => {
      // Navigate to the workout detail page with the workout ID as a parameter
      navigation.navigate('WorkoutDetail', { workoutId: id });
    };
  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View>
        <View >
          <Text >{workout.title}</Text>
        </View>
        <View >
          {workout.exercises.map((exercise) => (
            <View  key={exercise.id}>
              <Text>{exercise.WorkoutId}</Text>
              {/* Change '1' to the number of sets in the workout */}
              <Text>X {workout.numberOfSets}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}