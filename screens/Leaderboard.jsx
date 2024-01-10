import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { query, doc, getDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import AntDesign from 'react-native-vector-icons/AntDesign';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';
import { db } from '../data/Firebase';
import LoadingAni from '../components/LoadingAni';
import FriendsCard from '../components/FriendsCard';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native"

export default function Leaderboard() {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(); // Add this line to get the auth object

  useEffect(() => {
    async function fetchFriends() {
      setLoading(true);

      try {
        const userUUID = auth.currentUser.uid;

        // Fetch friendUUIDs from the leaderboard collection
        const leaderboardRef = doc(db, 'leaderboard', userUUID);
        const leaderboardSnap = await getDoc(leaderboardRef);

        if (!leaderboardSnap.exists()) {
          console.log('Leaderboard document not found');
          setLoading(false);
          return;
        }

        const friendUUIDs = leaderboardSnap.data().friendUUIDs || [];

        // Fetch friend details from the users collection
        const friendsData = [];

        for (const friendUUID of friendUUIDs) {
          const userRef = doc(db, 'users', friendUUID);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const friendData = {
              uuid: friendUUID,
              name: userSnap.data().name, // Replace with the actual field name in your users collection
            };
            friendsData.push(friendData);
          } else {
            console.log(`User with UUID ${friendUUID} not found`);
          }
        }

        setFriends(friendsData);
      } catch (error) {
        console.error('Error fetching friends: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchFriends();
  }, [auth]);

  const routeToAddUser = () => {
    navigation.navigate('Add User');
  };

  

  if (loading) {
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );
  }
  const commitsData = [
    { date: "2016-11-02", count: 4 },
    { date: "2017-01-03", count: 2 },
    { date: "2017-01-04", count: 3 },
    { date: "2017-01-05", count: 4 },
    { date: "2017-01-06", count: 5 },
    { date: "2017-01-30", count: 2 },
    { date: "2017-01-31", count: 3 },
    { date: "2017-03-01", count: 2 },
    { date: "2017-04-02", count: 4 },
    { date: "2017-03-05", count: 2 },
    { date: "2017-02-30", count: 4 }
  ];

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`}>
      
      <Text style={tw` text-2xl font-bold text-[${COLORS.dark}]`}>Friends</Text>
      <ScrollView horizontal={true} style={tw`flex-row`}>
      <TouchableOpacity
        style={tw``}
        onPress={routeToAddUser}>
          <View style = {tw`flex items-center`}>
            <View style={[{width: wp(14)},tw`border p-3 rounded-full bg-[${COLORS.dark}] m-2`]}>
            <AntDesign name="adduser"  style={tw`text-[${COLORS.primary}] text-xl font-bold text-center`} />
            
        </View>
        <Text style = {tw`font-semibold text-[${COLORS.green}]`}>Add User</Text>
        </View>
        
        
        
      </TouchableOpacity>
        {friends.map((friend) => (
          <FriendsCard key={friend.id} friendName={friend.name} friendID={friend.uuid} />
        ))}
      </ScrollView>
      <Text style={tw` mt-4 text-2xl font-bold text-[${COLORS.dark}]`}>Friend's History</Text>
      <ContributionGraph
  values={commitsData}
  endDate={new Date("2017-04-01")}
  numDays={105}
  width={Dimensions.get("window").width}
  height={200}
  chartConfig={chartConfig}
/>
    </ScrollView>
  );
}
const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false // optional
};
