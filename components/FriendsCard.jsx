import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';
import tw from "twrnc"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default function FriendsCard({friendName, friendID}) {
    const navigation = useNavigation();

    const routeToFriendsHistory = (FriendId) => {
        navigation.navigate("Friends History", {FriendsId: FriendId})
      }
  return (
    <View>
      <TouchableOpacity onPress={() => routeToFriendsHistory(friendID)} >
        <View style = {tw`flex items-center`}>
            <View key={friendID} style={[{width: wp(14)},tw`border p-3 rounded-full bg-[${COLORS.dark}] m-2`]}>
            <Text style={tw`text-[${COLORS.primary}] text-lg font-bold text-center text-xl`}>{friendName.slice(0,1)}</Text>
            
        </View>
        <Text style = {tw`font-semibold text-[${COLORS.green}]`}>{friendName}</Text>
        </View>
        
    </TouchableOpacity>
    </View>
  )
}