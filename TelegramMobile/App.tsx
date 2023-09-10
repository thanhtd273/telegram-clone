import React from 'react';
import ChatScreen from './src/screens/ChatScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import MainScreen from './src/screens/Main/MainScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ConversationDetail from './src/screens/ConversationDetail';

const Stack = createStackNavigator();

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen
          name="ConversationDetail"
          component={ConversationDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
