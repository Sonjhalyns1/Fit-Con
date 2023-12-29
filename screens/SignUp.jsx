import { View, Text, TextInput, Button } from 'react-native'
import React, { useState } from 'react'
import { db } from '../data/Firebase';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import tw from "twrnc"

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
        navigation.navigate("Login")

        
        } catch (error) {
        console.log("an ERROR", error)
    }
      }
  return (
    <View style = {tw`flex flex-1 justify-center items-center`}>
      <Text className = "font-bold">Name</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => onChange('name', text)}
        
      />
      <Text>Email</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => onChange('email', text)}
        
      />
      <Text>Password</Text>
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => onChange('password', text)}
        
      />
      <Button title="Submit" onPress={onSubmit} />
      
    </View>
  )
}