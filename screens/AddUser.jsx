import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { collection, doc, setDoc, getDocs, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '../data/Firebase';
import { getAuth } from 'firebase/auth';
import tw from "twrnc"
import { COLORS } from '../constants/theme';


export default function AddUser() {
  const auth = getAuth();
  const [friendUUID, setFriendUUID] = useState('');

  const handleAddFriend = async () => {
    try {
      const userUUID = auth.currentUser.uid;

      // Check if the friendUUID exists in the users collection
      const userRef = collection(db, 'users');
      const userQuery = query(userRef, where('uid', '==', friendUUID));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        console.log('Friend not found');
        // Handle the case where the friend is not found
        return;
      }

      // If friend exists, add the friend's UUID to the user's leaderboard document
      const leaderboardRef = doc(db, 'leaderboard', userUUID);
      await setDoc(leaderboardRef, { friendUUIDs: arrayUnion(friendUUID) }, { merge: true });

      console.log('Friend added successfully');
      // You can also update your local state or perform other actions as needed
    } catch (error) {
      console.error('Error adding friend: ', error);
    }
  };

  return (
    <View style = {tw`flex flex-1 pt-10 px-10 bg-[${COLORS.primary}]`}>
      <Text style = {tw` font-semibold text-lg text-[${COLORS.dark}]`}>
      Users can be added by sharing your personal ID or entering someone else's ID.      </Text>
      <Text style = {tw`mt-4 text-lg font-semibold text-[${COLORS.dark}]`}>My ID:</Text>
      <View style = {tw`mt-1 p-2 rounded-lg bg-[${COLORS.brown}]`}>
        <Text style = {tw` text-[${COLORS.green}] font-bold`} selectable={true}>{auth.currentUser.uid}</Text>
      </View>
      <Text style = {tw`mt-4 text-lg font-semibold text-[${COLORS.dark}]`}>Enter Friend's UUID:</Text>
      <TextInput
        style = {tw`bg-[${COLORS.brown}] p-2 rounded-lg text-[${COLORS.green}]`}
        placeholder="Friend's ID"
        onChangeText={(text) => setFriendUUID(text)}
        value={friendUUID}
      />
      <Button title="Add Friend" onPress={handleAddFriend} />
    </View>
  );
}
