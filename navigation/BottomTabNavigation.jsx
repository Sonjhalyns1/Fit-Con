
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../constants/theme';
import Home from '../screens/Home';

import Create from '../screens/Create';
import Leaderboard from '../screens/Leaderboard';
import Exercise from '../screens/Exercise';
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome from "react-native-vector-icons/MaterialCommunityIcons"


export default function BottomTabNavigation() {
    const Tab = createBottomTabNavigator();

    const screenOptions = {
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyles: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            elevation: 0,
            height: 70,

        }
        

    }
  return (
    <Tab.Navigator screenOptions={screenOptions}>


        <Tab.Screen name = "Home" component={Home} 
            options={{
                tabBarIcon: ({focused}) => {
                    return <Ionicons name= {focused ? "home" : "home-outline"}
                    size={30} 
                    color={focused ? COLORS.dark : COLORS.green} />

                }
            }}
        
        />

        <Tab.Screen name = "Create" component={Create} 
                    options={{
                        tabBarIcon: ({focused}) => {
                            return <Ionicons name= {focused ? "add-circle" : "add-circle-outline"}
                            size={30} 
                            color={focused ? COLORS.dark : COLORS.green} />

                        }
                    }}
                
                />
        
        
        <Tab.Screen name = "Leaderboard" component={Leaderboard} 
            options={{
                tabBarIcon: ({focused}) => {
                    return <MaterialIcons name= {focused ? "leaderboard" : "leaderboard"}
                    size={30} 
                    color={focused ? COLORS.dark : COLORS.green} />

                }
            }}
        
        />
        <Tab.Screen name = "Exercise" component={Exercise} 
            options={{
                tabBarIcon: ({focused}) => {
                    return <FontAwesome name= {focused ? "dumbbell" : "dumbbell"}
                    size={30} 
                    color={focused ? COLORS.dark : COLORS.green} />

                }
            }}
        
        />
    </Tab.Navigator>
  )
}