import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screen/HomeScreen';
import {LogBox} from 'react-native';
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Non-serialize value were found in the navigation state']);
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home" // Use 'name' instead of 'path' to specify the screen name
          options={{headerShown: false}} // Use 'headerShown' instead of 'header'
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
