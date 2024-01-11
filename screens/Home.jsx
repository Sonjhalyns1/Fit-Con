

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { db } from '../data/Firebase';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getAuth } from 'firebase/auth';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';
import WorkoutCard from '../components/WorkoutCard';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import LoadingAni from '../components/LoadingAni';
import Heatmap from '../components/Heatmap';

export default function Home() {
  const auth = getAuth();
  const isFocused = useIsFocused();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workouts, setWorkouts] = useState([]);
  const navigation = useNavigation()

  const fetchWorkout = useCallback(async () => {
    const user = auth.currentUser;
    setLoading(true);
    const workoutRef = collection(db, 'workouts');
    const q = query(workoutRef, where('uuid', '==', user.uid));
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
  }, [auth.currentUser?.uid]);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setProfile(docSnap.data());
            setLoading(false);
          }
        } else {
          console.warn('User not authenticated');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    }

    fetchProfile();
  }, [auth.currentUser?.uid, isFocused]);

  useEffect(() => {
    if (isFocused) {
      fetchWorkout();
    }
  }, [isFocused, fetchWorkout]);

  const routeToHistory = () => {
    navigation.navigate("History");
  
  }

  if (loading) {
    return (
      <View>
        <LoadingAni />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`}>
      {profile && (
        <View>
          <Text style={tw`text-3xl text-[${COLORS.dark}] font-bold`}>
            HI <Text style={tw`text-2xl text-[${COLORS.dark}] text-3xl font-bold`}>{profile.name}</Text>!{' '}
            <MaterialCommunityIcons name="hand-wave" size={hp(4)} style={tw`text-[${COLORS.dark}]`} />
          </Text>
        </View>
      )}
      <View>
        <Heatmap />
        <TouchableOpacity style = {tw`border p-2 rounded-2xl m-2 bg-[${COLORS.dark}]`} onPress={routeToHistory}>
            <View style = {tw`flex flex-row items-center justify-center `}>
                <View style = {tw`border p-2 rounded-full bg-[${COLORS.brown}]`}>
                    <FontAwesome name="history" size={hp(2)} style={tw`text-[${COLORS.dark}]`} />
                </View>
                <Text style = {tw` text-[${COLORS.primary}] text-xl`}>
                    View History
                </Text>
            </View>
        </TouchableOpacity>
      </View>

      {workouts.length > 0 && (
        <View>
          {workouts.map((workout) => (
              <WorkoutCard key={workout.id} id={workout.id} workout={workout.data} />
          ))}
        </View>
      )}
    </ScrollView>
  );
}
