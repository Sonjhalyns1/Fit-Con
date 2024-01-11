import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';

export default function WorkoutCard({ workout, id }) {
  const navigation = useNavigation();

  const handleCardPress = () => {
    // Navigate to the workout detail page with the workou t ID as a parameter
    navigation.navigate('Workout information', { workoutId: id });
  };

  return (
    <TouchableOpacity onPress={handleCardPress}>
      <View>
        <View style={tw`border p-2 mt-5 rounded-t-2xl bg-[${COLORS.dark}]`}>
          <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-[${COLORS.primary}] text-center  font-bold`}>
                    
                    {workout.title.length > 16 ? workout.title.slice(0, 15) + '...' : workout.title}
                </Text>
            <View style = {tw`flex flex-row  items-center`}>
                    <Text style={tw`text-[${COLORS.primary}] text-center text-xs text-center mr-2`}>Performed on:</Text>
                {typeof workout.lastPerformed === 'string' && workout.lastPerformed.includes('T') ? (
                <Text  style={tw`text-[${COLORS.primary}] text-center text-xs text-center`}>{workout.lastPerformed.split('T')[0]}</Text>
                ) : (
                <Text style={tw`text-[${COLORS.primary}] text-center text-xs`}>N/A</Text>
                )}
            </View>
            
          </View>
        </View>
        <View style={tw`border p-2 rounded-b-2xl bg-[${COLORS.green}]`}>
          {Array.isArray(workout.exercises) &&
            workout.exercises.map((exercise, id) => (
              <View key={id}>
                
                <View style={tw`flex flex-row justify-between`}>
                  <Text style={tw`m-2 text-[${COLORS.primary}]`}>
                    {exercise.WorkoutId.length > 35 ? exercise.WorkoutId.slice(0, 30) + '...' : exercise.WorkoutId}
                  </Text>
                  {/* Change '1' to the number of sets in the workout */}
                  <Text style={tw`m-2 text-[${COLORS.primary}] font-bold`}>
                    X {exercise.sets.length > 0 ? exercise.sets[exercise.sets.length - 1].setNumber : 0}
                  </Text>
                </View>
              </View>
            ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}
