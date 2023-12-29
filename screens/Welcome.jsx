import { View, Text, Image, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import tw from "twrnc"
import { COLORS, SIZES } from '../constants/theme'
import { useNavigation } from '@react-navigation/native';



export default function Welcome() {
    const navigation = useNavigation();
    const navigateToLogin = () => {
        navigation.navigate("Login");
      };
    
      const navigateToSignUp = () => {
        navigation.navigate("Sign Up");
      };
  return (
    <View style = {tw`flex flex-1 justify-center items-center bg-[${COLORS.primary}]`}>
      <Image 
        resizeMode='contain'
        style = {{height: SIZES.height / 1.7}}
        source={require("../assets/image/bicept_remove.png")}
      
      />
      <Text style = {tw`text-3xl text-[${COLORS.brown}] font-bold pt-5`}>
        Welcome to  <Text style = {tw`text-4xl text-[${COLORS.darkBrown}]`}>FitConnect</Text>
      </Text>
      <Text style = {tw`text-xl text-[${COLORS.brown}] font-bold`}>
        Your Gateway to a Healthier You
      </Text>
      <View style = {tw`flex`}>

        <TouchableOpacity style = {tw` bg-[${COLORS.green}] m-4 p-3 px-15 rounded-xl`} onPress={navigateToLogin}>
        <View style = {tw`flex items-center justify-center`}>
        <Text style = {tw`text-[${COLORS.primary}] font-semibold text-lg mr-4`}>Get Stated</Text>

        </View>
      </TouchableOpacity>
      <TouchableOpacity style = {tw` bg-[${COLORS.green}] m-4 p-3 px-15 rounded-xl`} onPress={navigateToSignUp}>
        <View style = {tw`flex items-center justify-center`}>
        <Text style = {tw`text-[${COLORS.primary}] font-semibold text-lg mr-4`}>Get Stated</Text>

        </View>
      </TouchableOpacity>
      </View>
      
    </View>
  )
}