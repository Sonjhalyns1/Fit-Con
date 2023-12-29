import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from './constants/theme';
import tw from "twrnc";
export default function App() {
  return (
    <View style={tw`bg-[${COLORS.primary}] flex flex-1 items-center justify-center`}>
      <Text S>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
