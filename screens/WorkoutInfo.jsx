import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, TextInput, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { doc, addDoc, collection, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../data/Firebase';
import { getAuth } from 'firebase/auth';
import tw from "twrnc"
import { COLORS } from '../constants/theme';

export default function WorkoutInfo() {
    const auth = getAuth();
    const route = useRoute();
    const [loading, setLoading] = useState(true);
    const { workoutId } = route.params;
    const [workout, setWorkout] = useState();
    const [timerStart, setTimerStart] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [workoutNotes, setWorkoutNotes] = useState('');
    useEffect(() => {
      async function fetchWorkout() {
        const docRef = doc(db, 'workouts', workoutId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setWorkout(docSnap.data());
          setLoading(false);
        }
      }
      fetchWorkout();
    }, [workoutId]);
  
    
  
    const handleSetComplete = async (exerciseIndex, setIndex) => {
      const updatedWorkout = { ...workout };
      updatedWorkout.exercises[exerciseIndex].sets[setIndex].completed = true;
      setWorkout(updatedWorkout);
  
      // Update the workout in Firestore
      await updateDoc(doc(db, 'workouts', workoutId), updatedWorkout);
    };
  
    const handleSendToHistory = async () => {
      setTimerStart(false);
      const currentTime = elapsedTime / 1000; // Convert milliseconds to seconds
  
      // Save workout history to Firestore
      try {
        const historyRef = collection(db, 'history');
        const historyData = {
          workoutId,
          duration: currentTime,
          date: new Date().toISOString(),
          uuid: auth.currentUser.uid,
          notes: workoutNotes,
        };
        await addDoc(historyRef, historyData);
        Alert.alert('Success', 'Workout sent to history!');
      } catch (error) {
        console.error('Error sending workout to history: ', error);
        Alert.alert('Error', 'Failed to send workout to history.');
      }
    };
  
    
  
    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style = {tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`} >
        
        <Text>Workout ID: {workoutId}</Text>
        <TextInput
          placeholder="Add notes about your workout..."
          onChangeText={(text) => setWorkoutNotes(text)}
          value={workoutNotes}
          multiline
          style={styles.textInput}
        />
        {workout &&
          workout.exercises.map((exercise, exerciseIndex) => (
            <View key={exerciseIndex}>
                <View style = {tw`border p-2 mt-5 rounded-t-2xl bg-[${COLORS.dark}]`}>
                    <Text  style = {tw`text-[${COLORS.primary}] text-center`}>{exercise.WorkoutId}</Text>
                </View>
                
                <View  style = {tw`border p-2 rounded-b-2xl bg-[${COLORS.green}]`} >
                <View style = {tw`flex mt-4`}>
                    <View style = {tw`flex flex-row justify-between`}>
                        <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                            Done
                        </Text>
                        <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                            Set
                        </Text>
                        <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                            Weight
                        </Text>
                        <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                            Reps
                        </Text>
                    </View>
                    
                    {exercise.sets.map((set, setIndex) => (
                        <View key={setIndex} style = {tw`flex flex-row justify-between`}>
                            
                                <CheckBox
                                    style = {tw`m-2 mr-4 text-[${COLORS.primary}]`}
                                    checked={set.completed}
                                    onPress={() => handleSetComplete(exerciseIndex, setIndex)}
                                />
                                <Text style = {tw`m-2 mr-4 text-[${COLORS.primary}]`}>Set {setIndex + 1}</Text>
                                <Text style = {tw`m-2 mr-4 text-[${COLORS.primary}]`}>{set.weight}</Text>
                                <Text style = {tw`m-2 mr-4 text-[${COLORS.primary}]`}>{set.rep}</Text>
                            

                        </View>
                    ))}
                    </View>
                </View>
            </View>
          ))}
        
        <Button title="Send to History" onPress={handleSendToHistory} />
      </ScrollView>
    )
  }
  const styles = {
      timerOptions: {
        container: {
          backgroundColor: COLORS.brown,
          padding: 5,
          borderRadius: 5,
          width: 200,
          alignItems: 'center',
        },
        text: {
          fontSize: 20,
          color: '#FFF',
          marginLeft: 7,
        },
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 15,
      },
    };
    