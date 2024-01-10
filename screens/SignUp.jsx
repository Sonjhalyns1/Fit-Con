import { View, Text, TextInput, Button, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { db } from '../data/Firebase';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import tw from "twrnc"
import { COLORS, SIZES } from '../constants/theme';

export default function SignUp() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    
      });
      const {name, email, password} = formData;
      const navigation = useNavigation();
      function onChange(key, value) {
        setFormData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
      }
      async function onSubmit(){
        
        try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser,{
            displayName: name
        })
        const user = userCredential.user
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, "users", user.uid), formDataCopy)
        console.log("success")
        navigation.navigate("Bottom Navigation")

        
        } catch (error) {
        console.log("an ERROR", error)
    }
      }
      function navigateLogin(){
        navigation.navigate("Login")
      }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={tw`flex flex-1 justify-center bg-[${COLORS.primary}] p-5`}
    >
        <View >
            <Text style = {tw`text-3xl text-[${COLORS.darkBrown}] font-bold`}>
                Let's sculpt
            </Text>
            <Text style = {tw`text-3xl text-[${COLORS.darkBrown}] font-bold`}>
                The new you together
            </Text>
        </View>
        <View style = {tw`flex items-center`}>
            <Image 
                    resizeMode='contain'
                    style = {{height: SIZES.height / 2.5}}
                    source={require("../assets/image/flying.png")}
                
                />
        </View>
        
      <Text style = {tw`text-[${COLORS.brown}] mt-5 font-semibold text-lg`}>Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => onChange('name', text)}
        style = {tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-3`}
      />
      <Text style = {tw`text-[${COLORS.brown}]  font-semibold text-lg`}>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => onChange('email', text)}
        style = {tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-3`}
      />
      <Text style = {tw`text-[${COLORS.brown}]  font-semibold text-lg`}>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => onChange('password', text)}
        style = {tw`border p-3 pr-20 rounded-3xl border-[${COLORS.darkBrown}] bg-[${COLORS.brown}] text-[${COLORS.primary}] mb-5`}
      />
      <Button title="Create Account" onPress={onSubmit}  />
      <View>
        <Text>
            Have an existent account <Button title="Login" onPress={navigateLogin}  />
        </Text>
      </View>
      
    </KeyboardAvoidingView>
  )
}