import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../HomeScreen';
import ContactScreen from './ContactScreen';
import SavedMessageScreen from './SavedMessageScreen';
import Colors from '../../utils/Color';
import TestScreen from '../TestScreen';

const Drawer = createDrawerNavigator();

const MainScreen = (): JSX.Element => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {backgroundColor: Colors.theme200},
        drawerLabelStyle: {color: Colors.white, fontSize: 18},
        drawerActiveTintColor: Colors.gray,
        headerStyle: {backgroundColor: Colors.theme200},
        headerTintColor: Colors.white,
      }}>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({color, size}) => (
            <Icon name="home" color={Colors.gray} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactScreen"
        component={ContactScreen}
        options={{
          headerLeftLabelVisible: false,
          headerTitle: 'Contacts',
          drawerLabel: 'Contacts',
          drawerIcon: ({color, size}) => (
            <Icon name="account" size={size} color={Colors.gray} />
          ),
        }}
      />
      <Drawer.Screen
        name="SavedMessageScreen"
        component={SavedMessageScreen}
        options={{
          headerTitle: 'Saved Messages',
          drawerLabel: 'Saved Messages',
          drawerIcon: ({color, size}) => (
            <Icon name="bookmark" color={Colors.gray} size={size} />
          ),
        }}
      />
      <Drawer.Screen name="TestScreen" component={TestScreen} />
    </Drawer.Navigator>
  );
};

export default MainScreen;
