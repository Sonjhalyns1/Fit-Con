import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../constants/theme'
import tw from "twrnc"
import { getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    
      })
      const { email, password} = formData;
          const navigation = useNavigation();
          function onChange(key, value) {
            setFormData((prevState) => ({
              ...prevState,
              [key]: value,
            }));
          }
    
      async function onSubmit(e){
        e.preventDefault()
        try {
          const auth = getAuth()
          const userCredential = await signInWithEmailAndPassword(auth, email, password)
          if(userCredential.user){
            navigation.navigate("Bottom Navigation")
          }
        } catch (error) {
          console.log("AN ERROR", error)
        }
      }
  return (
    <View style = {tw`flex flex-1 justify-center  bg-[${COLORS.primary}] p-5`}>
        <View >
            <Text style = {tw`text-3xl text-[${COLORS.darkBrown}] font-bold`}>
                Unlock the door to
            </Text>
            <Text style = {tw`text-3xl text-[${COLORS.darkBrown}] font-bold`}>
                Fitness and well-being
            </Text>
        </View>
        <View style = {tw`flex items-center`}>
            <Image 
                    resizeMode='contain'
                    style = {{height: SIZES.height / 3.5}}
                    source={require("../assets/image/gym_boy.png")}
                
                />
        </View>
        
      <View >
      <Text style = {tw`text-[${COLORS.brown}] mt-10 font-semibold text-lg`}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => onChange('email', text)}
        style = {tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-5`}
        
      />
      <Text style = {tw`text-[${COLORS.brown}] font-semibold text-lg`}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => onChange('password', text)}
        style = {tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-5`}
      />
      <TouchableOpacity title="Submit" onPress={onSubmit} style = {tw` bg-[${COLORS.green}] m-4 p-3 px-5 rounded-3xl`} >
      <View style = {tw`flex items-center justify-center`}>
        <Text style = {tw`text-[${COLORS.primary}] font-semibold text-lg mr-4`}>Login</Text>

        </View>
      </TouchableOpacity>
    </View>
      
    </View>
  )
}