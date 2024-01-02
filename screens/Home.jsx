import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { db } from '../data/Firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { getAuth } from 'firebase/auth';
import tw from "twrnc"
import { COLORS } from '../constants/theme';
import WorkoutCard from '../components/WorkoutCard';

export default function Home() {
    const auth = getAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [workouts, setWorkouts] = useState([]);



    useEffect(() => {
        async function fetchPosting() {
            try {
                const user = auth.currentUser;

                if (user) {
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setProfile(docSnap.data());
                        setLoading(false);
                    }
                } else {
                    console.warn("User not authenticated");
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        }

        fetchPosting();
    }, [auth.currentUser?.uid]);

    useEffect(() => {
        async function fetchWorkout() {
            const user = auth.currentUser;
            setLoading(true);
            const workoutRef = collection(db, "workouts");
            const q = query(workoutRef, where("uuid", "==", user.uid));
            const querySnap = await getDocs(q);
            let workoutsData = [];
            querySnap.forEach((doc) => {
                workoutsData.push({
                    id: doc.id,
                    data: doc.data(),
                });
            });
            setWorkouts(workoutsData);
            setLoading(false);
        }
        fetchWorkout();
    }, [auth.currentUser?.uid]);

    if (loading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

  return (
    <ScrollView style = {tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`}>
      {profile && (
                <View >
                    <Text style={tw`text-3xl text-[${COLORS.dark}] font-bold`}>HI <Text style={tw`text-2xl text-[${COLORS.dark}] text-3xl font-bold`}>{profile.name}</Text>! <MaterialCommunityIcons name= "hand-wave" size={hp(4)} style = {tw`text-[${COLORS.dark}]`} /></Text>
                    
                </View>
            )}

{workouts.length > 0 && (
                <View>
                    <Text style={{ fontSize: hp(4.5) }}>Your Workouts:</Text>
                    {workouts.map((workout) => (
                        <WorkoutCard 
                            key = {workout.id}
                            id = {workout.id}
                            workout = {workout.data}
                        
                        />
                    ))}
                </View>
                
            )}
    </ScrollView>
  )
}