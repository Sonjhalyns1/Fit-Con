import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS } from '../constants/theme';
import tw from "twrnc"
import { WorkoutData } from '../data/WortkoutData';
export default function Leaderboard() {

  const [selected, setSelected] = useState("");
  

  return (
    <View style = {tw`flex flex-1 pt-20 px-10 bg-[${COLORS.primary}]`} >
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={WorkoutData} 
        save="key"
    />
    <Text>{selected}</Text>
    </View>
  )
}

