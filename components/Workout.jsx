
import { View, Text, TextInput, Button, Image, TouchableOpacity, Switch} from 'react-native'
import React, { useState } from 'react'
import tw from "twrnc"
import { COLORS, SIZES} from '../constants/theme';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { SelectList } from 'react-native-dropdown-select-list'
import { WorkoutData } from '../data/WortkoutData';
import { Colors } from 'react-native/Libraries/NewAppScreen';



export default function Workout({ index, exercise, onChange }) {
    const [selected, setSelected] = useState("");
    const [isEnable, setIsEnable] = useState(false)
    const toggleSwitch = () => setIsEnable(previousState => !previousState)
     
    const handleAddSet = () => {
        const updatedSets = [...(exercise.sets || []), { setNumber: (exercise.sets || []).length + 1, weight: '', reps: ''}];
        onChange(index, 'sets', updatedSets);
      };
      const handleWorkoutIdChange = (newWorkoutId) => {
        onChange(index, 'WorkoutId', newWorkoutId);
      };
      const handleSetChange = (setIndex, field, value) => {
        const updatedSets = [...exercise.sets];
        updatedSets[setIndex][field] = value;
        onChange(index, 'sets', updatedSets);
      };
  return (
    <View style = {tw``}>
        <View style = {tw`flex-row justify-between border p-2 mt-5 rounded-t-2xl bg-[${COLORS.dark}]`} >
            <Text style = {tw`text-[${COLORS.primary}] text-center text-xl`}>Exercise {index + 1}</Text>
            <View>
                <Switch 
                    trackColor={{false: COLORS.brown, true: COLORS.darkBrown}}
                    thumbColor={isEnable ? COLORS.green: COLORS.green}
                    ios_backgroundColor={COLORS.brown}
                    onValueChange={toggleSwitch}
                    value = {isEnable}
                  />
            </View>
        </View>
    
    <View style = {tw`border p-2 rounded-b-2xl bg-[${COLORS.green}]`}>
        {/* <View style = {tw`flex-row mb-1 `}>
              <TouchableOpacity style = {[{width: wp(33)},tw`p-2 bg-[${COLORS.brown} rounded-lg  items-center`]}>
                <Text>
                  Select
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style = {[{width: wp(33)},tw`p-2  bg-[${COLORS.brown}] rounded-lg items-center`]}>
                <Text>
                  Name
                </Text>
              </TouchableOpacity>
              
            </View> */}
        <View style = {tw`flex mb-1 `}>
          {isEnable === true && (
              <SelectList 
                setSelected={(val) => setSelected(val)} 
                onSelect={() => handleWorkoutIdChange(selected) }
                data={WorkoutData}
                boxStyles={{backgroundColor: COLORS.brown }}
                dropdownStyles={{backgroundColor: COLORS.brown}}
                dropdownTextStyles={{color: COLORS.primary}}
                
                save="value"
              />

          )}
          {isEnable === false  && (
              <TextInput
              placeholder="Exercise Name"
              value={exercise.name}
              onChangeText={(text) => onChange(index, 'name', text)}
              style = {tw`border p-2 rounded-xl bg-[${COLORS.brown}] text-[${COLORS.primary}] text-xl text-center`}
            />

          )}
              
              
        </View>
    
      
      <View style = {tw`flex mt-4`}>

        <View>
            
            <View style = {tw`flex flex-row justify-between`}>
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
            <View  key={setIndex} style = {tw`flex flex-row justify-between`}>
            <Text style = {tw`m-2 mr-4 text-[${COLORS.primary}]`} >{set.setNumber}</Text>
            <TextInput
                style = {tw`m-2 text-[${COLORS.primary}]`}
                placeholder="Weight"
                value={set.weight}
                onChangeText={(text) => handleSetChange(setIndex, 'weight', text)}
            />
            <TextInput
                style = {tw`m-2 text-[${COLORS.primary}]`}
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