import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './constants/theme';
import tw from "twrnc";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigation from './navigation/BottomTabNavigation';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name = "Welcome" component={Welcome}  options = {{headerShown: false}}/>
        <Stack.Screen name = "Login" component={Login}  options = {{headerShown: false}}/>
        <Stack.Screen 
          name = "Bottom Navigation"
          component={BottomTabNavigation}
          options={{headerShown: false}}
        
        
        />

      </Stack.Navigator>
    </NavigationContainer>
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
