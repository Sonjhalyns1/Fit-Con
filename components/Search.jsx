import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import ExerciseList from './ExerciseList';
import tw from 'twrnc';
import { COLORS } from '../constants/theme';
import { useNavigation } from '@react-navigation/native';

export default function Search() {
  const [formData, setFormData] = useState({
    search: '',
  });
  const { search } = formData;
  const navigation = useNavigation();

  const onChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSearch = () => {
    if (search) {
      navigation.navigate('Search Exercise', { search });
    }
  };

  return (
    <View style={tw`flex`}>
      <TextInput
        autoCapitalize='none'
        placeholder="Search exercise name"
        value={search}
        onChangeText={(text) => onChange('search', text)}
        style={tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-3`}
      />
      <TouchableOpacity onPress={handleSearch}>
        <View style={tw`bg-[${COLORS.primary}] p-3 rounded-3xl`}>
          <Text style={tw`text-black text-center`}>Search</Text>
        </View>
      </TouchableOpacity>
      
    </View>
  );
}
