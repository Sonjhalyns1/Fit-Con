import { View, Text, TextInput, Button, Image} from 'react-native'
import React from 'react'
import tw from "twrnc"
import { COLORS, SIZES} from '../constants/theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default function Workout({ index, exercise, onChange }) {
    const handleAddSet = () => {
        const updatedSets = [...(exercise.sets || []), { setNumber: (exercise.sets || []).length + 1, weight: '', reps: '' }];
        onChange(index, 'sets', updatedSets);
      };
    
      const handleSetChange = (setIndex, field, value) => {
        const updatedSets = [...exercise.sets];
        updatedSets[setIndex][field] = value;
        onChange(index, 'sets', updatedSets);
      };
  return (
    <View style = {tw``}>
        <View style = {tw`border p-2 mt-5 rounded-t-2xl bg-[${COLORS.dark}]`} >
            <Text style = {tw`text-[${COLORS.primary}] text-center text-xl`}>Exercise {index + 1}</Text>

        </View>
    
    <View style = {tw`border p-2 rounded-b-2xl bg-[${COLORS.green}]`}>
        
      <TextInput
        
        placeholder="Exercise Name"
        value={exercise.name}
        onChangeText={(text) => onChange(index, 'name', text)}
        style = {tw`p-2 border mt-2 rounded-3xl bg-[${COLORS.brown}] text-[${COLORS.primary}]`}
      />
      <View style = {tw`flex flex-row mt-4`}>
        <View>
            <Image  
                resizeMode='contain'
                style={[{ width: wp(30), height: 150 }, tw` rounded rounded-3xl`]}
                source={require("../assets/image/practice.gif")}
            />

        </View>
        <View>
            
            <View style = {tw`flex flex-row`}>
                <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                    Set
                </Text>
                <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                    Weight
                </Text>
                <Text style = {tw`m-2 text-[${COLORS.primary}]`}>
                    Reps
                </Text>
        </View>
        
        {exercise.sets.map((set, setIndex) => (
            <View  key={setIndex} style = {tw`flex flex-row`}>
            <Text style = {tw`m-2 mr-4 text-[${COLORS.primary}]`} >{set.setNumber}</Text>
            <TextInput
                style = {tw`m-2 text-[${COLORS.primary}]`}
                placeholder="Weight"
                value={set.weight}
                onChangeText={(text) => handleSetChange(setIndex, 'weight', text)}
            />
            <TextInput
                
                placeholder="Reps"
                value={set.rep}
                onChangeText={(text) => handleSetChange(setIndex, 'rep', text)}
            />
            </View>
        ))}
        <Button title="Add Set" onPress={handleAddSet} />
        </View>
      </View>
      
     
    </View>
    </View>
  )
}