import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { db } from '../data/Firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { useIsFocused } from '@react-navigation/native'
import WorkoutCard from '../components/WorkoutCard'
import { COLORS } from '../constants/theme'
import tw from "twrnc"
import LoadingAni from '../components/LoadingAni'


export default function Archived() {
    const auth = getAuth()
    const [workouts , setWorkouts] = useState([])
    const [loading , setLoading] = useState(true)
    const isFocused = useIsFocused();

    const fetchWorkout = useCallback(async () => {
        const user = auth.currentUser;
        setLoading(true);
        const workoutRef = collection(db, 'workouts');
        const q = query(workoutRef, where('uuid', '==', user.uid));
        const qHidden = query(q,where("hidden", "==", false) )
        const querySnap = await getDocs(qHidden);
        let workoutsData = [];
        querySnap.forEach((doc) => {
          workoutsData.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setWorkouts(workoutsData);
        setLoading(false);
      }, [auth.currentUser?.uid]);
      useEffect(() => {
        if (isFocused) {
          fetchWorkout();
        }
      }, [isFocused, fetchWorkout]);
    
    if (loading) {
        return(
          <SafeAreaView style= {tw`flex-1 `}>
          <LoadingAni />
        </SafeAreaView>
        )
    }
    
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`}>
      {workouts.length > 0 && (
        <View>
          {workouts.map((workout) => (
              <WorkoutCard key={workout.id} id={workout.id} workout={workout.data} />
          ))}
        </View>
      )}
    </ScrollView>
  )
}