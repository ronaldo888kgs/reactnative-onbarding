/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import 'react-native-gesture-handler';
 import * as React from 'react';
 import { NavigationContainer } from '@react-navigation/native';
 import { createStackNavigator } from '@react-navigation/stack';

 //Screen

import {
    OnBoarding
} from './App/screens/';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
  } from 'react-native';

const Stack = createStackNavigator();
const App = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false}} />
            </Stack.Navigator>
        </NavigationContainer>
        
    );
}

export default App;
