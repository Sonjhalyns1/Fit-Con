import { View, Text, ScrollView, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import Workout from '../components/Workout'
import tw from "twrnc"
import { COLORS } from '../constants/theme'

export default function Create() {
    const auth = getAuth()
    const db = getFirestore()
    const [formData, setFormData] = useState({
        title: '', 
        exercises: [],
        uuid: auth.currentUser.uid
    });
    const handleAddExercise = () => {
        const updatedExercises = [...formData.exercises, { name: '', weight: '',reps:"",   sets: [] }];
        setFormData({ ...formData, exercises: updatedExercises });
      };
    
      const handleExerciseChange = (index, field, value) => {
        const updatedExercises = [...formData.exercises];
        updatedExercises[index][field] = value;
        setFormData({ ...formData, exercises: updatedExercises });
      };
      const handleWorkoutSubmit = async () => {
        // Save workout to Firestore
        try {
          const docRef = await addDoc(collection(db, 'workouts'), formData);
          console.log('Workout added with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding workout: ', e);
        }
      };

  return (
    <ScrollView style = {tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`} >
      <TextInput
        placeholder="Workout Title"
        value={formData.title}
        onChangeText={(text) => setFormData({ ...formData, title: text })}
      />
      {formData.exercises.map((exercise, index) => (
        <Workout
          key={index}
          index={index}
          exercise={exercise}
          onChange={handleExerciseChange}
        />
      ))}
      <Button title="Add Exercise" onPress={handleAddExercise} />
      <Button title="Submit Workout" onPress={handleWorkoutSubmit} />
    </ScrollView>
  )
}