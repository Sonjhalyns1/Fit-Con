import { View, Text, TextInput, Button,  ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import Workout from '../components/Workout'
import tw from "twrnc"
import { COLORS } from '../constants/theme'
import { fetchExercisesById } from '../api/IdExerciseDB'
import { useNavigation } from '@react-navigation/native'


export default function Create() {
    
    const navigation = useNavigation()
      
    const auth = getAuth()
    const db = getFirestore()
    const initialFormat = 
      {
        title: '', 
        hidden: true,
        exercises: [],
        numberOfSets: 0, 
        uuid: auth.currentUser.uid
    }
    const [formData, setFormData] = useState(initialFormat);
    const handleAddExercise = () => {
        const updatedExercises = [...formData.exercises, { name: '', sets: []}];
        setFormData({ ...formData, exercises: updatedExercises, numberOfSets: formData.numberOfSets + 1, });
        
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
          setFormData(initialFormat)
          navigation.navigate("Home")
          console.log('Workout added with ID: ', docRef.id);
        } catch (e) {
          console.error('Error adding workout: ', e);
        }
      };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex flex-1 justify-center bg-[${COLORS.primary}] p-5`}
    >
      
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}  style = {tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`} >
        <TextInput
          placeholder="Workout Title"
          value={formData.title}
          onChangeText={(text) => setFormData({ ...formData, title: text })}
          style = {tw`border p-2 rounded-xl bg-[${COLORS.brown}] text-[${COLORS.primary}] text-xl text-center`}
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
    </KeyboardAvoidingView>
    
  )
}
