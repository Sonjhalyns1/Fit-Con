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
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name = "Welcome" component={Welcome}  options = {{headerShown: false}}/>
        <Stack.Screen name = "Login" component={Login}  options = {{headerShown: false}}/>
        <Stack.Screen name = "Sign Up" component={SignUp}  options = {{headerShown: false}}/>
        <Stack.Screen name="BodyPart" component={BodyPart} />
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
