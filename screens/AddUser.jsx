import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { collection, doc, setDoc, getDocs, query, where, arrayUnion } from 'firebase/firestore';
import { db } from '../data/Firebase';
import { getAuth } from 'firebase/auth';

export default function AddUser() {
  const auth = getAuth();
  const [friendUUID, setFriendUUID] = useState('');

  const handleAddFriend = async () => {
    try {
      const userUUID = auth.currentUser.uid;

      // Check if the friendUUID exists in the users collection
      const userRef = collection(db, 'users');
      const userQuery = query(userRef, where('uuid', '==', friendUUID));
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
    <View>
      <Text>Your UUID: {auth.currentUser.uid}</Text>
      <Text>Enter Friend's UUID:</Text>
      <TextInput
        placeholder="Friend's UUID"
        onChangeText={(text) => setFriendUUID(text)}
        value={friendUUID}
      />
      <Button title="Add Friend" onPress={handleAddFriend} />
    </View>
  );
}
