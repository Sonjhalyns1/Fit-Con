import { View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import LoadingAni from '../components/LoadingAni'
import { deleteUser, getAuth } from 'firebase/auth'
import { deleteDoc, doc, getDoc } from 'firebase/firestore'
import { db } from '../data/Firebase'
import tw from "twrnc"
import { COLORS } from '../constants/theme'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'



export default function Profile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const auth = getAuth()
    const navigation = useNavigation()

    useEffect( () => {
        async function fetchProfile() {
            const user = auth.currentUser
            if (user){
                const docRef = doc(db, "users", user.uid)
                const docSnap = await(getDoc(docRef))
                if (docSnap.exists()){
                    setProfile(docSnap.data())
                    setLoading(false)
                }
            } else {
                console.log("error with finding account" + error)
                setLoading(false)
            }



        }
        fetchProfile()

    })
    function onLogout() {
        auth.signOut()
        navigation.navigate("Welcome")
    }

    async function onDeleteAccount() {
        const user = auth.currentUser
        if (user) {
            try {
                // Show confirmation alert
                Alert.alert(
                    "Confirmation",
                    "Are you sure you want to delete your account? This action cannot be undone.",
                    [
                        {
                            text: "Cancel",
                            style: "cancel"
                        },
                        {
                            text: "Delete",
                            onPress: async () => {
                                // Delete user data from Firestore
                                const docRef = doc(db, "users", user.uid)
                                await deleteDoc(docRef)
                                
                                // Delete the user's account
                                await deleteUser(user)
    
                                // Navigate to the welcome screen or any other appropriate screen
                                navigation.navigate("Welcome")
                            },
                            style: "destructive"
                        }
                    ]
                );
            } catch (error) {
                console.error("Error deleting account:", error.message)
                // Show an error message to the user
                Alert.alert("Error", "Failed to delete account. Please try again later.")
            }
        }
    }
    
    
    if (loading) {
        return(
            <SafeAreaView style= {tw`flex-1 `}>
        <LoadingAni />
      </SafeAreaView>
        )
    }
  return (
    <View contentContainerStyle={{ paddingBottom: 120 }}  style = {tw`flex flex-1 pt-10 px-10 bg-[${COLORS.primary}]`}>
      {profile && (
        <View>
            <Text style = {tw`text-center text-2xl font-bold text-[${COLORS.brown}] mb-2`}>
                Profile

                
            </Text>

            <Text style = {tw`mt-4 text-lg font-semibold text-[${COLORS.dark}]`}>Name:</Text>
            <View style = {tw`mt-1 p-2 rounded-lg bg-[${COLORS.brown}]`}>
                <Text style = {tw` text-[${COLORS.green}] text-lg font-bold`} selectable={true}>{profile.name}</Text>
            </View>
            <Text style = {tw`mt-4 text-lg font-semibold text-[${COLORS.dark}]`}>Email:</Text>
            <View style = {tw`mt-1 p-2 rounded-lg bg-[${COLORS.brown}]`}>
                <Text style = {tw` text-[${COLORS.green}] text-lg font-bold`} selectable={true}>{profile.email}</Text>
            </View>
                    
        </View>
      )}
      <View style = {tw`items-center mt-4`}>
      <View style = {tw`flex-row`}>
        <View style = {[{width: wp(30) },tw`flex-row justify-center items-center border p-2 rounded-xl bg-[${COLORS.dark}] mr-2`]}>
          <Ionicons name="exit" size={hp(2.5)} style={tw`text-[${COLORS.brown}]`} />
            <TouchableOpacity onPress={() => onLogout()}  style = {tw`flex justify-end `}> 
              <View>
                <Text style = {tw`text-[${COLORS.primary}]`}>Sign out</Text>
              </View>
            </TouchableOpacity>

        </View>

        <View style = {[{width: wp(30) },tw`flex-row justify-center  items-center border p-2 rounded-xl bg-[${COLORS.dark}]`]}>
          <MaterialCommunityIcons name="delete" size={hp(2.5)} style={tw`text-[${COLORS.brown}]`} />
            <TouchableOpacity onPress={onDeleteAccount}  style = {tw`flex justify-end `}> 
              <View>
                <Text style = {tw`text-[${COLORS.primary}]`}>Delete Account</Text>
              </View>
            </TouchableOpacity>

        </View>
        
        </View>
      </View>
    </View>
  )
}