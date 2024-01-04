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

  const routeToFriendsHistory = (FriendId) => {
    navigation.navigate("Friends History", {FriendsId: FriendId})
  }

  if (loading) {
    return (
      <View>
        <Text>LOADING...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`}>
      <TouchableOpacity
        style={tw`border p-2 rounded-2xl m-2 bg-[${COLORS.dark}]`}
        onPress={routeToAddUser}>
        <View style={tw`flex flex-row items-center justify-end `}>
          <View style={tw`border p-2 rounded-full bg-[${COLORS.brown}]`}>
            <AntDesign name="adduser" size={20} style={tw`text-[${COLORS.dark}]`} />
          </View>
          <Text style={tw` text-[${COLORS.primary}] text-xl`}>Add Friend</Text>
        </View>
      </TouchableOpacity>
      <Text style={tw`text-center text-xl font-bold text-[${COLORS.darkBrown}]`}>Leaderboard</Text>
      {friends.map((friend) => (
        <TouchableOpacity onPress={() => routeToFriendsHistory(friend.uuid)}>

          <View key={friend.uuid} style={tw`border p-2 rounded-xl bg-[${COLORS.dark}] m-2`}>
            <Text style={tw`text-[${COLORS.primary}] text-lg font-semibold`}>{friend.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
