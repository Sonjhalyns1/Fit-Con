import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './constants/theme';
import tw from "twrnc";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BodyParts from './components/BodyParts';
import BodyPart from './screens/BodyPart';
import ExerciseDetails from './screens/ExerciseDetails';
import SeachedExercise from './screens/SeachedExercise';
import WorkoutInfo from './screens/WorkoutInfo';
import History from './screens/History';
import AddUser from './screens/AddUser';
import FriendsHistory from './screens/FriendsHistory';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name = "Welcome" component={Welcome}  options = {{headerShown: false}}/>
        <Stack.Screen name = "Login" component={Login}  options = {{headerShown: false}}/>
        <Stack.Screen name = "Sign Up" component={SignUp}  options = {{headerShown: false}}/>
        <Stack.Screen name="Exercise Details" component={ExerciseDetails} options={{presentation: "modal"}}/>
        <Stack.Screen name="Add User" component={AddUser} options={{presentation: "modal"}}/>
        <Stack.Screen name="BodyPart" component={BodyPart} />
        <Stack.Screen name="Search Exercise" component={SeachedExercise} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Friends History" component={FriendsHistory} />
        <Stack.Screen name = "Workout information" component = {WorkoutInfo} />
        <Stack.Screen 
          name = "Bottom Navigation"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        
        
        />

      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
