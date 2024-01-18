import { View, Text, TouchableOpacity, SafeAreaView, SafeAreaViewBase } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { CalendarList, Agenda } from 'react-native-calendars';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../data/Firebase';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';
import { useRoute } from '@react-navigation/native';
import WorkoutCard from '../components/WorkoutCard';
import CardForHistory from '../components/CardForHistory';
import LoadingAni from '../components/LoadingAni';

export default function FriendsHistory() {
    const route = useRoute()
    const {FriendsId} = route.params;
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = getAuth();
    const [markedDates, setMarkedDates] = useState({});
    const [agendaItems, setAgendaItems] = useState({});
  
    useEffect(() => {
      async function fetchWorkout() {
        const user = auth.currentUser;
        setLoading(true);
        const historyRef = collection(db, 'history');
        const q = query(historyRef, where('uuid', '==', FriendsId));
        const querySnap = await getDocs(q);
        let markedDatesData = {};
        let agendaItemsData = {};

        for (const doc of querySnap.docs) {
          const note = doc.data().notes;
          const workoutIdentifier = doc.data().workoutId;
          const date = doc.data().date.split('T')[0]; // Extract date without time
          markedDatesData[date] = { selected: true, marked: true, selectedColor: '#222222',
          selectedTextColor: 'yellow',
          dotColor: 'white'};
          const workoutDetails = await getWorkoutDetails(workoutIdentifier);

          const workoutName = workoutDetails ? workoutDetails.title : 'Unknown Workout';
          const agendaItem = { note, workoutName };
          if (agendaItemsData[date]) {
            agendaItemsData[date].push(agendaItem);
          } else {
            agendaItemsData[date] = [agendaItem];
          }
        }

        setMarkedDates(markedDatesData);
        setAgendaItems(agendaItemsData);
        setLoading(false);
      }

      async function getWorkoutDetails(workoutId) {
        const workoutDoc = doc(db, 'workouts', workoutId);
        const workoutSnap = await getDoc(workoutDoc);
        return workoutSnap.exists() ? workoutSnap.data() : null;
      }

      fetchWorkout();
    }, [auth.currentUser?.uid]);
    console.log(agendaItems);
    
      if (loading) {
        return (
          <SafeAreaViewBase style= {tw`flex-1 `}>
        <LoadingAni />
      </SafeAreaViewBase>
        );
      }
    
      const renderItem = (item) => {
        return (
          <TouchableOpacity>
            <Card>
              <Card.Content>
                <View style={tw` p-2 rounded-t-2xl bg-[${COLORS.darkBrown}]`}>
                    <Text style = {tw`text-center text-[${COLORS.primary}] text-lg font-semibold`}>{item.workoutName}</Text>
                </View>
                <View style = {tw` p-2 rounded-b-2xl bg-[${COLORS.brown}]`}>
                    <Text style = {tw`text-[${COLORS.primary}] font-semibold text-lg`}>Note: <Text style = {tw`text-sm`}>{item.note}</Text></Text>
                </View>
  
  
  
              </Card.Content>
            </Card>
          </TouchableOpacity>
        );
      };
      const renderEmptyData = () => {
        return (
          <Card>
            <Card.Content>
              <View style={tw``}>
                <Text style={tw`text-[${COLORS.dark}] font-semibold text-2xl text-center`}>Skipped!!!</Text>
              </View>
            </Card.Content>
          </Card>
          
        );
      };
      const theme = {
        selectedDayBackgroundColor: COLORS.green, // Customize the selected date background color
        selectedDayTextColor: COLORS.primary, // Customize the selected date text color
        todayTextColor: COLORS.darkBrown, // Customize the today text color
        agendaDayTextColor: COLORS.green, // Customize the agenda day text color
        agendaDayNumColor: COLORS.darkBrown, // Customize the agenda day number color
        agendaTodayColor: COLORS.brown, // Customize the agenda today color
      };
    
      return (
        <View style={{ flex: 1 }}>
          <Agenda
            items={agendaItems}
            
            // ... other Agenda props
            onDayPress={(day) => {}}
    
            renderItem={renderItem}
            renderEmptyData={renderEmptyData} 
            theme={theme}
            
          />
        </View>
      );
    }